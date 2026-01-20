// make a list for storing tasks
let tasks = [];

// load saved tasks when the page starts
loadTasks();

function loadTasks() {
    // Get tasks from browser storage
    let saved = localStorage.getItem('tasks');

    // If there are saved tasks, load them
    if (saved) {
        tasks = JSON.parse(saved);
    }

    //Show all tasks on screen
    showTasks();
}

// function to add a new task
function addTask() {
    let input = document.getElementById('taskInput');

    //get text and trim spaces
    let inputText = input.value;
    inputText = inputText.trim();

    // check if user typed something
    if (inputText === '') {
        alert("Please type a task!")
        return;
    }

    // Create a new task with:
    // - An ID (unique number using current time)
    // - The text the user typed
    // - completed status (false = not done yet)
    let newTask = {
        id : Date.now(),
        text : inputText,
        completed: false
    }

    // Add the new task to our list
    tasks.push(newTask);

    // Save tasks to browser's storage
    saveTasks();

    // Clear the input field so its empty
    input.value = '';

    showTasks();
}

function saveTasks() {
    // Converts tasks into text format and save to browser storage
    // 'tasks' is usually an array or object
    // JSON.stringify() converts it into text(string) format
    // localStorage can only store text(string) format in key-value pairs
    // 'tasks' is the key, JSON.stringify(tasks) is the value
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function showTasks() {
    let taskList = document.getElementById("task-list");

    taskList.innerHTML = ""; // remove old tasks

    if (tasks.length === 0) {
        taskList.innerHTML = "<p class='empty-message'>No tasks yet. Add one to get started!</p>"
        return; // stop here! don't run any code below
    }

    // loop through each task
    for (i=0;i<tasks.length;i++){
        let task = tasks[i];
        
        //create a HTML for this task
        let taskHTML = "<div class='task-item";

        // If task is completed, show text with strikethrough
        if (task.completed) {
            taskHTML += " completed";
        }

        taskHTML += "'>";
        taskHTML += "<span class='task-text'>" + task.text + "</span>";
        taskHTML += "<div class='task-buttons'>";
        taskHTML += "   <button onClick='markDone(" +task.id+ ")' class='done-btn'>Done</button>";
        taskHTML += "   <button onClick='deleteTask(" +task.id+ ")' class='delete-btn'>Delete</button>";
        taskHTML += "</div>";
        taskHTML += "</div>";

        // Add this task's HTML to the list
        taskList.innerHTML += taskHTML;
    }
}

function markDone(id) {
    for (let i=0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            // Switch it (done becomes not done , not done become done)
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }

    // Save and show
    saveTasks();
    showTasks();
}

function  deleteTask(id) {
    let confirm_delete = confirm("Are you sure?");

    if (confirm_delete) {
        for (let i=0; i<tasks.length ; i++) {
            if(tasks[i].id === id) {
                //remove 1 item at index i
                tasks.splice(i,1);
                break;
            }
        }

        // Save and show
        saveTasks();
        showTasks();
    }
}