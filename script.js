const temperatureField = document.querySelector(".temperature p");
const locationField = document.querySelector(".time-location p");
const dateandTimeField = document.querySelector(".time-location span"); // Select the <span> element
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search-area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Mumbai';

const fetchDetails = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=d19e14ad060e4baea8e62015241603&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log(data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c + "°C";
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];

    console.log("Split Date:", splitDate);
    console.log("Split Time:", splitTime);

    let currentDay = getDayName(new Date(splitDate).getDay());

    console.log("Current Day:", currentDay);

    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();

    target = searchField.value;

    fetchDetails(target);
}

fetchDetails(target);

function getDayName(number){
    switch(number){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}
