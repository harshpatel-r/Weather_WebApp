const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Harsh Patel"
    })
});

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Harsh Patel"
    })
});

app.get('/help', (req, res) => {
    res.render("help", {
        title: 'Help',
        name: "Harsh Patel",
        helptext: 'this is some helpful text'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a address term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harsh Patel',
        errorMessage: "Help Page not found.."
    })
});

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harsh Patel',
        errorMessage: "Page not found.."
    })
});



app.listen(3000, () => {
    console.log('server is up on port 3000');
})

/*
Do you have to use a view engine with Express?
To answer the main question - a view engine is not necessary for express/node. You're right
though, you can't pass variables/values to pure html. The view engine is something that
looks at the data you pass and generates the html markup for you.
*/