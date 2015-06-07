/* global THREE, CONFIG */

function FireflyImage (firefly, scene) {
    this.firefly = firefly;
    this.scene = scene;
    
    this.image = createFirefly(toSceneX(firefly.x), toSceneY(firefly.y));
    scene.add(this.image);
    
    this.firefly.addMovingHandler(this.movingHandler.bind(this));
    this.firefly.addDeathHandler(this.deathHandler.bind(this));
}

FireflyImage.prototype = {
    constructor : FireflyImage,
    
    movingHandler : function () {
        replaceImage(this.image, this.firefly.x, this.firefly.y);
    },
    
    deathHandler : function () {
        this.scene.remove(this.image);
    }
};

function replaceImage (image, x, y) {
    image.position.x = toSceneX(x);
    image.position.y = toSceneY(y);
}