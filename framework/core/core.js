//基本对象
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主模型。
function BaseView(){
	this.relativeUrl = "";
	this.baseUrl = "";
	this.initialize;
};
BaseView.prototype = {
	initialize:function(){
		throw new Error("subobject  must  implements the method (initialize)");	
	}
};
function BaseModel(){
	this.initialize;	
};
BaseView.prototype = {
	initialize:function(){
		throw new Error("subobject  must  implements the method (initialize)");	
	}
};
function BaseCtrl(){
	this.model = BaseModel;
	this.view = BaseView;
	this.initialize;
};
BaseCtrl.prototype = {
	initialize : function(){
		throw new Error("subobject  must  implements the method (initialize)");
	}
}