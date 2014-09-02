/* 
 * 九章别墅
 * Owner: cyclegtx
 */
require.config({
    paths: {
        zepto: 'http://www.iloushi.cn/ued/static/js/lib/zepto/zepto.min',
        zeptoFx: 'http://www.iloushi.cn/ued/static/js/lib/zepto/fx',
        zeptoTouch: 'http://www.iloushi.cn/ued/static/js/lib/zepto/touch',
        slitslider: 'http://www.iloushi.cn/ued/static/js/lib/zepto/zepto.slitslider',
        loadimages: 'http://www.iloushi.cn/ued/static/js/loadimages'
    },
    shim: {
        zepto: {
            exports: '$'
        },
        loadimages: {
            exports: 'loadimages'
        },
        slitslider:['zepto'],
        zeptoTouch: ['zepto'],
        zeptoFx: ['zepto']
    }
});
define(['zepto','require','exports','module'],function($,require, exports, module) {
    var jiuzhangbieshu = {};
    //设置宽高
    jiuzhangbieshu.init = function(data){
        var defaultData = {
            stages:{
                0:{
                    bg:'./img/1.jpg'
                },
                1:{
                    bg:'./img/2.jpg'
                },
                2:{
                    bg:'./img/3-1.jpg'
                },
                3:{
                    bg:'./img/4.jpg'
                },
                4:{
                    bg:'./img/5.jpg'
                },
                5:{
                    bg:'./img/6.jpg'
                },
                6:{
                    bg:'./img/7.jpg'
                }
            }
        };
        this.data = $.extend(defaultData,data);
        this.build();
    }
    jiuzhangbieshu.build = function(){
        var wrp = $('<div></div>');
        wrp.css({'width':'100%',
                'height':'100%',
                'position':'absolute',
                'top':'0',
                'left':'0'
                }).appendTo('body');
        console.log(this.data.stages.length)
        for(var i in this.data.stages){
            var stage = $('<div></div>');
            stage.css({'width':'100%',
                'height':'100%',
                'position':'absolute',
                'top':'0',
                'left':'0'
                }).appendTo(wrp);
            var bg = $('<img>').attr('src',this.data.stages[i].bg);
            bg.css({
                'width':'100%',
                'height':'100%'
            }).appendTo(stage);
        }
    }
    module.exports = jiuzhangbieshu;
});