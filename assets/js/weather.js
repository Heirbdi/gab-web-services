let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

// Selectors
let city = document.querySelector('.name');
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

// Fixed city: Bujumbura
const BURUNDI_CITY = "Bujumbura";

// Fetch weather for Burundi
const fetchWeatherForBurundi = () => {
    fetch(`${url}&q=${BURUNDI_CITY}&_=${Date.now()}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                // Update DOM with weather data
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                // Handle error gracefully
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données météo :", error);
        });
};

// Initialize the app
const initApp = () => {
    fetchWeatherForBurundi(); // Directly fetch weather for Bujumbura
};

initApp();
