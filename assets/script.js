
var coinList=['BTC','ETH','ETH','ETH','ETH']

var profitList=[]

var pastDayEarningRateHighSum=[]
var level = 'advanced'
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
//Part2: Social Sentiment 
function getSocialSentiment(coinList){
    var index=0
    for (var i=0;i<coinList.length;i++){
        var coinName= coinList[i]
        var requestUrl="https://min-api.https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym="+coinName+"&api_key=4643002f15269f3fab2e433e581986eb8e0d2eb7711e7b78e90fb547713396df";
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

//Part3: Profit
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

 




//1.3 populate data
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

// function advancedUser(){
//     getProfitApi()
//     getTradingVolumeApi()
//     getSocialSentiment()
//     getSocialSentiment()
//     getNews()
// }