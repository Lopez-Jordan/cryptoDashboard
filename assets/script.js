$("#beginBtn").on("click", function(){
    location.replace("main.html");
});

$("#surveyForm").on("submit", function(e){
  e.preventDefault();
});

var totalInv = localStorage.getItem("totalInvestment");
var coins = localStorage.getItem("coins");

function renderTotalInvestment() {
  document.getElementById("totalInvest").textContent = totalInv;
}

function renderNetWorth(name) {
  var url = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + name + "&tsym=USD&limit=10";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      
    }
  });

function renderProfit(name) {
  var numCoins = coins.length;
  var profit;
  var url = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + name + "&tsym=USD&limit=10";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var open = data.Data[0].open;
      var close = data.Data[0].close;
      for (i=0; i<numCoins; i++) {
        var perc = (coins[i].percent)/100;
        var coinInv = totalInv * perc;
        
        profit += coinProfit;
    }
  });
}