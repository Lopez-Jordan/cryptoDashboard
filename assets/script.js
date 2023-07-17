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
  });




  $("#contentP").text()// api in here

});