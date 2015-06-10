/* global THREE, CONFIG */

function FireflyImage (firefly, scene) {    
    var image = createFirefly(toSceneX(firefly.x), toSceneY(firefly.y));
    
    scene.add(image);    
    firefly.addMovingHandler(createMovingHandler());
    firefly.addDeathHandler(createDeathHandler());
    
    function createMovingHandler() {
        return function () {
            replaceImage(firefly.x, firefly.y);
        };
    }
    
    function createDeathHandler() {
        return function () {
            scene.remove(image);
        };
    }
    
    function replaceImage (x, y) {
        image.position.x = toSceneX(x);
        image.position.y = toSceneY(y);
    }
};
