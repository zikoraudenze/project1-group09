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

let formattedDate = "";

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
    formattedDate = `${String(monthIndex + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`;
    console.log(formattedDate)

    function clearActivityList() {
      const activityListNode = document.querySelector("#activity-list-selection")
      activityListNode.innerHTML = ''
    }
    function renderActivityList() {
      // checks the date value of the selected calendar day and compares it to the date value of the activityList array and only displays the activities that match the date value
      clearActivityList()
        for (let i = 0; i < activityList.name.length; i++) {
            if (activityList.date[i] === formattedDate) {
                createActivityList(activityList.name[i], activityList.city, activityList.state);
            }else {
              console.log('a')
              renderNoActivities()
            }            
        }
      }

  renderActivityList();
  }
  
});

let activityListSelected;
const activityList = {

    name: ['Visit the Zoo','Visit the Museum','Visit the Park', 'Visit the Aquarium', 'Visit the Library'],
    address: ['123 street', '456 street', '789 street', '101 street', '112 street'],
    city: 'Kansas City',
    state: 'MO',
    description: ['Visit the Zoo', 'Visit the Museum', 'Visit the Park', 'Visit the Aquarium', 'Visit the Library'],
    date: ['01/24/2025', '01/24/2025', '01/24/2025', '01/24/2025', '01/24/2025'],
}

function renderNoActivities(){
  const activityListEl = document.querySelector('#activity-list-selection');
  activityListEl.innerHTML = '<p>No activites today</p>'
}

// adds the element to the DOM and returns the element

function createActivityList(name, city, state) {
    const activityListEl = document.querySelector('#activity-list-selection');
    if (activityListEl) {
        activityListEl.innerHTML += `
            <button class="list-group-item d-flex justify-content-between align-items-center activity-list-selected">${name} -------------------- ${city}, ${state}</button>
        `;
    }
}
/**
 * Renders the activity list by looping through the activityList array
 * and calling the createActivityList function for each element.
 */


// //checks the list items and the name of the selected activity and get the index of the selected activity. 
// // Then store the name, address, city, state, and description of the selected activity in the selectedActivity object to be called in another function


function getSelectedActivity(){

    activityListSelected = document.querySelectorAll('.activity-list-selected');
        const selectedActivityIndex = Array.from(activityListSelected).indexOf(document.activeElement);
        const currentSelectedActivity = {
            name: activityList.name[selectedActivityIndex],
            address: activityList.address[selectedActivityIndex],
            city: activityList.city,
            state: activityList.state,
            description: activityList.description[selectedActivityIndex],
            date: activityList.date[selectedActivityIndex],
        }
        console.log(selectedActivityIndex);
        console.log(currentSelectedActivity);
            return currentSelectedActivity;
    }
// //displays the selected activity in the DOM
function displaySelectedActivity(currentSelectedActivity) {
    const selectedActivity = currentSelectedActivity;
    console.log(selectedActivity);
    const activityNameEl = document.querySelector('#activity-info-name');
    const activityAddressEl = document.querySelector('#activity-info-address');
    const activityCityEl = document.querySelector('#activity-info-city');
    const activityStateEl = document.querySelector('#activity-info-state');
    const activityDescriptionEl = document.querySelector('#activity-info-description');
    const activityDateEl = document.querySelector('#activity-info-date');

    activityNameEl.textContent = `Name: ${selectedActivity.name}`;
    activityAddressEl.textContent = `Address: ${selectedActivity.address}`;
    activityCityEl.textContent = `City: ${selectedActivity.city}`;
    activityStateEl.textContent = `State: ${selectedActivity.state}`;
    activityDescriptionEl.textContent =`Description: ${selectedActivity.description}`;
    activityDateEl.textContent = ` Date: ${selectedActivity.date}`;

    console.log(selectedActivity);
}

// Add click event listener to update the selected activity
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('activity-list-selected')) {
        const selectedActivity = getSelectedActivity();
        displaySelectedActivity(selectedActivity);
        generateWeatherInfo();
    }
});


const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.getElementById("newTaskInput");
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  const taskList = document.getElementById("task-list");
  const urbanButton = document.querySelector("#urban-style-button");
  const natureButton = document.querySelector("#nature-style-button");
  const abstractButton = document.querySelector("#abstract-style-button");
  const backgroundImageEl = document.querySelector("#backgroud-img");

//listens for the click event on the urban button and then changes the background url for backgroundImageEl, sets the class of disabled for the Urban button and removes the class of disabled
// from the other buttons
urbanButton.addEventListener("click",() => {
  backgroundImageEl.style.backgroundImage = "url(./assets/images/buildings-1850129_1920.jpg)";
  urbanButton.classList.add("disabled");
  natureButton.classList.remove("disabled");
  abstractButton.classList.remove("disabled");
});

//listens for the click event on the nature button and then changes the background url for backgroundImageEl, sets the class of
// disabled for the nature button and removes the class of disabled from the other buttons
natureButton.addEventListener("click",() => {
  backgroundImageEl.style.backgroundImage = "url(./assets/images/mountain-8117525.jpg)";
  natureButton.classList.add("disabled");
  urbanButton.classList.remove("disabled");
  abstractButton.classList.remove("disabled");
});

//listens for the click event on the abstract button and then changes the background url for backgroundImageEl, sets the class of
// disabled for the abstract button and removes the class of disabled from the other buttons
abstractButton.addEventListener("click",() => {
  backgroundImageEl.style.backgroundImage = "url(./assets/images/amber-7327252_1920.jpg)";
  abstractButton.classList.add("disabled");
  urbanButton.classList.remove("disabled");
  natureButton.classList.remove("disabled");
});
  // Add Task Functionality
  saveTaskBtn.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();

    // Validate input
    if (taskText) {
      // Create a new list item
      const li = document.createElement("li");
      li.classList.add("task-item");
      li.innerHTML = `
        ${taskText}
        <button class="btn btn-tomato delete-task-btn">Delete</button>
      `;
      taskList.appendChild(li);

      // Attach delete functionality
      li.querySelector(".delete-task-btn").addEventListener("click", () => {
        taskList.removeChild(li);
      });

      // Clear input field and close the modal
      newTaskInput.value = "";
      const addTaskModal = bootstrap.Modal.getInstance(document.getElementById("addTaskModal"));
      addTaskModal.hide();
    }
  });
});


