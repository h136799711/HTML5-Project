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
	this.setScale = function(scale){
		_model.setScale(scale);
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
// -- KeyBoardCtrl ================================
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
	//检测这个state被激活的条件是否满足
	this.checkStateCondition = function(state){
		//记录下面for循环中，同样的键可能要读取多次
		//比如a键可能需要 a right a 这样序列中的a键的次数和序列
		//判断序列用时间来a right a 则最后一个a的时间要大于right的时间才行
		//因为_keys[_keysStateMap[state].keys[i]].getPress()获得的数据只记录某个键被按了几次
		//按下时的各个时间所以要比较时间来确定顺序
		var tmpTime= [],len = _keysStateMap[state].keys.length;
		for(i=0;i<len;i++)
		{
			//
			if(_keysStateMap[state].isDown !== undefined && _keysStateMap[state].isDown[i] !== undefined && _keysStateMap[state].isDown[i] ){
					if(_keys[_keysStateMap[state].keys[i]].isDown())
					{
						continue;
					}else{
						return false;
					}
			} 
			//在规定时间段内必须曾经按下过
			if(_keys[_keysStateMap[state].keys[i]].getPressCnt() > 0){
				//需要按住这个键，但没有按住时返回false
						//检测的是第一个键的话在通过上2个if后直接通过
					if(i !== 0){//不是第一个键的话要检测这个键的时间是否大于上一个键按下的时间
						//取得这个键曾被按下的历史在有限的时间内，在InputModel中定义的laztFrames 25帧
						var player_key = _keys[_keysStateMap[state].keys[i]];
						//这个键是否已读取过,读取过则跳到读取的那个键的下标，					
						var prepress = _keys[_keysStateMap[state].keys[i-1]].getPressTime();
						var prej = tmpTime[player_key.getKey()] === undefined ? 0 : tmpTime[player_key.getKey()];
						j=tmpTime[player_key.getKey()] === undefined ? 0:tmpTime[player_key.getKey()];
						
						//剩下的未读取过的键中是否有时间是大于前一个键的时间的有则跳出
						for(;j<player_key.getPressCnt();)
						{
							if(player_key.getPressTime()[j] > prepress[prej])
							{
								tmpTime[player_key.getKey()] = j + 1;
								break;
							}
							j++;
						}//end while
						if(j === player_key.getPressCnt()){//并不是break出来的
							return false;
						}
					}//end if
				}//end if
				else{
					return false;
				}
		}//end for
		return true;
	};
	this.getStateActived = function(){
		var state;
		for(state in _keysStateMap)
		{			
			if(typeof state === "string"&& this.checkStateCondition(state) )
			{
					return state;
			}
		}
		
	};
	this.update = function(){	
		//右 
		if(InputModel.isKeyDown(_keys.right.getKey())){
			_keys.right.setDown(true);
		}else if(InputModel.isKeyUp(_keys.right.getKey())){
			_keys.right.setDown(false);
		}
		//左
		_keys.right.setPress(InputModel.getKeyPress2(_keys.right.getKey()));
		if(InputModel.isKeyDown(_keys.left.getKey())){
			_keys.left.setDown(true);
		}else if(InputModel.isKeyUp(_keys.left.getKey())){
			_keys.left.setDown(false);
		}
		_keys.left.setPress(InputModel.getKeyPress2(_keys.left.getKey()));
		//上
		if(InputModel.isKeyDown(_keys.up.getKey())){
			_keys.up.setDown(true);
		}else if(InputModel.isKeyUp(_keys.up.getKey())){
			_keys.up.setDown(false);
		}
		_keys.up.setPress(InputModel.getKeyPress2(_keys.up.getKey()));
		//下
		if(InputModel.isKeyDown(_keys.down.getKey())){
			_keys.down.setDown(true);
		}else if(InputModel.isKeyUp(_keys.down.getKey())){
			_keys.down.setDown(false);
		}
		_keys.down.setPress(InputModel.getKeyPress2(_keys.down.getKey()));
		


		var state = this.getStateActived();
		if(typeof state !== "undefined" )
		{
			KeyBoardCtrl.prototype.setRoleState(state);
		}else if(KeyBoardCtrl.prototype.isAnimSeqOver() && ((state = KeyBoardCtrl.prototype.getNextState()) !== undefined) && this.checkStateCondition(state))
		{
				KeyBoardCtrl.prototype.setRoleState(state);
		}else{			
				KeyBoardCtrl.prototype.setRoleState("wait");
		}
		KeyBoardCtrl.prototype.update();
	};
};
KeyBoardCtrl.prototype = new IRoleCtrl();
var AICtrl = new IRoleCtrl();


/////////////////////////////////////////////////////////