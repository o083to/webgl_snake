/* global THREE, CONFIG, UTILS */

function FireflyImage (firefly, scene) {
    this.firefly = firefly;
    this.scene = scene;
    
    var material = new THREE.MeshLambertMaterial({color: 0xB0C4DE});
    this.image = UTILS.createSphere(CONFIG.fireflyRadius, UTILS.toSceneX(firefly.x), UTILS.toSceneY(firefly.y), material);
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