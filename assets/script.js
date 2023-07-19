var portfolioProfit=0
$("#beginBtn").on("click", function(){ // button to take from welcome page to main page
    location.replace("main.html");
});
function validateForm(data){ // validating the survey object for correct user input
  if (data.userName == ""){
    UIkit.modal('#noName').show();
    return false;
  }
  if (isNaN(data.totalInvestment)){
    UIkit.modal('#noInvestment').show();
    return false;
  }
  if (data.totalInvestment < 0 || data.totalInvestment > 100000000){
    UIkit.modal('#ivalidInvestment').show();
    return false;
  }
  var totalPercent = 0;
  for (var i=0; i<5; i++){
    totalPercent += data.coins[i].percent;
  }
  if (isNaN(totalPercent)){
    UIkit.modal('#makeZero').show();
    return false;
  }
  if (totalPercent != 100){
    UIkit.modal('#makeOneHundred').show();
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
    newUser = localStorage.getItem(newObj.userName)
    var newUserParse=JSON.parse(newUser)
    createUser(newObj)
    $("#totalClass").css("display","block");
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
    console.log("no coin selected");
    UIkit.modal('#noCoinName').show();
  }
  var symbol = $("#coinInfo").val();
  
  var descURL = "https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=" + symbol + "&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
  fetch(descURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
 // Log the entire data object to inspect its structure
    $("#contentP").text(data.Data.ASSET_DESCRIPTION_SUMMARY);
    
    var imgUrl = data.Data.LOGO_URL;
    var nameOfCoin = data.Data.NAME;
    $("#coinLogo").attr('src', imgUrl);
    $("#nameOfCoin").text(nameOfCoin);
  })
  .catch(function(){
    UIkit.modal('#noValidCoin').show();
  });
  

});


function createUser(newUserParse){
  var coinList=[]
  for (var i =0; i<newUserParse.coins.length;i++){
      newCoin=newUserParse.coins[i].symbol
      if (newCoin!=""){
      coinList.push(newCoin)}

  }
  var per=[]
  for (var i =0; i<newUserParse.coins.length;i++){
      percent=newUserParse.coins[i].percent
      if (percent!=NaN){
      per.push(percent)}
  }
  var level = newUserParse.level
  var totalInvestment=newUserParse.totalInvestment
  var profit=0
  var pastDayEarningRateHighSum=[]
  var profitList=[]
  
  populateCoinName(coinList)
  User(level,coinList,per,totalInvestment)
}


function User(level,coinList,per,totalInvestment){
  if (level===1){
  getProfit(coinList,per,totalInvestment)
  getTradingVolume(coinList)
  getSocialSentiment(coinList)
  }else if(level===2){
  getProfit(coinList,per,totalInvestment)
  getTradingVolume(coinList)
  getSocialSentiment(coinList)
  conversionType(coinList)
  } else{
  getProfit(coinList,per,totalInvestment)
  getTradingVolume(coinList)
  getSocialSentiment(coinList)
  conversionType(coinList)
  volumeFromTo(coinList)   
  }
  
}
//Part 1: Populate Coin Name
function populateCoinName(coinList){
    for(var i=0; i<coinList.length; i++){
        var title = $(".crypto"+[i]).append("<title></title>")
        title.text([i+1]+". "+coinList[i])
     
    }

}

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
                var price = Math.round(responseData.USD); 
                var paragraph = $(".crypto"+index);
                var pTag=$("<p>")
                pTag.addClass("p1")
                pTag.text("price: "+price + " $")
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
            pTag.text("market sentiment: "+sentiment)
            paragraph.append(pTag)
            index++
            }) 
        }     
    }

//Part3: Profit
//get data from Api, caculate profit, populate to the website
function getProfit(coinList,per,totalInvestment){ 
    // console.log(coinList)
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
                // console.log(responseData)
                var ChangePCT = responseData.RAW.CHANGEPCT24HOUR
                profit = Math.round(ChangePCT*totalInvestment*per[index])
                var paragraph = $(".crypto"+index);
                var pTag=$("<p>")
                pTag.text("earnings: "+profit + " $")
                paragraph.append(pTag)

                var cardboard = $("#card"+index);
                console.log(cardboard)
                cardboard.addClass("p-3 border border-info");

                index++
                //populate the porfolio cards
                portfolioProfit+=profit
                // console.log(profolioProfit)

                var portfolioTestment = $("#totalInvestment");
                portfolioTestment.text("Investment: "+totalInvestment + " $")

                var totalProfit = $("#portfolioProfit");
                if (portfolioProfit < 0){
                    totalNetWorth = 0;
                }
                totalProfit.text("Profit/Loss: "+ portfolioProfit + " $")

                var totalNetWorth =totalInvestment+portfolioProfit
                var netWorth = $("#totalNetWorth");
                if (totalNetWorth < 0){
                    
                }
                netWorth.text("Net Worth: "+ totalNetWorth + " $")

                
            })
    }
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
                var volumeAverage = Math.round(allDayVolume/11);
                var paragraph = $(".crypto"+index);
                var pTag=$("<p>")
                pTag.addClass("p2")
                pTag.text("hrly avg vol (close): " +volumeAverage)
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
                pTag.text("conversion type: " +type)
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
                    var volumeFrom = Math.round(responseData.Data.Data[0].volumefrom)
                    var volumeTo = Math.round(responseData.Data.Data[0].volumeto)
                    var paragraph = $(".crypto"+index);
                    var pTag1=$("<p>")
                    pTag1.addClass("p2")
                    pTag1.text("vol (open): " +volumeFrom)
                    var pTag2=$("<p>")
                    pTag2.addClass("p3")
                    pTag2.text("vol (close): " +volumeTo)
                    paragraph.append(pTag1)
                    paragraph.append(pTag2)
                    index++
                }) 
            }     
        }



$("#conversionButton").on("click",function(){
  
  console.log("1");
  var input = $("#coinInput1").val();
  console.log(input);
  var amount = $("#amtInput").val();
  var output = $("#coinInput2").val();
  var requestUrl="https://api.coinlayer.com/convert?access_key=aba7605942c68749d9255a7a4124507a"+"&from="+input+"&to="+output+"&amount="+amount
  console.log(requestUrl);
  fetch(requestUrl)
      .then(function(response){          
          return response.json(); 
      })
      .then(function(data){
          console.log(data);
          var coinConversion = data.result
          console.log(coinConversion);
          var amtOutput = $('#amtOutput')
          amtOutput.text(coinConversion)

      });
})

