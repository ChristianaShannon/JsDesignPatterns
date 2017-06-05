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
