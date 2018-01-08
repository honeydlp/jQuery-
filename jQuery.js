/**
 * step1通过自执行函数创建命名空间
 * step2共享原型
 * step3内部extend管理代码
 */
(function(global){          //自执行函数 jquery里用window 我这边不局限于window node上也可以使用
    var jQuery = function (selector, context){ //构造函数
    	// 平时我们直接使用的时候，一般$.xxx或者 $().xxx 是因为jquery已经帮我们实例了
    	//这边巧妙的设计，为什么没有直接 new jQuery()呢，先理解实例化做了什么，step1内存中开辟空间，step2 函数调用，如果这样的化就会不断的死循环，内存溢出
    	//不懂jQuery.fn.init的请看下面代码
        return new jQuery.fn.init(selector, context, rootjQuery); 

    }

    //jQuery实例上的方法定义在此
    jQuery.fn = jQuery.prototype = {   
    	//构造器指向jQuery
    	constructor: jQuery,     
        init:function(selector, context, rootjQuery){
        	/**
        	 * xxx代码
        	 */
        	// 返回dom的数组，实现链式调用
        	return jQuery.makeArray( selector, this );
        },
        //写实例方法 调用时候，我们一般通过$().first 调用
		first: function() {
			return this.eq( 0 );
		}
    }

    //通过工具函数extend管理维护代码
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

    //管理维护代码 jQuery 自身上的方法属性定义在这个之内
    jQuery.extend({ 
        ajax:function(){}
    })

    //实现平时实例插件的扩展机制
    //为以后的实例准备jQuery原型构造函数
    jQuery.fn.init.prototype = jQuery.fn; //jQuery.fn.init是构造函数

    //暴露给全局api
    global.$ = global.jQuery=jQuery;

})(this)