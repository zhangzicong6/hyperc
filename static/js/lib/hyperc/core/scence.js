/* 
 * 场景
 * Owner: cyclegtx
 */

define(['require','exports','module'],function(require, exports, module) {
    function scence(width,height,color){
        this.width = width ||0;
        this.height = height ||0;
        this.pos = {x:0,y:0,z:0};
        this.dom = document.createElement('div');
        this.dom.classList.add('scence');
        this.dom.style.width = this.width+'px';
        this.dom.style.height = this.height+'px';
        this.dom.style.position = 'absolute';
        this.dom.style.left = '0px';
        this.dom.style.top = '0px';
        this.dom.style.background = color;
        this.dom.style.webkitTransition = 'all 500ms';
        this.dom.style.transition = 'all 500ms';
        this.dom.style.MozTransition = 'all 500ms';
        this.position(0,0,0);
    }
    scence.prototype.position = function(x,y,z){
        this.pos.x = x === undefined? this.pos.x : x;
        this.pos.y = y === undefined? this.pos.y : y;
        this.pos.z = z === undefined? this.pos.z : z;
        this.dom.style.webkitTransform = 'translate3d('+this.pos.x+'px,'+this.pos.y+'px,'+this.pos.z+'px)';
        this.dom.style.transform = 'translate3d('+this.pos.x+'px,'+this.pos.y+'px,'+this.pos.z+'px)';
        this.dom.style.MozTransform = 'translate3d('+this.pos.x+'px,'+this.pos.y+'px,'+this.pos.z+'px)';
    }
    scence.prototype.anim = function(style,time,ease){
        var style = style||'all';
        this.dom.style.webkitTransition = style+' '+time+' '+ease;
        this.dom.style.transition = style+' '+time+' '+ease;
        this.dom.style.MozTransition = style+' '+time+' '+ease;
    }
    scence.prototype.clearAnim = function(){
        this.dom.style.webkitTransition ='none';
        this.dom.style.transition ='none';
        this.dom.style.MozTransition ='none';
    }
    module.exports = scence;
});