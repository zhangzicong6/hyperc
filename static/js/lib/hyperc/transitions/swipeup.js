/* 
 * 下滑分页
 * Owner: cyclegtx
 */

define(['require','exports','module','hyperc/core/stage','hyperc/core/sprite'],function(require, exports, module,stage,sprite) {
    function swipeup(engine,pagesnum){
        this.index = 0;
        this.engine = engine;
        this.pagesnum = pagesnum || 0;
        this.pageslist = [];
        this.spritelist = [];
        this.stage = new stage();
        for(var i =0;i<this.pagesnum;i++){
            var tmp = new sprite();
            tmp.size(engine.width,engine.height);
            tmp.dom.style.background = 'hsl('+i*120+',80%,80%)';
            //tmp.dom.style.zIndex = this.pagesnum-i;
            //tmp.dom.textContent = '第'+i+'页';
            if(i == 0){
                tmp.position(0,0);
            }else{
                tmp.position(0,0);
            }
            this.stage.addSprite(tmp);
            this.pageslist.push(tmp);
            var word = new sprite();
            word.dom.textContent = '第'+i+'页';
            word.size(200,200);
            word.appendTo(tmp);
            word.position(word.parentNode.pos.x,word.parentNode.pos.y);
            //word.dom.style.zIndex = this.pagesnum-i+1;
            document.querySelector('.stage').appendChild(word.dom);
        }

    }
    swipeup.prototype.next = function(){
        if(this.index >= this.pagesnum-1)
            return false;
        var cur = this.index;
        this.index++;
        this.pageslist[cur].position(0,-this.pageslist[cur].height);
    }
    swipeup.prototype.prev = function(){
        if(this.index <= 0)
            return false;
        this.index--;
        var prev = this.index;
        this.pageslist[prev].position(0,0);
    }
    module.exports = swipeup;
});
