/////////////////////////////////////////////////////////
/*
** @author hebidu
** 2012-11-9
** 角色控制器
*/
var IRoleCtrl = (function(){
	var _model ;
	var _input;
	var _side=0;
	var _keyStateMap;
	var setRight =function (){
		_side = 1;		
	};
	var setLeft =function (){
		_side = 0;
	};
	var setInput =function (input){
		_input = input;
	};
	var setModel =function (model){
		_model = model;
		_keyStateMap = _model.getKeyStateMap();
	};
	var setX = function(x){
		_model.setX(x);
	};
	var setY = function(y){
		_model.setY(y);
	};
	var update = function(){
		var i,state,isActive,cnt=0;
		for(state in _keyStateMap){
			if(true){
				isActive  = false;
				for(i=0;i<_keyStateMap[state].length;i++){
					if(KEY_PLAYER1[_keyStateMap[state][i]].pressNum >3){
						isActive = true;break;
					}
				}
				if(isActive)
				{
					cnt++;
					_model.setRoleState(state);
				}
			}
		}
		if(cnt === 0){
			_model.setRoleState("wait");
		}
		_model.update();
	};
	var draw = function(ctx){
		_model.draw(ctx);
	};
	return {
		update:update,
		draw:draw,
		setModel:setModel,
		setLeft:setLeft,
		setRight:setRight,
		setX:setX,
		setY:setY,
		setInput:setInput
	};
})();
var KeyBoardCtrl = Object.create(IRoleCtrl);

var AICtrl = Object.create(IRoleCtrl);


/////////////////////////////////////////////////////////