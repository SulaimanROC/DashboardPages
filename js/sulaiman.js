// brought in all the charts with Qselector
const canvas = document.querySelector('#chart'); 
const canvas2 = document.querySelector('#chart2');
const canvas3 = document.querySelector('#chart3');
const canvas4 = document.querySelector('#chart4');

// fetched the data that im gonna use
// fetch('https://api.open-meteo.com/v1/forecast?latitude=52.371807&longitude=4.896029&hourly=temperature_2m')
// .then(myData => myData.json())
// .then(jsonData => {

//     let temp = 0;
    
//     for (let i = 0; i < jsonData.hourly.temperature_2m.length; i++) {
//         temp += jsonData.hourly.temperature_2m[i];
//     }
    
//     temp /= jsonData.hourly.temperature_2m.length;
//     document.querySelector('.temp').innerHTML += `<h4>Average temp: ${temp.toFixed(2)}°</h4>`;
//     document.querySelector('.timezone').innerHTML += `<h3>TimeZone: ${jsonData.timezone}</h3>`;
//     document.querySelector('.time').innerHTML += `<h3>Time: ${jsonData.hourly.time[0]} </h3>`;
//     document.querySelector('.latitude').innerHTML += `<h4>Latitude: ${jsonData.latitude}</h4>`;
//     document.querySelector('.longitude').innerHTML += `<h4>Longitude ${jsonData.longitude}</h4>`;
//     createChart(canvas, jsonData.hourly.time, jsonData.hourly.temperature_2m, 'temperature');
// });

fetch('http://api.weatherapi.com/v1/forecast.json?key=624778b5a7af44b79ef93404232305&q=Amsterdam&aqi=no')
.then(myData => myData.json())
.then(jsonData => {
    // createChart(jsonData, canvas2);
    console.log(jsonData);

    // gave the data a variable name
    const timeArray = [];
    const feelsLikeData = [];
    const temperatureArray = [];
    const rainArray = [];
    const precip = [];


    jsonData.forecast.forecastday[0].hour.forEach(hour => {
        timeArray.push(hour.time.split(' ')[1]);
        temperatureArray.push(hour.temp_c);
        feelsLikeData.push(hour.feelslike_c);
        rainArray.push(hour.chance_of_rain);
        precip.push(hour.precip_mm);
    });

    // console.log(feelsLikeData);

    // added the titles of the charts, gave them a color and put the data in the chart
    createChart(canvas, timeArray, temperatureArray, 'Temperature in C', 'green')
    createChart(canvas2, timeArray, feelsLikeData, 'Today Feels Like', 'yellow');
    createChart(canvas3, timeArray, precip, 'precipitation MM', 'orange');
    createChart(canvas4, timeArray, rainArray, 'Chance of Rain %', 'purple')
    document.querySelector('.feels-like').innerHTML += feelsLikeData[0] + 'C';
    document.querySelector('.chance-of-rain').innerHTML += rainArray[0] + '%';
    document.querySelector('.precip').innerHTML += precip[0] +' MM';
    document.querySelector('.wind-speed').innerHTML += jsonData.forecast.forecastday[0].hour[0].wind_kph + 'KPH';
    document.querySelector('.weather-image').setAttribute('src', jsonData.current.condition.icon.replace('64x64', '128x128'));
    document.querySelector('.weather-description').innerText = jsonData.current.condition.text;
});


function showInConsole(jsonData) {
    console.log(jsonData);
}



function createChart(canvas, labels, data, label, color) {
    if (!color)
        color = 'red';
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: color,
                label: label,
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

