const getWeather = async (location) => {
    const apiKey = process.env.WEATHERSTACK_API_KEY;

    if (!apiKey) {
        throw new Error('No se encontró la API Key.');
    }

    const url = new URL('https://api.weatherstack.com/current');

    url.searchParams.set('access_key', apiKey);
    url.searchParams.set('query', location);
    url.searchParams.set('units', 'm');

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('No fue posible conectar con Weatherstack.');
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.info);
    }

    return data;
};

module.exports = getWeather;