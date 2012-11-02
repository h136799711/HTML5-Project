(function(window){
window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame   || 
				  window.webkitRequestAnimationFrame || 
				  window.mozRequestAnimationFrame     || 
				  window.oRequestAnimationFrame          || 
				  window.msRequestAnimationFrame       || 
				  function( callback, element){
					window.setTimeout(callback, 1000 / 60);
				  };
})();	
var document = window.document;
$ = window.$;
Object.prototype.mfgVersion  = function (){ return "v1.0.0";};


function IndexCtrl(){	
	this.model = new IndexModel();
	this.view = new IndexView();
	};
IndexCtrl.prototype = new BaseCtrl;
IndexCtrl.prototype.initialize = function(){	
	try{		
		if(typeof (window.MFG) == undefined)
		{
			Log("Should be first time to call this action.if not,that must happened something !!");
			return ;
		}
		this.view.initialize();
		this.model.initialize();
	}catch(e)
	{
		Log(e.message);
	}
}
IndexCtrl.prototype.IndexAction = function(){
	this.initialize();
	Log("IndexCtrl's Call IndexAction and Initialize() successed!");
};


window.MFG = new IndexCtrl;

})(window);
/*
var IndexCtrl = function(){
	return new IndexCtrl.fn.init();
};
IndexCtrl.fn = IndexCtrl.prototype = {
	init:function(){
		return this;
	},
};
IndexCtrl.fn.init.prototype =  IndexCtrl.fn;
window.MagicFighterGame = window.MFG = IndexCtrl;*/