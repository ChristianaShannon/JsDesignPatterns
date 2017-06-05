//发布-订阅模式
var Event = (function(){
	var list,listen,trigger,remove;
	//信息的缓存池
    list= [],
    listen= function(key,fn) {
        if(!this.list[key]) {
            this.list[key] = [];
        }
        // 监听到订阅的消息，将消息函数行为添加到缓存列表中
        this.list[key].push(fn);
    },
    trigger= function(){
		//信息的发布
        var key = Array.prototype.shift.call(arguments);
        var fns = this.list[key];//fns就是上面的函数信息池
        // 如果没有订阅过该消息的话，则返回
        if(!fns || fns.length === 0) {
            return;
        }
        for(var i = 0,fn; fn = fns[i++];) {
            fn.apply(this,arguments);
        }
    }
	//取消订阅
	remove= function(key,fn){
		var fns = this.list[key];
		 // 如果key对应的消息没有订阅过的话，则返回
		if(!fns){return false};
		// 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
		if(!fn){
			fn&&(fns.length = 0)	
		}else{
			for(var i=fns.length-1;i>=0;i--){
				var _fn= fns[i];
				if(_fn===fn){
					fns.splice(i,1);// 删除订阅者的回调函数
				}
			}
			
		}
	}
	return{
		 listen: listen,
         trigger: trigger,
         remove: remove
	};
	})();
//定义一个initEvent函数，这个函数使所有的普通对象都具有发布订阅功能
var initEvent = function(obj) {
    for(var i in Event) {
        obj[i] = Event[i];
    }
};



// 我们再来测试下，我们给shoeObj这个对象添加发布-订阅功能；
var shoeObj = {};
//实例化一个Event
initEvent(shoeObj);

// 小红订阅如下消息
shoeObj.listen('red',fn1 = function(size){
    console.log("尺码是："+size);  
});

// 小花订阅如下消息
shoeObj.listen('red',fn2 = function(size){
    console.log("再次打印尺码是："+size); 
});
shoeObj.remove("red",fn1);
shoeObj.trigger("red",42);