function GameOver() {
  var oGame;

    this.setup = function()
    {
        // find a different scene using the SceneManager
        oGame = this.sceneManager.findScene( mainGame ).oScene;
    }

    this.draw = function() {
        fill(255);
        textSize(60);
        text('OMG',width/2,height/2);
    }
}
