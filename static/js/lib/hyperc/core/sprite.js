/* 
 * div元素
 * Owner: cyclegtx
 */

define(['require','exports','module'],function(require, exports, module) {
    function sprite(type){
        this.type = type || 'div';
        switch(this.type){
            case 'div':
                this.dom  = document.createElement('div');
                break;
            case 'img':
            case 'image':
                this.dom = document.createElement('img');
                break;
            case 'audio':
                this.dom = document.createElement('audio');
                break;
            case 'vedio':
                this.dom = document.createElement('vedio');
                break;
            case 'canvas':
                this.dom = document.createElement('canvas');
                break;
        }
        this.pos = {x:0,y:0,z:0};
        this.width = 0;
        this.height = 0;
        this.dom.style.position = 'absolute';
        this.dom.style.left = '0px';
        this.dom.style.top = '0px';
        this.dom.style.webkitTransition = 'all 500ms';
        this.dom.style.transition = 'all 500ms';
        this.dom.style.MozTransition = 'all 500ms';
        this.childrenNode = [];
        this.parentNode = null;
    }
    sprite.prototype.position = function(x,y,z){
        this.pos.x = x === undefined? this.pos.x : x;
        this.pos.y = y === undefined? this.pos.y : y;
        this.pos.z = z === undefined? this.pos.z : z;
        this.dom.style.webkitTransform = 'translate3d('+this.pos.x+'px,'+this.pos.y+'px,'+this.pos.z+'px)';
        this.dom.style.transform = 'translate3d('+this.pos.x+'px,'+this.pos.y+'px,'+this.pos.z+'px)';
        this.dom.style.MozTransform = 'translate3d('+this.pos.x+'px,'+this.pos.y+'px,'+this.pos.z+'px)';
    }
    sprite.prototype.size = function(w,h){
        this.width = w === undefined? this.width:w;
        this.height = h === undefined? this.height:h;
        this.dom.style.width = this.width+'px';
        this.dom.style.height = this.height+'px';
    }
    sprite.prototype.addChild = function(child){
        this.childrenNode.push(child);
    }
    sprite.prototype.appendTo = function(parent){
        this.parentNode = parent
    }
    module.exports = sprite;
});