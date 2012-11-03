//依赖于IndexModel,IndexView,BaseCtrl
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主控制器。

(function(window){
	var fps =60;
window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame   || 
				  window.webkitRequestAnimationFrame || 
				  window.mozRequestAnimationFrame     || 
				  window.oRequestAnimationFrame          || 
				  window.msRequestAnimationFrame       || 
				  function( callback, element){
					window.setTimeout(callback, 60);
				  };})();	


function IndexCtrl(){	
	this.model = new IndexModel();
	this.view = new IndexView();
};
IndexCtrl.prototype = new BaseCtrl();
IndexCtrl.prototype.initialize = function(){	
	try{		
		if(typeof (window.MFG) == undefined)
		{
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
	Log("IndexCtrl's Call IndexAction and Initialize() complete!");
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