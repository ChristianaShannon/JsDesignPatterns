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