$("#beginBtn").on("click", function(){ // button to take from welcome page to main page
    location.replace("main.html");
});
function validateForm(data){ // validating the survey object for correct user input
  if (data.userName == ""){
    alert("Please enter a name"); // change to a modal
    return false;
  }
  if (isNaN(data.totalInvestment)){
    alert("Not a number"); // change to a modal
    return false;
  }
  if (data.totalInvestment < 0 || data.totalInvestment > 100000000){
    alert("Incorrect investment Value, please enter a value in the correct range (0-100,000,000)");
    return false;
  }
  var totalPercent = 0;
  for (var i=0; i<5; i++){
    totalPercent += data.coins[i].percent;
  }
  if (isNaN(totalPercent)){
    alert("Make sure you have '0's' for values coins you don't want to invest it");
    return false;
  }
  if (totalPercent != 100){
    alert("Your portfolio weights do not add up to 100!");
    return false;
  }
  return true;
}
// submitting and validating the form itself
$("#surveyForm").on("submit", function(e){
  e.preventDefault(); // still haven't created object yet
  var coin1Obj = {
    symbol : $("#coin1").val(),
    percent: parseInt($("#percent1").val())
  }
  var coin2Obj = {
    symbol : $("#coin2").val(),
    percent: parseInt($("#percent2").val())
  }
  var coin3Obj = {
    symbol : $("#coin3").val(),
    percent: parseInt($("#percent3").val())
  }
  var coin4Obj = {
    symbol : $("#coin4").val(),
    percent: parseInt($("#percent4").val())
  }
  var coin5Obj = {
    symbol : $("#coin5").val(),
    percent: parseInt($("#percent5").val())
  }

  var newObj = {
    userName: $("#inputName").val(),
    visited: true,
    level: parseInt($("#inputLevel").val()),
    totalInvestment : parseInt($("#investment").val()),
    coins: [coin1Obj, coin2Obj, coin3Obj, coin4Obj, coin5Obj]
  }

  if (validateForm(newObj)){
    localStorage.setItem(newObj.userName, JSON.stringify(newObj));
  }
  $("#visDivOne").css("display","none");
  $("#visDivTwo").css("display","none");
  $("#visDivThree").css("display","none");
  $("#visDivFour").css("display","none");
  $("#create").css("display","block");
  $("#nextOne").css("display","block");
  $("#nextTwo").css("display","block");
  $("#nextThree").css("display","block");
});
// creating the dynamic parts of the form
$("#create").on("click", function(){
  $("#visDivOne").css("display","block");
  $("#create").css("display","none");
});
$("#nextOne").on("click",function(){
  $("#visDivTwo").css("display","block");
  $("#nextOne").css("display","none");
});
$("#nextTwo").on("click",function(){
  $("#visDivThree").css("display", "block");
  $("#nextTwo").css("display","none");
});
$("#nextThree").on("click",function(){
  $("#visDivFour").css("display", "block");
  $("#nextThree").css("display","none");
});

// starting the education section
$("#getInfo").on("click",function(){
  $("#content-div").css("display", "block");
  
  if ($("#coinInfo").val() == ""){
    alert("Please enter a coin!");
  }
  var symbol = $("#coinInfo").val();
  console.log(symbol);
  var descURL = "https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=" + symbol + "&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
  fetch(descURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data); // Log the entire data object to inspect its structure
    $("#contentP").text(data.Data.ASSET_DESCRIPTION_SUMMARY);
    
    var imgUrl = data.Data.LOGO_URL;
    var nameOfCoin = data.Data.NAME;
    $("#coinLogo").attr('src', imgUrl);
    $("#nameOfCoin").text(nameOfCoin);
  })
  .catch(function(){
    alert("Please enter a valid coin");
  });
  

});


// STARTS HERE --------------------------------------
// var coinList=['BTC','ETH','ETH','ETH','ETH']

var profitList=[]

var pastDayEarningRateHighSum=[]
var level = newObj.level;
var totalAmount  = 10000000
var percentage = 0.20





//Part 1: Populate Coin Name
function populateCoinName(){
    for(var i=0; i<coinList.length; i++){
        var title = $(".crypto"+[i]).append("<title></title>")
        title.text(coinList[i])
    }
}
populateCoinName()
//Part2: Current Price
//get data from Api, caculate profit, populate to the website
function getPriceApi(coinList){ 
    var index=0;
    for (var i=0; i<coinList.length; i++){
        var coinName= coinList[i];
        var requestUrl="https://min-api.cryptocompare.com/data/price?fsym="+coinName+"&tsyms=USD,JPY,EUR&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
        fetch(requestUrl)
            .then(function(response){
                if (!response.ok){
                    showError();
                }else{
                    return response.json();    
                }
            })
            .then(function(responseData){
                var price = responseData.USD; 
                var paragraph = $(".crypto"+index);
                var pTag=$("<p>")
                pTag.addClass("p1")
                pTag.text("Current Pric: "+price)
                paragraph.append(pTag)
                index++
            })      
    }
 }

