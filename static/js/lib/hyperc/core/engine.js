/* 
 * 页面总控制器
 * Owner: cyclegtx
 */

define(['require','exports','module'],function(require, exports, module) {
    var engine = {};
    engine.stages = [];
    engine.width = window.innerWidth;
    engine.height = window.innerHeight;
    //设置宽高
    engine.setSize = function(){
        engine.width = window.innerWidth;
        engine.height = window.innerHeight;
    }
    //添加舞台
    engine.addStage = function(stage){
        engine.stages.push(stage);
    }
    window.addEventListener('resize',function(){
        engine.setSize();
    });
    module.exports = engine;
});