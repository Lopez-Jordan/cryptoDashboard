$("#beginBtn").on("click", function(){
    location.replace("main.html");
});

$("#surveyForm").on("submit", function(e){
  e.preventDefault();
});

var ti = localStorage.getItem("totalInvestment");

var requestUrl="https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10"
  fetch(requestUrl)
    .then(function(response){
      // var response=!response.ok
      if (!response.ok){
          showError();
      }else{

          return response.json();    
      }
    })
    .then(function(data){
        
      console.log(data)
        
  });  

function getTotalInvestment() {
  document.getElementById("totalInvestment").textContent = ti;
}

function getNetWorth() {

}

function getProfit() {
}