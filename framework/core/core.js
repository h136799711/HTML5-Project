//基本对象
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主模型。
//baseview


function BaseView() {
    this.initialize = function() {
        throw new Error("subobject  must  implements the method (initialize)");
    };
	this.destory = function(){
		throw new Error("subObject must implemetns the method (destroy) ");
	};
}

//base model


function BaseModel() {
    this.initialize = function() {
        throw new Error("subobject  must  implements the method (initialize)");
    };
	this.destory = function(){
		throw new Error("subObject must implemetns the method (destroy) ");
	};

}

//base ctrl


function BaseCtrl() {
    this.model = { };
    this.view = { };
    this.initialize = function() {
        throw new Error("subobject  must  implements the method (initialize)");
    };
	this.destory = function(){
		throw new Error("subObject must implemetns the method (destroy) ");
	};

}
//
//自定义事件
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 为JS对象添加事件，触发事件，比较简单。
var MFGEvent = (function() {
    var _listeners = [];
    //  var bTest = false;
    //this，指向return内对象定义的变量，在函数调用时
    //这种方式必须如此，如果定义上面的变量则只是局部
    //添加事件
    var addEvent = function(type, fn) {

        if (typeof _listeners[type] === "undefined") {
            _listeners[type] = [];
        }
        if (typeof fn === "function") {
            _listeners[type].push(fn);
            return true;
        }

        return false;
    };
    //触发事件,type:事件类型,del_soon:true时触发后立即删除,
    //args:触发函数的参数
    var fireEvent = function(type, args, del_soon) {
        var arrayEvent = _listeners[type];
        if (arrayEvent instanceof Array) {
            var i;
            for (i = arrayEvent.length - 1; i >= 0; i -= 1) {
                if (typeof arrayEvent[i] === "function") {
                    arrayEvent[i]({
                        type: type,
                        args: args
                    });
                    if (del_soon === true) {
                        arrayEvent.splice(i, 1);
                    }
                }
            }
        }
    };
    var removeEvent = function(type, fn) {
        if (typeof type !== "string"){
            return false;
        }
        var arrayEvent = _listeners[type];
        if (typeof arrayEvent !== "undefined" && typeof fn === "function") {
            var i;
            for (i = arrayEvent.length - 1; i >= 0; i -= 1) {
                if (arrayEvent[i] === fn) {
                    _listeners[type].splice(i, 1);
                }
            }
        } else {
            delete _listeners[type];
            return true;
        }
    };
    return {
        addEvent: addEvent,
        //添加事件成功返回true，失败返回false
        removeEvent: removeEvent,
        //
        fireEvent: fireEvent
    };
})();
//暂时无用
//动画，放在一个游戏循环之中，
//添加进的对象必须包含animate函数才行
var Animation = (function() {
    var _fns = [];
    var add = function(key, obj) {
        _fns[key] = obj;
    };
    var remove = function(key) {
        delete _fns[key];
    };
    var update = function() {
        var del_fns = [];
        var obj;
        for (obj in _fns) 
        {
            if((typeof _fns[obj].animate !== "undefined") && (_fns[obj].animate()))
            {
                del_fns.push(obj);
            }
        }
        for(obj in del_fns){
            if(typeof _fns[obj] !== "undefined"){
                delete _fns[obj];
            }
        }
    };
    return {
        add: add,
        remove: remove,
        update: update
    };

})();
//旋转效果所需的参数定义
var rotate = (function() {
    var ctx = null;
    var start_angle = 0,//开始角度
        end_angle = 90,//终止角度
        curframe = 0,//当前帧
        totalframes = 30,//总帧，从开始角度到终止角度经过的帧数
        centerX = 0,//旋转中心X
        centerY = 0;//旋转中心Y

    return {
        ctx: ctx,//canvas context
        start_angle: start_angle,
        end_angle: end_angle,
        curframe: curframe,//当前帧
        totalframes: totalframes,//总帧
        centerX: centerX,  //旋转中心X
        centerY: centerY,  //旋转中心Y
        id: "Rotate"          //效果ID，唯一的名称
    };
})();
//