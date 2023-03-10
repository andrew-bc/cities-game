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

let cities = ['Минск', 'Москва', 'Варшава', 'Киев', 'Абакан', 'Норильск', 'Барселона', 'Париж', 'Осло', 'Воронеж', 'Могилев']
let userCities = [];
let lastCity = '';

function checkCity(city) {
    cityElement.value = "";
    if (city.length == 0) {
        infoElement.innerHTML = "Название города не может быть пустым"
    } else if (lastCity.length != 0 && !isTrueCity(city)) {
        infoElement.innerHTML = "Город должен начинатся с буквы, которой закончился ранее названный город"
    } else if (isDoubleCity(city.toLowerCase())) {
        infoElement.innerHTML = "Такой город уже был"
    } else if (!isCityInPCMemory(city)) {
        infoElement.innerHTML = "Я не знаю такой город, введите другое название"
    } else {
        userCities.push(city.toLowerCase())
        questionElement.textContent = city;
        infoElement.textContent = '';
        lastCity = city;
        let cityByPC = stepByPC(city);
        if (cityByPC != null) {
            userCities.push(cityByPC.toLowerCase())
            questionElement.textContent = cityByPC;
            lastCity = cityByPC;
        } else {
            infoElement.innerHTML = "Вы победили"
        }
    }
}



function isDoubleCity(city) {
    return userCities.includes(city.toLowerCase())
}

function isTrueCity(city) {
    return lastCity.toLowerCase().endsWith(city[0].toLowerCase());
}

function isCityInPCMemory(city) {
    return cities.includes(city[0].toUpperCase() + city.substring(1, city.length).toLowerCase());
}

function stepByPC(city) {
    let filteredCities = cities.filter(e => {
        return city.toLowerCase()[city.length - 1].includes(e.toLowerCase()[0]) && !userCities.includes(e.toLowerCase())
    })
    let rand = Math.floor(Math.random() * filteredCities.length);
    console.log(filteredCities, rand)
    return filteredCities.length == 0 ? null : filteredCities[rand];
}