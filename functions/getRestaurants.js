const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { lat, lon } = event.queryStringParameters;
    if (!lat || !lon) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No location provided.' }),
        };
    }
    const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1500&type=restaurant&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
        };
    }
};
