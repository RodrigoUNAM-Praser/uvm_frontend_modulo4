// Elementos HTML
const searchForm = document.querySelector('#searchForm');
const locationInput = document.querySelector('#locationInput');
const searchButton = document.querySelector('#searchButton');

const message = document.querySelector('#message');
const weatherCard = document.querySelector('#weatherCard');

// Elementos donde mostraremos el clima
const cityName = document.querySelector('#cityName');
const localTime = document.querySelector('#localTime');
const weatherIcon = document.querySelector('#weatherIcon');

const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const feelsLike = document.querySelector('#feelsLike');

const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');
const windDirection = document.querySelector('#windDirection');


// Mostrar mensajes al usuario
const showMessage = (text, type = '') => {
    message.textContent = text;
    message.className = 'message';

    if (type) {
        message.classList.add(type);
    }
};


// Mostrar información meteorológica
const displayWeather = (weather) => {

    cityName.textContent = `${weather.city}, ${weather.country}`;

    localTime.textContent = `Hora local: ${weather.localtime}`;

    weatherIcon.src = weather.icon;
    weatherIcon.alt = weather.description;

    temperature.textContent = `${weather.temperature} °C`;

    description.textContent = weather.description;

    feelsLike.textContent = `${weather.feelslike} °C`;

    humidity.textContent = `${weather.humidity}%`;

    windSpeed.textContent = `${weather.wind_speed} km/h`;

    windDirection.textContent = weather.wind_direction;

    // Mostrar tarjeta meteorológica
    weatherCard.hidden = false;
};


// Evento para buscar el clima
searchForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const location = locationInput.value.trim();

    // Validar localidad
    if (!location) {
        showMessage('Por favor, introduce una localidad.', 'error');
        locationInput.focus();
        return;
    }

    // Estado de búsqueda
    searchButton.disabled = true;
    searchButton.textContent = 'Buscando...';

    showMessage('Consultando información meteorológica...');

    try {

        // Solicitar información al servidor Express
        const response = await fetch(
            `/api/weather?location=${encodeURIComponent(location)}`
        );

        const data = await response.json();

        // Comprobar errores del servidor
        if (!response.ok) {
            throw new Error(data.error || 'No fue posible consultar el clima.');
        }

        // Mostrar información
        displayWeather(data);

        showMessage(
            `Clima actualizado para ${data.city}.`,
            'success'
        );

    } catch (error) {

        console.error(error);

        weatherCard.hidden = true;

        showMessage(error.message, 'error');

    } finally {

        // Restaurar botón
        searchButton.disabled = false;
        searchButton.textContent = 'Buscar';

    }

});