/////////////////////////////////////////////////////////
/*
** @author hebidu
** 2012-11-9
** 角色控制器
*/
var RoleCtrl = (function(){
	var _model;
	var setModel = function(model){
		_model = model;
	};
	var getModel = function(){
		return _model;
	};
	return {
		setModel:setModel,
		getModel:getModel
	};
})();
/////////////////////////////////////////////////////////