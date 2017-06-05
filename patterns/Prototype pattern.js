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