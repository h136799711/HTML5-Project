/////////////////////////////////////////////////////////
/*
** @author hebidu
** 2012-11-9
** 角色控制器
*/
var IRoleCtrl = (function(){
	var _model ;
	var setModel =function (model){
		_model = model;
	};
	var update = function(){
		_model.update();
	};
	var draw = function(ctx){
		_model.draw(ctx);
	};
	return {
		update:update,
		draw:draw,
		setModel:setModel
	};
})();
var KeyBoardCtrl = Object.create(IRoleCtrl);


/////////////////////////////////////////////////////////