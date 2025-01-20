document.addEventListener("DOMContentLoaded", () => {
  const saveTaskBtn = document.getElementById("saveTaskBtn");

  saveTaskBtn.addEventListener("click", () => {
    // Collect input values
    const taskName = document.getElementById("taskName").value.trim();
    const taskAddress = document.getElementById("taskAddress").value.trim();
    const taskCity = document.getElementById("taskCity").value.trim();
    const taskState = document.getElementById("taskState").value.trim();
    const taskDate = document.getElementById("taskDate").value.trim();
    const taskDescription = document.getElementById("taskDescription").value.trim();

    // Validate inputs
    if (taskName && taskAddress && taskCity && taskState && taskDate && taskDescription) {
      // Create task object
      const task = {
        name: taskName,
        address: taskAddress,
        city: taskCity,
        state: taskState,
        date: taskDate,
        description: taskDescription,
      };

      // Get existing tasks from local storage
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);

      // Save updated tasks to local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Clear input fields
      document.getElementById("taskForm").reset();

      // Close the modal
      const addTaskModal = bootstrap.Modal.getInstance(document.getElementById("addTaskModal"));
      addTaskModal.hide();

      // Optionally, display the task in the list
      displayTasks();
    } else {
      alert("Please fill out all fields.");
    }
  });

  function displayTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.add("task-item");
      li.innerHTML = `
        <strong>${task.name}</strong> - ${task.date}<br>
        ${task.description}<br>
        ${task.address}, ${task.city}, ${task.state}
        <button class="btn btn-tomato delete-task-btn" data-index="${index}">Delete</button>
      `;

      // Delete button functionality
      li.querySelector(".delete-task-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
      });

      taskList.appendChild(li);
    });
  }

  // Load tasks on page load
  displayTasks();
});
