//Copiado Auto
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var scripts = ['localStorage.getItem("access_token")','sessionStorage.getItem("access_token")'];

  scripts.forEach(
    script => {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: script },
        function(result) {
          const bearerToken = result[0];     
          if (bearerToken) {
            copied = true;
            navigator.clipboard.writeText("Bearer " + bearerToken)
              .then(() => {
                showText();
              });
          }
        }
      );
    }
  )
});
  
//Pulsando Boton
document.getElementById("copyToken").addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

    var scripts = ['localStorage.getItem("access_token")','sessionStorage.getItem("access_token")'];
  
    scripts.forEach(
      script => {
        chrome.tabs.executeScript(
          tabs[0].id,
          { code: script },
          function(result) {
            const bearerToken = result[0];
            if (bearerToken) {
              copied = true;
              navigator.clipboard.writeText("Bearer " + bearerToken)
                .then(() => {
                  showText();
                });
            }
          }
        );
      }
    )
  });
});

function showText(){
  document.getElementById("message").style.display = "block"
  document.getElementById("copyToken").style.display = "none";

  setTimeout(function() {
    document.getElementById("message").style.display = 'none';
    document.getElementById("copyToken").style.display = "block";
  }, 1000);
}


