/*遮罩序列帧*/
;(function(window){
function maskSprite(dom,w,h,time){
	if(dom){
		this.dom = dom;
		this.w = w ||0;
		this.h = h ||0;
		this.time = time || 0;
		this.display = this.dom.style.display;
		this.played = false;
		this.stop = false;
		this.setTimeoutHandles = [];
	}else{
		return false;
	}
}
maskSprite.prototype.run = function(){
	if(this.played)
		return false;
	this.played = true;
	this.show();
	this.setTimeoutHandles = [];
	for(var w=0;w<this.w;w++){
		for(var h =0;h<this.h;h++){
			(function(w,h,self){
				var time = (h*self.time*self.w+w*self.time);
				var handle = setTimeout(function(){
					var oh = self.h == 1?1:self.h-1;
					var ow = self.w == 1?1:self.w-1;
					self.dom.style.webkitMaskPosition = (100/ow)*w+'% '+(100/oh)*h+'%';
					if(w >= self.w-1 && h>=self.h-1){
						var event = document.createEvent('HTMLEvents');
	                    event.initEvent('finish', true, true);
	                    event.eventType = 'message';
	                    event.content =  'finish';
	                    self.dom.dispatchEvent(event);
					}
				},time);
				self.setTimeoutHandles.push(handle);
			})(w,h,this);
		}
	}
}
maskSprite.prototype.infinite = function(replay){
	var replay = replay || 0;
	this.show();
	this.setTimeoutHandles = [];
	for(var w=0;w<this.w;w++){
		for(var h =0;h<this.h;h++){
			(function(w,h,self){
				var time = (h*self.time*self.w+w*self.time);
				var handle = setTimeout(function(){
					var oh = self.h == 1?1:self.h-1;
					var ow = self.w == 1?1:self.w-1;
					self.dom.style.webkitMaskPosition = (100/ow)*w+'% '+(100/oh)*h+'%';
					if(w >= self.w-1 && h>=self.h-1){
						var replayHandle = setTimeout(function(){self.infinite(replay);},replay);
						self.setTimeoutHandles.push(replayHandle);
					}
				},time);
				self.setTimeoutHandles.push(handle);
			})(w,h,this);
		}
	}

}
maskSprite.prototype.stopInfinite = function(){
	for(var i in this.setTimeoutHandles){
		clearTimeout(this.setTimeoutHandles[i]);
	}
}
maskSprite.prototype.hide = function(){
	this.dom.style.display = 'none';
}
maskSprite.prototype.show = function(){
	this.dom.style.display = this.display;
}
maskSprite.prototype.finish = function(callback){
	this.dom.addEventListener('finish',callback);
}
window.maskSprite = window.maskSprite || maskSprite;
})(window);