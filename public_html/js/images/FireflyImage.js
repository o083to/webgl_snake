/* global THREE, CONFIG, UTILS, IMAGE_UTILS */

function FireflyImage (firefly, scene) {
    this.firefly = firefly;
    this.scene = scene;
    
    this.image = IMAGE_UTILS.createFirefly(UTILS.toSceneX(firefly.x), UTILS.toSceneY(firefly.y));
    scene.add(this.image);
    
    this.firefly.addMovingHandler(this.movingHandler.bind(this));
}

FireflyImage.prototype = {
    constructor : FireflyImage,
    
    movingHandler : function () {
        replaceImage(this.image, this.firefly.x, this.firefly.y);
    }
};

function replaceImage (image, x, y) {
    image.position.x = UTILS.toSceneX(x);
    image.position.y = UTILS.toSceneY(y);
}