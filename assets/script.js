<<<<<<< HEAD
=======
const daysContainer = document.querySelector(".days"),
  nextBtn = document.querySelector(".next-btn"),
  prevBtn = document.querySelector(".prev-btn"),
  month = document.querySelector(".month"),
  todayBtn = document.querySelector(".today-btn");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const date = new Date();

let currentMonth = date.getMonth();

let currentYear = date.getFullYear();

function renderCalendar() {
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  let days = "";

  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDayDate; i++) {
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      days += `<div class="day today">${i}</div>`;
    } else {
      days += `<div class="day ">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  hideTodayBtn();
  daysContainer.innerHTML = days;
}

renderCalendar();

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

todayBtn.addEventListener("click", () => {
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  renderCalendar();
});


function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}
daysContainer.addEventListener("click", (event) => {

  if (event.target.classList.contains("day")) {
    const clickedDay = event.target.textContent;


    let day = parseInt(clickedDay);
    let monthIndex = currentMonth;
    let year = currentYear;

    if (event.target.classList.contains("prev")) {
  
      monthIndex--;
      if (monthIndex < 0) {
        monthIndex = 11;
        year--;
      }
    } else if (event.target.classList.contains("next")) {
   
      monthIndex++;
      if (monthIndex > 11) {
        monthIndex = 0;
        year++;
      }
    }  
    const formattedDate = `${String(monthIndex + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`;

    console.log(formattedDate); 
  }
  
});

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

>>>>>>> main
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
