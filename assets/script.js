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

var coinList=['BTC','ETH','ETH','ETH','ETH']
var profitList=[]
var investment=[100,200,300,400,500]
var pastDayEarningRateHighSum=[]
var level = 'advanced'
var per = [0.1,0.2,0.2,0.2,0.2]
var totalInvestment=10000000
var profit=0

//Part 1: Populate Coin Name
function populateCoinName(){
    for(var i=0; i<coinList.length; i++){
        var title = $(".crypto"+[i]).append("<title></title>")
        title.text(coinList[i])
    }
}
populateCoinName()
//Individual cards
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
//Part2: Social Sentiment 
function getSocialSentiment(coinList){
    var index=0
    for (var i=0;i<coinList.length;i++){
        var coinName= coinList[i]
        var requestUrl="https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym="+coinName+"&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
        fetch(requestUrl)
            .then(function(response){
                if (!response.ok){
                    showError();
                }else{            
                    return response.json();  
                }
            })
            .then(function(responseData){
            var sentiment = responseData.Data.addressesNetGrowth.sentiment; 
            var paragraph = $(".crypto"+index);
            var pTag=$("<p>")
            pTag.addClass("p1")
            pTag.text("Senitment: "+sentiment)
            paragraph.append(pTag)
            index++
            }) 
        }     
    }

//Part3: Profit
//get data from Api, caculate profit, populate to the website
function getProfit(coinList,per){ 
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
                console.log(responseData)
                console.log(index)
                var ChangePCT = responseData.RAW.CHANGEPCT24HOUR
                profit = ChangePCT*totalInvestment*per[index]
                var paragraph = $(".crypto"+index);
                var pTag=$("<p>")
                // pTag.addClass("p1")
                pTag.text("Potential Eearnings: "+profit)
                paragraph.append(pTag)
                index++
                //populate the porfolio cards
                profit++
                console.log(profit)

            })
                
    }
    // console.log(profit)
    // var Investment = $(".cryptoBig0");
    // var porfolioTag2=$("<p>")
    // porfolioTag2.addClass="p2"
    // porfolioTag2.text("Total Investment: "+totalInvestment)
    // Investment.append (porfolioTag2)

    // var totalProfit = $(".cryptoBig1"+index);
    // var porfolioTag3=$("<p>")
    // porfolioTag3.addClass="p3"
    // porfolioTag3.text("Total Profit: "+ profit)
    // totalProfit.append (porfolioTag3)

    // var netWorth = $(".cryptoBig2"+index);
    // var netWorth= totalInvestment+profit
    // var porfolioTag4=$("<p>")
    // porfolioTag4.addClass="p4"
    // porfolioTag4.text("Total netWorth: "+netWorth)
    // netWorth.append(porfolioTag4)
 }


//Part4: Trading volume
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

//Part5: conversionType
function conversionType(coinList){
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
                var type = responseData.Data.Data[0].conversionType
                var paragraph = $(".crypto"+index);
                var pTag=$("<p>")
                pTag.addClass("p2")
                pTag.text("Conversion type: " +type)
                paragraph.append(pTag)
                index++
            }) 
        }     
    }
//Part6: Volume from,to
    function volumeFromTo(coinList){
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
                    var volumeFrom = responseData.Data.Data[0].volumefrom
                    var volumeTo = responseData.Data.Data[0].volumeto
                    var paragraph = $(".crypto"+index);
                    var pTag1=$("<p>")
                    pTag1.addClass("p2")
                    pTag1.text("Volume from: " +volumeFrom)
                    var pTag2=$("<p>")
                    pTag2.addClass("p3")
                    pTag2.text("Volume to: " +volumeTo)
                    paragraph.append(pTag1)
                    paragraph.append(pTag2)
                    index++
                }) 
            }     
        }


function User(level,coinList,per){
    if (level===1){
    getProfit(coinList,per)
    getTradingVolume(coinList)
    getSocialSentiment(coinList)
    }else if(level===2){
    getProfit(coinList,per)
    getTradingVolume(coinList)
    getSocialSentiment(coinList)
    conversionType(coinList)
    } else{
    getProfit(coinList,per)
    getTradingVolume(coinList)
    getSocialSentiment(coinList)
    conversionType(coinList)
    volumeFromTo(coinList)   
    }
}
User(1,coinList,per)
