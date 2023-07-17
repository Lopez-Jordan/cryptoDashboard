$("#beginBtn").on("click", function(){
    location.replace("main.html");
});

$("#surveyForm").on("submit", function(e){
  e.preventDefault();
});


var totalInv = localStorage.getItem("totalInvestment");
var coins = localStorage.getItem("coins");
var numCoins = coins.length;

function displayDashboard() {
  for (i=0; i<numCoins; i++) {
    renderTotalInvestment();
    renderNetWorth(coins[i].symbol);
    renderProfit(coins[i].symbol);
  }
}

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
      var open = data.Data[0].open;
      var close = data.Data[10].close;
      var netWorth = 0;
      for (i=0; i<numCoins; i++) {
        var perc = (coins[i].percent)/100;
        var coinInv = totalInv * perc;
        var coinClose = (coinInv * close)/open;
        netWorth += coinClose;
      }
      document.getElementById("netWorth").textContent = netWorth;
    });
  }

function renderProfit(name) {
  var url = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + name + "&tsym=USD&limit=10";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var open = data.Data[0].open;
      var close = data.Data[10].close;
      var totProfit = 0;
      for (i=0; i<numCoins; i++) {
        var perc = (coins[i].percent)/100;
        var coinInv = totalInv * perc;
        var coinClose = (coinInv * close)/open;
        var coinProfit = coinClose - coinInv;
        totProfit += coinProfit;
    }
      document.getElementById("profit").textContent = totProfit;
  });
}
