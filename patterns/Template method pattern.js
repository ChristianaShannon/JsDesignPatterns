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
