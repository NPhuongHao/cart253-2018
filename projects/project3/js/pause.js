function pause() {
  this.preload = function() {}

  this.setup = function() {
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene( MainGame ).oScene;
    background(0, 150);
  }

  this.draw = function() {
    
  }
}
