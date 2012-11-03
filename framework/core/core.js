//基本对象
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主模型。
//baseview


function BaseView() {
    this.initialize = function() {
        throw new Error("subobject  must  implements the method (initialize)");
    };
    Log("new BaseView()");
}

//base model


function BaseModel() {
    this.initialize = function() {
        throw new Error("subobject  must  implements the method (initialize)");
    };
}

//base ctrl


function BaseCtrl() {
    this.model = { };
    this.view = { };
    this.initialize = function() {
        throw new Error("subobject  must  implements the method (initialize)");
    };
}
//