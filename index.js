//原型模式
//原型模式常用的：Object.create()
//常用的方法：
var beget = (function(){
	function F(){};
	return function (proto){
		F.prototype = proto;
		return new F();
	}
})();


//命令模式；设置一个bindEnv，作为dom事件和处理函数之间的沟通点，即命令者
//eg.调用dom点击，对页面菜单进行刷新、增删
/* bindEnv函数负责往按钮上面安装点击命令。点击按钮后，会调用函数 */
var bindEnv = function(button,func) {
    button.onclick = function(){
        func();
    }
};
// 现在我们来编写具体处理业务逻辑代码
var Todo1 = {
    test1: function(){
        alert("我是来做第一个测试的");
    }    
};
// 实现业务中的增删改操作
var Menu = {
    add: function(){
        alert("我是来处理一些增加操作的");
    },
    del: function(){
        alert("我是来处理一些删除操作的");
    },
    update: function(){
        alert("我是来处理一些更新操作的");
    }
};
// 调用函数
bindEnv(b1,Todo1.test1);
// 增加按钮
bindEnv(b2,Menu.add);

/*也可以写出宏命令的模式，通过一个命令对象execute，将很多函数方法编入一个数组，循环遍历，根据需要执行
eg. */
var command1 = {
    execute: function(){
        console.log(1);
    }
}; 
var command2 = {
    execute: function(){
        console.log(2);
    }
};
var command3 = {
    execute: function(){
        console.log(3);
    }
};
// 定义宏命令，command.add方法把子命令添加进宏命令对象，
// 当调用宏命令对象的execute方法时，会迭代这一组命令对象，
// 并且依次执行他们的execute方法。
var command = function(){
    return {
        commandsList: [],
        add: function(command){
            this.commandsList.push(command);
        },
        execute: function(){
            for(var i = 0,commands = this.commandsList.length; i < commands; i+=1) {
                this.commandsList[i].execute();
            }
        }
    }
};
// 初始化宏命令
var c = command();
c.add(command1);
c.add(command2);
c.add(command3);
c.execute();  // 1,2,3




//Module 模式
//eg. 创建一个购物车
var basketModule= (function(){//function(全局变量)就可以引入全局变量，例如$
	//私有
	var basket =[];
	function dosomethingPrivate(){}
	//公有接口
	return{
			addItem: function(value){
			basket.push(values);
		},
				getItemCount: function (){
			return basket.length;
		},
		//私有函数的公有名称
		dosomething:  dosomethingPrivate,
		getTotal: function (){
			var itemCount = this.getItemCount();
			total = 0;
			while(itemCount--){
				total += basket[itemCount].price;
			}
			return total;
		}
	};
})()

//Revealing Module 模式
//eg.
var myRevealingModule = function (){
	//私有属性和方法
	var privateVar = someValue;
	publicVar = otherValue;
	function privateFunction (){
		dosomething
	}
	function publicSetName(strName){
		privateName = strName;
	}
	function publicGetName(){
		privateFunction();
	}
	//公有接口
	return{
			setName:publicSetName,
			greeting:publicVar,
			getName: publicGetName
	}
	}()
	
//Singleton 单例模式
//Module 模式中，将私有部分做成一个构造函数 function Foo();然后构造一个对象继承它，这个对象/对象方法的接口做成公有的
//eg.
var mySingletion = (function(){
		var instance;//新的对象
		function init(){//这里也可以做成构造函数的模式，让instance继承
			function privateMethod(){}//私有方法和属性
			return{//公有方法和属性
				publicMethod: function doSomePublic(){.....}
			}
		}
	return{
		//获取init的实例，不存在则创建一个新的
		getInstance:function(){
			if(!instance){
				instance=init();
			}
			return instance;//把对象做成最终的公有接口
		}
	}
})()
//代理模式:设立一个代理对象，代替本体进行实例化；对于实例化比较费时的本体对象，我们可以推迟实例化该对象；
/*eg.使用代理模式实现图片预加载:myImage 函数只负责创建img元素，
代理函数ProxyImage 负责给图片设置loading图片，当图片真正加载完后的话，
调用myImage中的myImage.setSrc方法设置图片的路径；
*/
var myImage =(function(){
	var imgNode=document.createElement('img');
	document.body.appendChild(imgNode);
	return{
		setSrc:function(src){
			imgNode.src= src;
		}	
	}
})()
// 代理模式
var ProxyImage = (function(){
    var img = new Image();
    img.onload = function(){
        myImage.setSrc(this.src);
    };
    return {
        setSrc: function(src) {
                         myImage.setSrc("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif");
        img.src = src;
        }
    }
})();
// 调用方式
ProxyImage.setSrc("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png");


