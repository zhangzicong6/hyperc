/* 
 * 舞台
 * Owner: cyclegtx
 */

define(['require','exports','module'],function(require, exports, module) {
    function stage(){
        this.scences = [];
        this.sprites = [];
        this.pos = {x:0,y:0,z:0};
        this.dom = document.createElement('div');
        this.dom.classList.add('stage');
        this.dom.style.width = '100%';
        this.dom.style.height = '100%';
        this.dom.style.position = 'absolute';
        this.dom.style.left = '0px';
        this.dom.style.top = '0px';
        this.dom.style.overflow = 'hidden';
        document.body.appendChild(this.dom);
    }
    stage.prototype.addScence = function(scence){
        this.scences.push(scence);
        this.dom.appendChild(scence.dom);
    }
    stage.prototype.addSprite = function(sprite){
        this.sprites.push(sprite);
        sprite.appendTo(this);
        this.dom.appendChild(sprite.dom);
    }
    module.exports = stage;
});