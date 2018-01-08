/**
 * step1通过自执行函数创建命名空间
 * step2共享原型
 * step3内部extend管理代码
 */
(function(global){
    var jQuery = function (){ //构造函数
        return new jQuery.fn.init(); //平时直接类似函数调用jquery，其库里已经实力化过。
    }

    //jQuery实例上的方法定义在此
    jQuery.fn = jQuery.prototype = {   
        init:function(){

        },
        //写实例方法
        css:function(){}
    }

    //通过工具函数管理维护代码
    jQuery.extend = jQuery.fn.extend = function(){
        var len = arguments.length;
        var target = arguments[0]||{};
        var i = 1;
        var key;
        if(typeof target!=='object'|| typeof target!=='function'){
            target =  {};
        }

        //本身 实例
        if(len==i){
            //根据不同的调用改变target指向
            target = this;
            i--;
        }

        //任意对象
        for(;i<len;i++){
            for(key in arguments[i]){ //遍历对象
                target[key]=arguments[i][key];
            }
        }
    }

    //管理维护代码 jQuery 自身上的方法定义在这个之内
    jQuery.extend({ 
        ajax:function(){}
    })

    //实现平时实力插件的扩展机制
    jQuery.fn.init.prototype = jQuery.fn;
    //暴露给全局api
    global.$ = global.jQuery=jQuery;
})(this)