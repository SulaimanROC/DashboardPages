console.log('Main loaded');

const chart1 = document.querySelector('#chart-1');
const leaderboard = document.querySelector('.leaderboard')

let cryptoDataNames = [];
let cryptoDataSupply = [];
let cryptoDataRanks = [];
let cryptoDataRankNames = [];
let cryptoDataRankSymbol = [];
let cryptoDataRankSupply = [];
let cryptoDataRankPercentage = [];
let colour = ""
let iconColour = "";




fetch('https://api.coincap.io/v2/assets')
    .then(data => data.json())
    .then(jsonData => jsonDataLoop(jsonData))
    .catch(error => {
        console.log('Er is iets mis:', error);
    });

function jsonDataLoop(jsonData) {
    console.log(jsonData);

    for (let i = 0; i < jsonData.data.length; i++) {
        const cryptoData = jsonData.data[i];
        console.log(cryptoData.name);
        console.log(cryptoData.supply);
        cryptoDataRanks.push(cryptoData.rank);
        cryptoDataRankNames.push(cryptoData.name);
        cryptoDataRankSymbol.push(cryptoData.symbol);
        cryptoDataRankSupply.push(cryptoData.supply);
        cryptoDataRankPercentage.push(cryptoData.changePercent24Hr);
        if (cryptoData.supply <= 10000000000) {
            cryptoDataNames.push(cryptoData.name);
            cryptoDataSupply.push(cryptoData.supply);
        }
        
        if(cryptoDataRankPercentage[i] < 0){
            colour = "danger";
            iconColour = "down"
        } else {
            colour = "success";
            iconColour = "up";
        }
        leaderboard.innerHTML += `<tr><td class="float-left">${cryptoDataRankSymbol[i]} <p class="text-secondary">${cryptoDataRankNames[i]}</p></td></tr><td class="float-right"><p class="text-${colour}">Supply: ${cryptoDataRankSupply[i]} <br><br> ${cryptoDataRankPercentage[i]}% <i class="bi bi-caret-${iconColour}-fill"></i></p></td><hr>`;
    }

    createChart(chart1, cryptoDataNames, cryptoDataSupply, "red");
}

function createChart(canvas, labels, data, backgroundColor) {
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: backgroundColor,
                label: 'Crypto values',
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
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 1050 || document.documentElement.scrollTop > 1050) {
        document.getElementById("navbar-animation").style.top = "0";
        document.getElementById("crypto-sub-page").style.animation = "fadeInBackground 0.2s forwards"
      
        
    } else {
        document.getElementById("navbar-animation").style.top = "-80px";
        document.getElementById("crypto-sub-page").style.animation = "fadeOutBackground 0.2s forwards"
    }
}


