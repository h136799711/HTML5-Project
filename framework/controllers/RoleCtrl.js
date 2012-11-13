/////////////////////////////////////////////////////////
/*
** @author hebidu
** 2012-11-9
** 角色控制器
*/
function IRoleCtrl(){
	var _model ;
	var _side=0;
	this. setRight =function (){
		_side = 1;	
		_model.setMirror(true);
	};
	this. setLeft =function (){
		_side = 0;
		_model.setMirror(false);
	};
	this. setModel =function (model){
		_model = model;
	};
	this. getModel = function(){
		return _model;
	};
	this. setX = function(x){
		_model.setX(x);
	};
	this. setY = function(y){
		_model.setY(y);
	};
	this. update = function()
	{				
		_model.update();
	};
	this.getLoop = function(){
		return _model.getLoop();
	};
	this.setRoleState = function(state){
		return _model.setRoleState(state);
	};
	this.getNextState = function(){
		return _model.getNextState();
	};
	this.isAnimSeqOver = function(){
		return _model.isAnimSeqOver();
	};
	this.draw = function(ctx){
		if(_model.getMirror()){
			ctx.save();
			ctx.translate(_model.getCenterX(),_model.getCenterY());
			ctx.scale(-1,1);
			ctx.translate(-_model.getCenterX(),-_model.getCenterY());
			_model.draw(ctx);
			ctx.restore();
		}else{			
			_model.draw(ctx);
		}
	};
};
function KeyBoardCtrl(){
	var _keys,_keysStateMap;
	this.setKeysStateMap = function(keysStateMap){
		_keysStateMap = keysStateMap;
	};
	this.setKeys = function(keys){
		_keys = keys;
	};
	this.getKeys = function(){
		return _keys;
	};
	this.checkStateCondition = function(state){
		var obj = _keysStateMap[state],i;
		for(i=0;i<obj.keys.length;i++)
		{
			if(!_keys[obj.keys[i]].isDown()){
				return false;
			}
		}
		return true;
	};
	this.getStateActived = function(){
		var state,i,isActive;
		for(state in _keysStateMap){			
			if(typeof state === "string"){
				isActive = true;

				for(i=_keysStateMap[state].keys.length-1;i>=0;i--)
				{
					if(!_keys[_keysStateMap[state].keys[i]].isDown()){
						isActive =  false;
					}
				}
				if(isActive){
					return state;
				}
			}
		}
		
	};
	this.update = function(){
		var state;
		if(KeyBoardCtrl.prototype.isAnimSeqOver()){
			state = KeyBoardCtrl.prototype.getNextState();
			if(this.checkStateCondition(state)){					
				KeyBoardCtrl.prototype.setRoleState(state);
			}
		}else{
			state = this.getStateActived();
			if(typeof state !== "undefined" ){
				KeyBoardCtrl.prototype.setRoleState(state);
			}else{				
				KeyBoardCtrl.prototype.setRoleState("wait");
			}
		}
		KeyBoardCtrl.prototype.update();
	};
};
KeyBoardCtrl.prototype = new IRoleCtrl();
var AICtrl = new IRoleCtrl();


/////////////////////////////////////////////////////////