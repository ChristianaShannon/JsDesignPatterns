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