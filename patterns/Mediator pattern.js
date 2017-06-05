//中介者模式
//中介者模式高度类似于订阅发布式，相当于是一个变体
//eg。
var mediator = (function(){
	var lists= {};
	var listerner= function(key,fn){
		if(!lists[key]){
			lists[key]= [];
		}
		lists[key].push({context:this, callback:fn});// 监听到订阅的消息，将消息函数行为添加到缓存列表中
		return this;
	}
	var trigger = function(key){
		var args = Array.prototype.slice.call(arguments,1)
		if(!lists[key]){
			return false
		}
		for(i=0,l=lists[key].length,i<l,i++,){
			var subscrition = lists[key][i];
			subscrtion.callback.apply(subscription.context,args)//这一步将callback给予sub.context使用，为啥这样写我也不懂
		}
		return this;
	}
	return{listerner:listerner;
			trigger:trigger;
			installTo:function(obj){
				obj.listener = listener;
				obj.trigger = trigger;
			}
		}
})()
mediator.listerner("newmsg",function(data){dosomething})//订阅newmsg消息，通过mediator中转
//发布newmsg消息，通过mediator中转；第二个参数中为具体消息，可以来源于dom获取或者后台PHP
mediator.trigger("newmsg",{message from PHP: some message;})