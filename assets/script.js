$("#beginBtn").on("click", function(){
    location.replace("main.html");
});

$("#surveyForm").on("submit", function(e){
  e.preventDefault();
});

var ti = localStorage.getItem("totalInvestment");

function getTotalInvestment() {
  document.getElementById("totalInvestment").textContent = ti;
}

function getNetWorth() {

}

function getProfit() {
}