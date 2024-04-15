chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var scripts = ['localStorage.getItem("access_token")','sessionStorage.getItem("access_token")'];
  
    scripts.forEach(
      script => {
        chrome.tabs.executeScript(
          tabs[0].id,
          { code: script },
          function(result) {
            try {
              const bearerToken = result[0];   

              if (bearerToken) {
                localStorage.setItem("valueStorage","Bearer " + bearerToken);
                navigator.clipboard.writeText("Bearer " + bearerToken);
                textInput.value = bearerToken;
                showText();
              }else{
                if(localStorage.getItem("valueStorage") != undefined && localStorage.getItem("valueStorage") != null ){
                  navigator.clipboard.writeText(localStorage.getItem("valueStorage"));
                  showText();
                }
              }
            } catch (error) {
              
            }
          }
        );
      }
    )
  });

var textInput = document.getElementById("textInput");

var valueStorage = localStorage.getItem("valueStorage");

if (valueStorage) {
    textInput.value = valueStorage;
}

textInput.onchange = function() {
  var valueInput = textInput.value;
  localStorage.setItem("valueStorage", valueInput);
};

document.getElementById("copy").addEventListener("click", function() 
    {
        showText();
        var valueStorage = localStorage.getItem("valueStorage");

        navigator.clipboard.writeText(valueStorage)
    }
);


function showText(){
    document.getElementById("message").style.display = "block"
    document.getElementById("copy").style.display = "none";
  
    setTimeout(function() {
      document.getElementById("message").style.display = 'none';
      document.getElementById("copy").style.display = "block";
    }, 1000);
  }