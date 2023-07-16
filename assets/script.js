$("#beginBtn").on("click", function(){
    location.replace("main.html");
});


function validateForm(data){
 
}

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
    localStorage.setItem("user", JSON.stringify(newObj)); //not done!!!!
  }
    console.log(newObj); // just for tests!!!
  


  $("#visDivOne").css("display","none");
  $("#visDivTwo").css("display","none");
  $("#visDivThree").css("display","none");
  $("#visDivFour").css("display","none");
  $("#create").css("display","block");
  $("#nextOne").css("display","block");
  $("#nextTwo").css("display","block");
  $("#nextThree").css("display","block");
});

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


