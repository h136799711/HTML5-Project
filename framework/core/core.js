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
    Log("new BaseView()");
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
//​​