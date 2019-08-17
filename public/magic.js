                        let LPPlayerOneUI = document.getElementById("LPPlayerOne");
                        let LPPlayerTwoUI = document.getElementById("LPPlayerTwo");
                        

                        let LPPlayerOne = 20;
                        let LPPlayerTwo = 20;
                        

                        function plus(player){
                                if(player === 0 && LPPlayerOne < 999){
                                        LPPlayerOne++;
                                }
                                else if(player === 1 && LPPlayerTwo < 999){
                                        LPPlayerTwo++;
                                }

                                

                                updateUI();
                        }

                        function minus(player){
                                if(player === 0 && LPPlayerOne > 0){
                                        LPPlayerOne--;
                                } else if (player === 1 && LPPlayerTwo > 0){
                                        LPPlayerTwo--;
                                } 

                                updateUI();
                        }

                        function updateUI(){

                                LPPlayerOneUI.innerHTML = LPPlayerOne;
                                LPPlayerTwoUI.innerHTML = LPPlayerTwo;
                                

                        }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}