//Part3: Social Sentiment 
function getSocialSentiment(coinList){
    var index=0
    for (var i=0;i<coinList.length;i++){
        var coinName= coinList[i]
        var requestUrl="https://min-api.https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym="+coinName+"&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
        console.log(requestUrl)
        fetch(requestUrl)
            .then(function(response){
                if (!response.ok){
                    showError();
                }else{            
                    return response.json();  
                }
            })
            .then(function(responseData){
             console.log(responseData)
            }) 
        }     
    }
getSocialSentiment()

//Part4: Profit
//get data from Api, caculate profit, populate to the website
function getProfitApi(coinList){ 
    var index=0;
    for (var i=0; i<coinList.length; i++){
        var coinName= coinList[i];
        var requestUrl="https://min-api.cryptocompare.com/data/generateAvg?fsym="+coinName+"&tsym=USD&e=Kraken&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
        fetch(requestUrl)
            .then(function(response){
                if (!response.ok){
                    showError();
                }else{
                    return response.json();    
                }
            })
            .then(function(responseData){
                console.log(responseData);
                var ChangePCT = responseData.RAW.CHANGEPCT24HOUR
                console.log(ChangePCT);
                var profit = ChangePCT*totalAmount*percentage
                console.log(profit);
                var paragraph = $(".crypto"+index);
                var pTag=$("<p>")
                pTag.addClass("p1")
                pTag.text("Potential Eearnings: "+profit)
                paragraph.append(pTag)
                index++
            })      
    }
 }
//Part5: Trading volume
function getTradingVolume(coinList){
    var index=0
    for (var i=0;i<coinList.length;i++){
        var coinName= coinList[i]
        var requestUrl="https://min-api.cryptocompare.com/data/v2/histoday?fsym="+coinName+"&tsym=USD&limit=10&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
        fetch(requestUrl)
            .then(function(response){
                if (!response.ok){
                    showError();
                }else{            
                    return response.json();  
                }
            })
            .then(function(responseData){
                var allDayVolume=0;
                for (var j = 0; j<11; j++){
                    var hourClose = responseData.Data.Data[j].close; 
                    allDayVolume+=hourClose;
                }
                var volumeAverage = allDayVolume/11;
                var paragraph = $(".crypto"+index);
                var pTag=$("<p>")
                pTag.addClass("p2")
                pTag.text("Hourly average close volume:" +volumeAverage)
                paragraph.append(pTag)
                index++
            }) 
        }     
    }

 




// 1.3 populate data
// var proAmountList = getProfitApi(coinList)
// console.log(proAmountList)

// async function showiterm() {
//     for(var i=0; i<5; i++){
//         var paragraph = $(".crypto"+[i]).append("<p></p>")
//         paragraph.text(proAmountList[i])
//         console.log(proAmountList[i])

//     }
// }

// showiterm()
// profitPopulate()




// function populateDataBeginner(){
//     getProfit()
//     var coinName = coinList
//     var 
//     <p class="card-text"></p> 
// }

// function populateDataImtermediate(){
//     var coinName = coinList
//     var 
//     <p class="card-text"></p> 
// }


// function populateDataAdvance(){
//     var coinName = coinList
//     var 
//     <p class="card-text"></p> 
// }



// function volume(responseData){
//     var pastDayVolume  = 0;
//     var allDayVolumeAvearage = 0; 
//     var hourCloseVolume= responseData.Data.Data.close;
// }

// //Trading signal
// function getSignal(){
//     for (var i=0;i<coinList.length;i++){
//         var coinName= coinList[i]
//         var requestUrl="https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym="+coinName+"&tsym=USD&limit=10&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
//         fetch(requestUrl)
//             .then(function(response){
//                 if (!response.ok){
//                     showError();
//                 }else{            
//                     return response.json();  
//                 }
//             })
//             .then(function(responseData){
//                 console.log(responseData)  
//                 // volume(responseData)
//             }) 
//         }     
//     }

// //Social Number

// function getSocialSentiment(){
//     // var coinName = "BTC"
//     var requestUrl="https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=BTC&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
//     fetch(requestUrl)
//         .then(function(response){
//             if (!response.ok){
//                 // showError();
//             }else{            
//                 return response.json();  
//             }
//         })
//         .then(function(data){
//             console.log(data)  
//             // volume(responseData)
//         }) 
//     }
    



// function beginnerUser(){
//     getProfitApi()
//     getTradingVolumeApi()
//     getSocialSentiment()
//     getSocialSentiment()
// }

// function imtermiateUser(){
//     getProfitApi()
//     getTradingVolumeApi()
//     getSocialSentiment()
//     getSocialSentiment()
//     getBlockChain()

// }


// global vars
var totalInv = localStorage.getItem("totalInvestment");
var coins = localStorage.getItem("coins");
var numCoins = coins.length;

// function to display dashboard
function displayDashboard() {
  for (i=0; i<numCoins; i++) {
    renderTotalInvestment();
    renderNetWorth(coins[i].symbol);
    renderProfit(coins[i].symbol);
  }
}

// function to retrieve and render total investment
function renderTotalInvestment() {
  document.getElementById("totalInvest").textContent = totalInv;
}

// function to calculate and render total investment
// makes call to crypto compare api
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

  // function to calculate and render profit
  // makes call to crypto compare api
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

// function advancedUser(){
//     getProfitApi()
//     getTradingVolumeApi()
//     getSocialSentiment()
//     getSocialSentiment()
//     getNews()
// }