//职责链模式：自己处理不了的分装给下一个处理，形成一个链
/*如下代码;分别编写order500，order200，orderNormal三个函数，在函数内分别处理自己的业务逻辑，
如果自己的函数不能处理的话，就返回字符串nextSuccessor 往后面传递，然后封装Chain这个构造函数，
传递一个fn这个对象实列进来，且有自己的一个属性successor，原型上有2个方法 setNextSuccessor 和 passRequest;
setNextSuccessor 这个方法是指定节点在职责链中的顺序的，把相对应的方法保存到this.successor这个属性上，
chainOrder500.setNextSuccessor(chainOrder200);chainOrder200.setNextSuccessor(chainOrderNormal);指定链中的顺序，
然后this.successor && this.successor.passRequest.apply(this.successor,arguments);就执行这句代码；
上面我们说过this.successor这个属性引用了2个方法 分别为order200和orderNormal，
因此调用order200该方法，所以就返回了值，依次类推都是这个原理。*/
//eg.
function order500(orderType,isPay,count){
	if(orderType==1&&isPay==true){
		console.log(this is sitution A)
	}else{
		//交给下一个单元处理
		return "nextSuccessor"
	}
}
function order200(orderType,isPay,count){
	if(orderType==2&&isPay==true){
		console.log(this is sitution B)
	}else{
		//交给下一个单元处理
		return "nextSuccessor"
	}
}
function orderNormal(orderType,isPay,count){
	if(count>0){
		console.log(this is sitution C);
	}else{
		console.log(this is situation D);
	}
}
// 下面需要编写职责链模式的封装构造函数方法
var Chain = function(fn){
	this.fn = fn;
	this.successor = null;
};
Chain.prototype.setNextSuccessor =function(successor){
	return this.successor =successor;
}
//下传请求
Chain.prototype.passRequest = function(){
	var ret = this.fn.apply(this,arguments);
	if(ret==="nextsuccessor"){
			return this.succssor&&
			this.successor.passRequest.apply(this.successor,arguments);	
	}
	return ret;
}	
//现在我们把3个函数分别包装成职责链节点：
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 然后指定节点在职责链中的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

//最后把请求传递给第一个节点：
chainOrder500.passRequest(1,true,500);  // 亲爱的用户，您中奖了100元红包了
chainOrder500.passRequest(2,true,500);  // 亲爱的用户，您中奖了20元红包了
chainOrder500.passRequest(3,true,500);  // 亲爱的用户，您已抽到10元优惠卷 
chainOrder500.passRequest(1,false,0);   // 亲爱的用户，请再接再厉哦


//模板方法模式
/* 模板方法模式由二部分组成，第一部分是抽象父类，第二部分是具体实现的子类，
一般的情况下是抽象父类封装了子类的算法框架，
包括实现一些公共方法及封装子类中所有方法的执行顺序，
子类可以继承这个父类，并且可以在子类中重写父类的方法，从而实现自己的业务逻辑
*/
//eg.封装一个处理面试的对象
//创建抽象父类Interview,封装一些公用的方法
var Interview = function(){};
//封装一些公有方法
Interview.prototype.writtenTest = function(){
	console.log("this is writtenTest")
};
Interview.prototype.technicalInterview = function(){
	console.log("this is technicalInterview")
};
Interview.prototype.leader = function(){
	console.log("this is leaderInterview")
}
Interview.prototype.waitNotice = function(){
	console.log("wait a notice")
}
//对公有代码初始化，造出一个接口
Interview.prototype.init = function(){
	this.writtenTest();
	this.technicalInterview();
	this.leader();
	this.waitNotice();
};
//创建一个子类来继承父类，然后使用这个子类，可以再子类里修改公用方法
var TentecentInterview =function(){};
TentecentInterview.prototype = new Interview();
//可以再子类里修改公用方法
TentecentInterview.prototype.writtenTest = function(){
	console.log("this is Tentecent interview")
};
//实例化一个
var tentcentgamesView = new TentecentInterview();
tentcentgamesView.init();


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


//策略模式，完成对表单的验证，JQ中的Validtor方法；实际上是把所有策略方法打包成模块1（下面的strategys对象），
//然后在Validtor构造函数中使用add接口来联结具体数据，用start接口调用所有实例化的add方法进行校验并返回信息；
//返回的信息，即errMsg，传递给onsubmit时间，在页面上展现（view 的实现）

                // 策略对象 eg。
var strategys = {
    isNotEmpty: function(value,errorMsg) {
        if(value === '') {
            return errorMsg;
        }
    },
    // 限制最小长度
    minLength: function(value,length,errorMsg) {
        if(value.length < length) {
            return errorMsg;
        }
    },
    // 手机号码格式
    mobileFormat: function(value,errorMsg) {
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    } 
};
var Validator = function(){
    this.cache = [];  // 保存效验规则
};
Validator.prototype.add = function(dom,rules) {
    var self = this;
    for(var i = 0, rule; rule = rules[i++]; ){
        (function(rule){
            var strategyAry = rule.strategy.split(":");
            var errorMsg = rule.errorMsg;
            self.cache.push(function(){
                var strategy = strategyAry.shift();
                strategyAry.unshift(dom.value);
                strategyAry.push(errorMsg);
                return strategys[strategy].apply(dom,strategyAry);
            });
        })(rule);
    }
};
Validator.prototype.start = function(){
    for(var i = 0, validatorFunc; validatorFunc = this.cache[i++]; ) {
    var msg = validatorFunc(); // 开始效验 并取得效验后的返回信息
    if(msg) {
        return msg;
    }
    }
};
// 代码调用
var registerForm = document.getElementById("registerForm");
var validateFunc = function(){
    var validator = new Validator(); // 创建一个Validator对象
    /* 添加一些效验规则 */
    validator.add(registerForm.userName,[
        {strategy: 'isNotEmpty',errorMsg:'用户名不能为空'},
        {strategy: 'minLength:6',errorMsg:'用户名长度不能小于6位'}
    ]);
    validator.add(registerForm.password,[
        {strategy: 'minLength:6',errorMsg:'密码长度不能小于6位'},
    ]);
    validator.add(registerForm.phoneNumber,[
        {strategy: 'mobileFormat',errorMsg:'手机号格式不正确'},
    ]);
    var errorMsg = validator.start(); // 获得效验结果
    return errorMsg; // 返回效验结果
};
// 点击确定提交
registerForm.onsubmit = function(){
    var errorMsg = validateFunc();
    if(errorMsg){
        alert(errorMsg);
        return false;
    }
}

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