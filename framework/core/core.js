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
/*
var MFGEvent = {
    _listeners: [],
    //添加事件
    addEvent: function(type, fn) {
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        if (typeof fn === "function") {
            this._listeners[type].push(fn);
        }
        return this;
    },
    //触发事件
    fireEvent: function(type,args) {
        var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i = arrayEvent.length - 1; i >= 0; i -= 1) {
                if (typeof arrayEvent[i] === "function") {
                    arrayEvent[i]({
                        type: type,
						args:args
                    });
                }
            }
        }
    },
    removeEvent: function(type, fn) {
        var arrayEvent = this._listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            for (var i = arrayEvent.length - 1; i >= 0; i -= 1) {
                if (arrayEvent[i] === fn) {
                    this._listeners[type].splice(i, 1);
                    break;
                }
            }
        } else {
            delete this._listeners[type];
        }
        return this;
    }
};
**/
//​​