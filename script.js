let cityElement = document.querySelector(".city");
let buttonElement = document.querySelector(".button");
let questionElement = document.querySelector(".game-question");
let infoElement = document.querySelector(".game-answer");

cityElement.addEventListener('keydown', cityHandler);
buttonElement.addEventListener('click', cityHandler);

function cityHandler(e) {
    if (e.type == "click" || e.key == "Enter") {
        checkCity(cityElement.value)
    }
}

let cities = ['Минск', 'Москва', 'Варшава', 'Киев', 'Абакан', 'Норильск', 'Барселона', 'Париж', 'Осло', 'Воронеж']
let userCities = [];
let lastCity = '';

function checkCity(city) {
    cityElement.value = "";
    if (isDoubleCity(city.toLowerCase())) {
        infoElement.innerHTML = "Такой город уже был"
    } else if (lastCity.length != 0 && !isTrueCity(city)) {
        infoElement.innerHTML = "Город должен начинатся с буквы, которой закончился ранее названный город"
    } else if (city.length == 0) {
        infoElement.innerHTML = "Название города не может быть пустым"
    } else {
        userCities.push(city.toLowerCase())
        questionElement.textContent = city;
        infoElement.textContent = '';
        lastCity = city;
    }
}



function isDoubleCity(city) {
    return userCities.includes(city.toLowerCase())
}

function isTrueCity(city) {
    return lastCity.toLowerCase().endsWith(city[0].toLowerCase());
}