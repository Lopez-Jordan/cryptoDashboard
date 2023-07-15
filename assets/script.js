$("#beginBtn").on("click", function(){
    location.replace("main.html");
});



    var requestUrl="https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR"
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