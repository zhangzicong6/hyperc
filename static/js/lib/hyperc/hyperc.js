/* 
 * 页面总控制器
 * Owner: cyclegtx
 */

define('hyperc/core/Engine',['require','exports','module'],function(require, exports, module) {
    this.stages = [];
    this.width = 0;
    this.height = 0;
    //设置宽高
    function setSize(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    //新建场景
    function init(){
        this.setSize();
    }
    window.addEventListener('resize',function(){
        this.setSize();
        console.log(this.width,this.height)
    });
    module.exports = this;
});
