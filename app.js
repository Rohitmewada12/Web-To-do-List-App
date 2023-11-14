document.addEventListener("DOMContentLoaded", function () {
    // Retrieve tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("task-list");

    // Display tasks on the page
    function displayTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}" onclick="toggleComplete(${index})">${task.text}</span>
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add a new task
    window.addTask = function () {
        const newTaskInput = document.getElementById("new-task");
        const newTaskText = newTaskInput.value.trim();

        if (newTaskText !== "") {
            tasks.push({ text: newTaskText, completed: false });
            displayTasks();
            saveTasks();
            newTaskInput.value = "";
        }
    };

    // Toggle task completion status
    window.toggleComplete = function (index) {
        tasks[index].completed = !tasks[index].completed;
        displayTasks();
        saveTasks();
    };

    // Delete a task
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        displayTasks();
        saveTasks();
    };

    // Display existing tasks on page load
    displayTasks();
});