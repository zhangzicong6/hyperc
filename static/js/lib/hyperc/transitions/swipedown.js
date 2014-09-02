/* 
 * 下滑分页
 * Owner: cyclegtx
 */

define(['require','exports','module','hyperc/core/stage','hyperc/core/scence'],function(require, exports, module,stage,scence) {
    function swipedown(engine,pagesnum){
        this.index = 0;
        this.engine = engine;
        this.pagesnum = pagesnum || 0;
        this.stage = new stage();
        for(var i =0;i<this.pagesnum;i++){
            var tmp = new scence(this.engine.width,this.engine.height,'hsl('+120*i+',80%,80%)');
            if(i == 0){
                tmp.position(0,0);
            }else{
                tmp.position(0,tmp.height);
            }
            this.stage.addScence(tmp);
        }

    }
    swipedown.prototype.next = function(){
        if(this.index >= this.pagesnum-1)
            return false;
        var cur = this.index;
        this.index++;
        var nxt = this.index;
        this.stage.scences[cur].position(0,-this.stage.scences[cur].height);
        this.stage.scences[nxt].position(0,0);
    }
    swipedown.prototype.prev = function(){
        if(this.index <= 0)
            return false;
        var cur = this.index;
        this.index--;
        var prev = this.index;
        this.stage.scences[cur].position(0,this.stage.scences[cur].height);
        this.stage.scences[prev].position(0,0);
    }
    module.exports = swipedown;
});
