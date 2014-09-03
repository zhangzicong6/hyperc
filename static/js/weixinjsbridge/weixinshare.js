WeixinApi.ready(function(Api){ 
    var wxData = {
        "imgUrl":'',
        "link": window.location.href,
        "desc": '',
        "title": ''
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