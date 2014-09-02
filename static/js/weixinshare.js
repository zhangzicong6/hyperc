var _paq = _paq || [];
_paq.push(['trackEvent', 'Menu', 'weixinshare']);
_paq.push(['trackEvent', 'Menu', 'tel']);
_paq.push(['trackEvent', 'Menu', 'map']);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
var u=(("https:" == document.location.protocol) ? "https" : "http") + "://piwik.iloushi.cn/";
_paq.push(['setTrackerUrl', u+'piwik.php']);
_paq.push(['setSiteId', 1]);
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript';
g.defer=true; g.async=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
function clicktel(){
    _paq.push(['setCustomVariable', 1, 'Menu', 'tel', 'page']);
    _paq.push(['trackEvent', 'Menu', 'tel']);
}
function clickmap(){
    _paq.push(['setCustomVariable', 2, 'Menu', 'map', 'page']);
    _paq.push(['trackEvent', 'Menu', 'map']);
}


WeixinApi.ready(function(Api){ 
    var wxData = {
        "imgUrl":'http://www.iloushi.cn/ued/yuanyanghuashu/img/wxlogo.jpg',
        "link": window.location.href,
        "desc": '远洋华墅，国内首创精粹滨海度假独栋别墅，坐享盈滨半岛，稀缺景观资源，一线开阔外海，蜿蜒内部水系，17公里黄金沙滩。',
        "title": '远洋华墅_尽瞰江山如此多娇'
        };

    // 分享的回调
    var wxCallbacks = {
        // 分享操作开始之前
        ready:function () {
        // 你可以在这里对分享的数据进行重组
        },
        // 分享被用户自动取消
        cancel:function (resp) {
            // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
        },
        // 分享失败了
        fail:function (resp) {
            // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
        },
        // 分享成功
        confirm:function (resp) {
            // 分享成功了，我们是不是可以做一些分享统计呢？
        },
        // 整个分享过程结束
        all:function (resp) {
            _paq.push(['setCustomVariable', 3, 'Menu', 'weixinshare', 'page']);
            _paq.push(['trackEvent', 'Menu', 'weixinshare']);
            // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
        }
    };
     // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
    Api.shareToFriend(wxData, wxCallbacks);
    // 点击分享到朋友圈，会执行下面这个代码
    Api.shareToTimeline(wxData, wxCallbacks);
    // 点击分享到腾讯微博，会执行下面这个代码
    Api.shareToWeibo(wxData, wxCallbacks);
});