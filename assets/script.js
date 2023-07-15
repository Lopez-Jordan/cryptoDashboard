$("#beginBtn").on("click", function(){
    location.replace("main.html");
});


document.getElementById('submit-button').addEventListener('click', function() {
    var symbols = [];
    var weights = [];
    var totalWeight = 0;
  
    // Collect symbols and weights
    for (var i = 1; i <= 5; i++) {
      var symbol = document.getElementById('crypto' + i).value;
      var weight = parseFloat(document.getElementById('crypto' + i + '-weight').value);
      
      if (symbol && weight) {
        symbols.push(symbol);
        weights.push(weight);
        totalWeight += weight;
      }
    }
  
    // Check for errors
    var errorMessage = '';
    if (symbols.length === 0 || weights.length === 0) {
      errorMessage = 'Please enter at least one cryptocurrency and weight.';
    } else if (totalWeight !== 100) {
      errorMessage = 'Weights must add up to 100%.';
    }
  
    // Display error or proceed
    if (errorMessage) {
      document.getElementById('error-message').textContent = errorMessage;
    } else {
      document.getElementById('error-message').textContent = '';
      // Perform desired action with the selected cryptocurrencies and weights
      console.log('Selected Symbols:', symbols);
      console.log('Selected Weights:', weights);
    }
  });
  