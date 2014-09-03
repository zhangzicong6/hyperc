微信中分享插件
======
>static/js/weixinjsbridge/weixinjsbridge.js 分享API函数定义  
>static/js/weixinjsbridge/weixinshare.js 分享API使用  
  

#####weixinjsbridge.js  
功能：  
>分享到微信朋友圈 ```weixinShareTimeline(data, callbacks)```  
>发送给微信上的好友 ```weixinSendAppMessage(data, callbacks)```  
>分享到腾讯微博 ```weixinShareWeibo(data, callbacks)```  
>显示网页右上角的按钮 ```showOptionMenu()```  
>隐藏网页右上角的按钮 ```hideOptionMenu()```  
>显示底部工具栏 ```showToolbar()```  
>隐藏底部工具栏 ```hideToolbar()```  
>返回网络类型 ```getNetworkType(callback)```  
>当页面加载完毕后执行，使用方法 ```wxJsBridgeReady()```  

#####weixinshare.js  
使用前须引用```weixinjsbridge.js```  
```
wxData = {
	"imgUrl":'',//分享所使用的图片
	"link": window.location.href,//分享的url地址
	"desc": '',//分享的描述
	"title": ''//分享的标题
};
//分享给好友
Api.shareToFriend(wxData, wxCallbacks);
//分享到朋友圈
Api.shareToTimeline(wxData, wxCallbacks);
//分享到腾讯微博
Api.shareToWeibo(wxData, wxCallbacks);
```  
分享到不同地方(好友、朋友圈、腾讯微博)所使用的wxData可以不用，以达到不同的显示内容

