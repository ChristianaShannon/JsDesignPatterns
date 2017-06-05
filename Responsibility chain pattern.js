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
