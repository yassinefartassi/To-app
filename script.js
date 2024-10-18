let taskHeader = document.getElementById("task-title");
let taskDetails = document.getElementById("task-detail");
let submitBtn = document.getElementById("submit");
let taskList = document.getElementById("task-list");
let data = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditing = false; // Track if we are editing a task
let editTaskId = null; // Store the ID of the task being edited

// Render tasks on page load
renderTasks();

// Handle submit button click
submitBtn.addEventListener("click", () => {
  if (taskHeader.value === "") {
    alert("The title is required");
    return;
  }

  if (isEditing) {
    // Update the existing task
    let task = data.find((t) => t.id === editTaskId);
    task.title = taskHeader.value;
    task.details = taskDetails.value;

    isEditing = false;
    editTaskId = null;
    submitBtn.textContent = "Add Task"; // Reset button text
  } else {
    // Create a new task
    let newTask = {
      id: Date.now(),
      title: taskHeader.value,
      details: taskDetails.value,
    };

    data.push(newTask);
  }

  saveTasks(); // Save to localStorage
  renderTasks(); // Refresh the task list
  clearInputs(); // Clear the input fields
});

// Render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = ""; // Clear the task list

  data.forEach((task) => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <h2>${task.title}</h2>
        <div class="card-actions">
          <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      </div>
      <div class="card-content">
        <p>${task.details}</p>
      </div>
    `;

    taskList.appendChild(card);
  });
}

// Edit an existing task
function editTask(id) {
  let task = data.find((t) => t.id === id);
  taskHeader.value = task.title;
  taskDetails.value = task.details;

  isEditing = true; // Set editing mode
  editTaskId = id; // Store the ID of the task being edited
  submitBtn.textContent = "Edit Task"; // Change button text
}

// Delete a task
function deleteTask(id) {
  data = data.filter((task) => task.id !== id);
  saveTasks(); // Update localStorage
  renderTasks(); // Refresh the task list
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(data));
}

// Clear input fields
function clearInputs() {
  taskHeader.value = "";
  taskDetails.value = "";
}
