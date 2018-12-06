function GameOver() {
  var screenFreeze = 0;
  var oGame;

    this.setup = function()
    {
        // find a different scene using the SceneManager
        oGame = this.sceneManager.findScene( MainGame ).oScene;
    }

    this.draw = function() {
        if (screenFreeze<50) {
          screenFreeze ++;
          console.log('check' + screenFreeze);
        }
        if (screenFreeze == 50) {
          fill(255,10);
          textSize(60);
          text('OMG',width/2,height/2);
        }
    }
}
