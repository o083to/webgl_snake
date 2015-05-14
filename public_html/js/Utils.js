/* global THREE, CONFIG */

function createSphere(radius, x, y, material) {
    var sphereGeometry = new THREE.SphereGeometry(radius,20,20);
    var sphere = new THREE.Mesh(sphereGeometry,material);
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = CONFIG.playersZ;
    return sphere;
}