// Purpose: To generate random weather data and display it on the page  
// Function that generates random weather data and sets the temperatureEl and conditionEl 
// text content to the random weather data and updates the DOM elements. Also returns the temperature and condition
// to be used in the changeWeatherImageBackground function
//function generateRandomWeather()  should be called when the user clicks the "Generate Weather" button
//function changeWeatherImageBackground() should be called after generateRandomWeather() to change the background image based on the weather condition

const weatherbutton = document.getElementById('weatherButton');

function generateRandomWeather(){
  //create an array of temperatures from 0 to 100 in increments of 5
  const temperatureList = [];

  for (let i = 0; i <= 100; i += 5) {
    temperatureList.push(i);
  }

   //create an array of weather conditions
   const conditionsList = ['rain', 'sunny','cloudy'];
   const conditionsList2 = ['sunny','cloudy','snow'];
  //select the temperature element from the DOM
  const temperatureEl = document.getElementById('activity-info-temperature');
  //select the condition element from the DOM
  const conditionEl = document.getElementById('activity-info-weather-condition');
  let condition = '';
  let weatherVerb = '';
  
  
  //Step 1: choose a random temperature from the temperatureList array
  let temperature = temperatureList[Math.floor(Math.random() * temperatureList.length)];



 //Step 2: based on the temperature, choose a random condition from the conditionsList array
  
 
 //if the temperature is less than 32, set the condition to snow or cloudy
 //if the temperature is between 32 and 65, conditions it cloudy or rainy
 //if the temperature is greater than 65, set the condition to either sunny or cloudy
  
  if (temperature < 32) {
    condition = conditionsList2[Math.floor(Math.random() * conditionsList2.length)];
    weatherVerb = 'freezing temps';
  }
  else if (temperature >= 32 && temperature <= 65) {
    condition = conditionsList[Math.floor(Math.random() * conditionsList.length)];
    weatherVerb = 'cool';
  }
  else {
    condition = conditionsList[Math.floor(Math.random() * conditionsList.length)];
    weatherVerb = 'warm';
  } 


  if (condition === null){

    alert('Unable to generate conditions')

  }
//Step 3: set the text content of the temperature element to the random temperature

  //set the text content of the temperature element to the random temperature
  temperatureEl.textContent = `Tempature: ${temperature} °F`;
  //set the text content of the condition element to the random condition
  conditionEl.textContent = `Weather Conditions: ${weatherVerb} and ${condition}`;

  //return the temperature and condition
  return { temperature, condition };
}


function changeWeatherImageBackground() {
  let currentCondition = generateRandomWeather().condition;
  const weatherbackgroundEl = document.getElementById('weather-background');
  const changeWeatherImage = document.getElementById('reactWeatherImage');
  //if the condition is 'rain', set the background image to the rain image
  if (currentCondition === 'rain') {
    changeWeatherImage.src = "./assets/images/rainDropsOverlay.gif";
    changeWeatherImage.style.backgroundColor = 'SkyBlue';
  } 
  //if the condition is 'sunny', set the background image to the sunny image
  else if (currentCondition === 'sunny') {
    changeWeatherImage.src = "./assets/images/sunnyGifOverlay.gif";
    changeWeatherImage.style.backgroundColor = 'SkyBlue';
  } 
  //if the condition is 'snow', set the background image to the snow image
  else if (currentCondition === 'snow') {
    changeWeatherImage.src = "./assets/images/snowflakeGifOverlay.gif";
    //change the background color to black
   changeWeatherImage.style.backgroundColor = 'black';
  } 
  //if the condition is 'cloudy', set the background image to the cloudy image
  else if (currentCondition === 'cloudy') {
    changeWeatherImage.src = "./assets/images/cloudOverlay.gif";
    changeWeatherImage.style.backgroundColor = 'SkyBlue';
  }
}

//function calls the random weather function and change the image function.
function generateWeatherInfo() {
    generateRandomWeather();
    changeWeatherImageBackground();
  }
  
  //function that handles the weather button click event
  