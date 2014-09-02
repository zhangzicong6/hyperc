;(function(window,_d){
	function rotateCate(wrp,option){
		var self = this;
		this.wrpClass = wrp;
		this.wrpDom =  _d.querySelector('.'+this.wrpClass);
		this.ownedItemsNum = this.wrpDom.childElementCount;
		this.itemsNum = this.ownedItemsNum;
		this.duration = '350';
		this.ty = 15;
		this.tz = 250;
		this.rz = 15;
		this.sc = 0.11;
		this.maxRZ = 0;
		this.singleAnimate = true;
		if(option !== undefined){
			this.ty = option.ty !== undefined? option.ty : this.ty;
			this.tz = option.tz !== undefined? option.tz : this.tz;
			this.rz = option.rz !== undefined? option.rz : this.rz;
			this.sc = option.sc !== undefined? option.sc : this.sc;
			this.maxRZ = option.maxRZ !== undefined? option.maxRZ : this.maxRZ;
			this.singleAnimate = option.singleAnimate !== undefined? option.singleAnimate : this.singleAnimate;
			this.duration = option.duration !== undefined? option.duration : this.duration;
			if(this.itemsNum === 0){
				//没有节点接受节点数参数
				this.itemsNum =  option.itemsNum !== undefined? option.itemsNum : this.itemsNum;
			}
		}
		this.baseIndex = 100;
		this.items = [];
		this.animating = false;
		//在最前面的节点
		this.frontDOM =  null;
		for(var i =0;i<this.itemsNum;i++){
			if(this.ownedItemsNum !== 0 ){
				//如果已有节点,绑定节点
				var tmpItem = new item(i,this, this.wrpDom.children[i]);
				this.items[i] = tmpItem;
			}else{
				//如果没有节点,新建节点
				var tmpItem = new item(i,this);
				this.items[i] = tmpItem;
			}
			
		}
        this.wrpDom.style.opacity = 1;
		var showCount = 0;
		for(var i in this.items){
			if(this.items[i].isShow)
				showCount++;
		}
		var invTime = 1000/showCount;
		for(var i in this.items){
			if(!this.items[i].isShow){
				this.items[i].position(false,{duration:0,easing:'linear'}); 
			}else{
				if(showCount >= 0){
					(function(obj,cnt){
						setTimeout(function(){
							obj.position(false,{duration:550,easing:'ease-in'}); 
						},invTime*cnt);
					})(this.items[i],showCount);
					showCount--;
				}
			}
		}
		
	}
	rotateCate.prototype.next = function(duration){
		var duration = duration||this.duration;
		if(this.animating)
			return false;
		if(this.singleAnimate){
			this.animating = true;
		}
		//触发nextStart并传递第一个节点
		var event = document.createEvent('HTMLEvents');
        event.initEvent('nextStart', true, true);
        event.eventType = 'message';
        event.content =  'nextStart';
        event.frontDOM  = this.frontDOM;
        this.wrpDom.dispatchEvent(event);
		for(var i in this.items){
			this.items[i].next(duration);
		}
	}
	rotateCate.prototype.prev = function(duration){
		var duration = duration||this.duration;
		if(this.animating)
			return false;
		if(this.singleAnimate){
			this.animating = true;
		}
		//触发prevStart并传递第一个节点
		var event = document.createEvent('HTMLEvents');
        event.initEvent('prevStart', true, true);
        event.eventType = 'message';
        event.content =  'prevStart';
        event.frontDOM  = this.frontDOM;
        this.wrpDom.dispatchEvent(event);
		for(var i in this.items){
			this.items[i].prev(duration);
		}
	}
	rotateCate.prototype.to = function(pos){
		var self = this;
		var pos = pos || 0;
		for(var i = 0;i<this.itemsNum;i++){
			this.items[i].index = i >= pos? i-pos:this.itemsNum-pos+i;
			this.items[i].calc();
			this.items[i].position();
			this.items[i].setFrontDOM();
		}
	} 
	function item(i,cate,dom){
		var self = this;
		this.cate = cate;
		this.index = i;
		this.domIndex = i;
		//是否显示
		this.isShow = true;
		if(dom !== undefined){
			//如果已有节点,绑定节点
			this.dom = dom;
			this.dom.style.webkitTransform = "translate3d(200%, 200%,0) rotateZ(90deg) scale(2)";
			this.calc();
			this.dom.style.zIndex = this.cssZIndex;
		}else{
			//如果没有节点,新建节点
			this.dom = _d.createElement('div');
			this.dom.style.background = 'hsl('+i*30+', 80%, 70%)';
			this.dom.style.webkitTransform = "translate3d(200%, 200%,0) rotateZ(90deg) scale(2)";
			this.calc();
			this.dom.style.zIndex = this.cssZIndex;
			_d.querySelector('.'+this.cate.wrpClass).appendChild(this.dom);
		}
		this.setFrontDOM();
	}
	item.prototype.position = function(last,option){
		//不显示的节点不做动画，减少计算量
		if(this.dom.style.opacity === 0)
			return false;
		var self = this;
		var duration = this.cate.duration;
		var easing = 'cubic-bezier(.58,.07,.002,1.58)';
		if(option !== undefined){
			duration = option.duration !== undefined? option.duration : duration;
			easing = option.easing !== undefined? option.easing : easing;
		}
		this.calc();
		if(window.Zepto !== undefined){
			Zepto(this.dom).css('z-index',this.cssZIndex);
			Zepto(this.dom).animate({'translate3d':this.cssTranslate3d,'rotateZ':this.cssRotateZ,'scale':this.cssScale},duration,easing,function(){
				if(last !== undefined && last === true){
					Zepto(this).css('z-index',self.cssZIndex);
					self.cate.animating = false;
					var event = document.createEvent('HTMLEvents');
			        event.initEvent('moveOver', true, true);
			        event.eventType = 'message';
			        event.content =  'moveOver';
			        event.frontDOM  = self.cate.frontDOM;
			        self.cate.wrpDom.dispatchEvent(event);
				}
			});
			return true;
		}
		this.dom.style.webkitTransform = "translate3d("+this.cssTranslate3d+") rotateZ("+this.cssRotateZ+") scale("+this.cssScale+")";
		this.dom.style.zIndex = this.cssZIndex;
	}
	item.prototype.calc = function(){
		this.cssTranslate3dX = "0px,";
		this.cssTranslate3dY = "-"+(this.cate.ty*this.index)+"px,";
		this.cssTranslate3dZ = "-"+(this.cate.tz*this.index)+"px";
		this.cssTranslate3d = this.cssTranslate3dX+this.cssTranslate3dY+this.cssTranslate3dZ;
		this.cssScale = 1-(this.index*this.cate.sc);
		this.cssScale = this.cssScale >0 ? this.cssScale :0;
		this.cssScale === 0 && this.hide();
		this.cssScale > 0 && this.show();
		if(this.cate.maxRZ === 0){
			this.cssRotateZ = "-"+(this.cate.rz*this.index)+"deg";
		}else{
			var tmpCssRotateZ = this.cate.rz*this.index;
			if(tmpCssRotateZ > this.cate.maxRZ){
				this.dom.style.opacity = 0;
			}else{
				this.dom.style.opacity = 1;
			}
			tmpCssRotateZ = tmpCssRotateZ > this.cate.maxRZ?this.cate.maxRZ:tmpCssRotateZ;
			tmpCssRotateZ = "-"+tmpCssRotateZ+"deg";
			this.cssRotateZ = tmpCssRotateZ;
		}
		
		this.cssZIndex = this.cate.baseIndex+this.cate.itemsNum - this.index;
	}
	item.prototype.next = function(duration){
		var duration = duration||this.cate.duration;
		this.index -= 1;
		this.index < 0 ?this.moveOut():this.position(false,{duration:duration});
		this.setFrontDOM();
	}
	item.prototype.setFrontDOM = function(){
		if(this.index === 0)
			this.cate.frontDOM = this;
	}
	item.prototype.prev = function(duration){
		var duration = duration||this.cate.duration;
		this.index += 1;
		this.index > (this.cate.itemsNum-1)?this.moveIn():this.position(false,{duration:duration});
		this.setFrontDOM();
	}
	item.prototype.moveOut = function(duration){
		var self = this;
		this.dom.style.zIndex = this.cssZIndex+1;
		this.index = this.cate.itemsNum-1;
		if(window.Zepto !== undefined){
			Zepto(this.dom).animate({'translate3d':"-300%,"+this.cssTranslate3dY+this.cssTranslate3dZ,'rotateZ':this.cssRotateZ,'scale':this.cssScale},550,'ease-in-out',function(){
				self.position(true);
			});
			return true;
		}
		this.dom.style.webkitTransform = "translate3d("+"-300%,"+this.cssTranslate3dY+this.cssTranslate3dZ+") rotateZ("+this.cssRotateZ+") scale("+this.cssScale+")";
		this.dom.style.zIndex = this.cate.baseIndex+1;
		this.cate.animating = false;
	}
	item.prototype.moveIn = function(duration){
		var self = this;
		this.dom.style.zIndex = this.cate.baseIndex+this.cate.itemsNum;
		this.dom.style.webkitTransform = "translate3d(-200%, 0%,0) scale(1) rotateZ(0deg)";
		this.dom.style.opacity = '1';
		this.index = 0;
		self.position(true);
	}
	item.prototype.show = function(){
		this.dom.style.opacity = 1;
		this.isShow = true;
	}
	item.prototype.hide = function(){
		this.dom.style.opacity = 0;
		this.isShow = false;
	}
	window['rotateCate'] = rotateCate; 
})(window,document);