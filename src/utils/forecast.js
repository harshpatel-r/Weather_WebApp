const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=21847eaf018f9409f78cc7c8557ce2ae&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather server', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined);
        } else {
            let data = body.current;
            callback(undefined, `It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`);
        }
    })

}

module.exports = forecast; 
