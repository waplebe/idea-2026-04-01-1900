document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');

    // Fetch tasks from the API
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                `;
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));

    // Add task form submission handler
    addTaskBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;

        if (!title) {
            alert('Task title is required.');
            return;
        }

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, description: description })
        })
        .then(response => response.json())
        .then(task => {
            // Optionally, refresh the task list
            fetch('/tasks')
                .then(response => response.json())
                .then(tasks => {
                    taskList.innerHTML = '';
                    tasks.forEach(t => {
                        const taskItem = document.createElement('div');
                        taskItem.innerHTML = `<h3>${t.title}</h3><p>${t.description}</p>`;
                        taskList.appendChild(taskItem);
                    });
                });
        })
        .catch(error => console.error('Error creating task:', error));

        document.getElementById('task-form').reset();
    });
});