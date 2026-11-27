// Importar dependencias
require('dotenv').config();

const express = require('express');
const path = require('path');
const getWeather = require('./src/weather');

// Crear aplicación Express
const app = express();

const PORT = process.env.PORT || 3000;

// Servir archivos públicos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para consultar el clima
app.get('/api/weather', async (req, res) => {

    // Obtener localidad
    const location = req.query.location;

    // Validar que el usuario haya escrito una localidad
    if (!location || !location.trim()) {
        return res.status(400).json({
            error: 'Por favor, introduce una localidad.'
        });
    }

    try {

        // Consultar Weatherstack
        const data = await getWeather(location.trim());

        // Preparar información meteorológica
        const weather = {
            city: data.location.name,
            country: data.location.country,
            localtime: data.location.localtime,
            temperature: data.current.temperature,
            feelslike: data.current.feelslike,
            description: data.current.weather_descriptions[0],
            icon: data.current.weather_icons[0],
            humidity: data.current.humidity,
            wind_speed: data.current.wind_speed,
            wind_direction: data.current.wind_dir
        };

        // Enviar respuesta JSON
        res.json(weather);

    } catch (error) {

        console.error('Error meteorológico:', error.message);

        res.status(502).json({
            error: error.message || 'No fue posible consultar el clima.'
        });
    }
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});