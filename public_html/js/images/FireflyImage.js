/* global THREE, CONFIG, UTILS */

function FireflyImage (firefly, scene) {
    this.firefly = firefly;
    this.scene = scene;
    
    var material = new THREE.MeshLambertMaterial({color: 0xB0C4DE});
    this.image = UTILS.createSphere(CONFIG.fireflyRadius, UTILS.toSceneX(firefly.x), UTILS.toSceneY(firefly.y), material);
    scene.add(this.image);
}

FireflyImage.prototype = {
    constructor : FireflyImage
};