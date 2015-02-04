; (function () {
    window.onload = function () {
        var myGame = new Game();

        function main(timestamp) {
            var dt = Math.floor(timestamp - myGame.previousTimeStamp);            
            myGame.previousTimeStamp = timestamp;
            myGame.update(dt);
            myGame.draw();               
            myGame.stopMain = window.requestAnimationFrame(main);                     
        }

        myGame.previousTimeStamp = performance.now();
        myGame.setInitialState();
        main(performance.now());

    };
})();