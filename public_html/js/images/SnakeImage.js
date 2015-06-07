/* global THREE, CONFIG */

SnakeImage = function (snake, scene) {
    this.snake = snake;
    this.scene = scene;
    
    this.initBody();
    
    this.snake.addMovingHandler(this.movingHandler.bind(this));
    this.snake.addGrowthHandler(this.growthHandler.bind(this));
    this.snake.addRevivalHandler(this.revivalHandler.bind(this));
    this.snake.addDecreaseHandler(this.decreaseHandler.bind(this));
};

SnakeImage.prototype = {
    constructor : SnakeImage,
    
    movingHandler : function () {
        var tail = this.bodyImage.pop();
        var headX = this.snake.body[0].x;
        var headY = this.snake.body[0].y;
        replaceSegment(tail, headX, headY);
        this.bodyImage.unshift(tail);
    },
    
    growthHandler : function () {
        var tail = this.snake.body[this.snake.body.length - 1];
        var tailImage = createSnakeSegment(tail.x, tail.y);
        this.bodyImage.push(tailImage);
        this.scene.add(tailImage);
    },
    
    revivalHandler : function () {
        this.removeBodyFromScene();
        this.initBody();
    },
    
    decreaseHandler : function () {
        var newLength = this.snake.body.length;
        for (var i = this.bodyImage.length - 1; i >= newLength; i--) {
            this.scene.remove(this.bodyImage[i]);
        }
        this.bodyImage.splice(newLength, this.bodyImage.length - newLength);
    },
    
    initBody : function () {
        this.bodyImage = new Array(this.length);
        for (var i = 0; i < this.snake.body.length; i++) {        
            this.bodyImage[i] = createSnakeSegment(this.snake.body[i].x, this.snake.body[i].y);
            this.scene.add(this.bodyImage[i]);
        }
    },
    
    removeBodyFromScene : function () {
        for (var i = 0; i < this.bodyImage.length; i++) {
            this.scene.remove(this.bodyImage[i]);
        }
    }
};

function replaceSegment(segment, x, y) {
    segment.position.x = toSceneX(x);
    segment.position.y = toSceneY(y);
}