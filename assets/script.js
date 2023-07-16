$("#beginBtn").on("click", function(){
    location.replace("main.html");
});

$("#surveyForm").on("submit", function(e){
  e.preventDefault();
});


function getTotalInvestment() {
  var totInv = localStorage.getItem("totalInvestment");
  document.getElementById("totalInvestment").textContent = totInv;
}

function getNetWorth() {

}

function getProfit() {

}