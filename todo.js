const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function showTasks() {
    listContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("checked");
        }

        // Click to mark complete
        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveData();
            showTasks();
        });

        // Delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        span.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveData();
            showTasks();
        });

        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

// Add task
function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: inputBox.value,
        completed: false
    });

    inputBox.value = "";
    saveData();
    showTasks();
}

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Initial load
showTasks();
