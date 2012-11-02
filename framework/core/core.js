//base object		
PREFIX_CLS  =".";
PREFIX_ID ="#";
function BaseView(){
	this.relativeUrl = "";
	this.baseUrl = "";
	this.initialize;
		//= function(){
			//throw new Error("subobject  must  implements the method (initialize)");
	//};
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