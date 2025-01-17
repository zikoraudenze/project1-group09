const selectedCalendarDay = '01-24-2025';
let activityListSelected;
const activityList = {

    name: ['Visit the Zoo','Visit the Museum','Visit the Park', 'Visit the Aquarium', 'Visit the Library'],
    address: ['123 street', '456 street', '789 street', '101 street', '112 street'],
    city: 'Kansas City',
    state: 'MO',
    description: ['Visit the Zoo', 'Visit the Museum', 'Visit the Park', 'Visit the Aquarium', 'Visit the Library'],
    date: ['01-24-2025', '01-24-2025', '01-24-2025', '01-24-2025', '01-24-2025'],
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
function renderActivityList() {
    // checks the date value of the selected calendar day and compares it to the date value of the activityList array and only displays the activities that match the date value
    for (let i = 0; i < activityList.name.length; i++) {
        if (activityList.date[i] === selectedCalendarDay) {
            createActivityList(activityList.name[i], activityList.city, activityList.state);
        }
    }
}
renderActivityList();

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

