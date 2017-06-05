
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