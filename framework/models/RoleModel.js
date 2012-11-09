/*@require Javscript支持
* @author hebidu
* @date 2012-11-9
* 流程 -
			1 创建一个RoleModel
			2 设置spriteInfo(用于信息设置)
			3 设置图片(图片是用于绘制即表象)
			4 update函数
			5 draw(ctx)绘制
			根据当前状态从spriteInfo中获得信息来更新
			RoleModel信息
*/			
///
var RoleModel = (function(){
	//updateFrame图片变化的频率，表示一个状态
	//的一张图片持续的帧数
	//curFrame当前帧指的是此状态下动画序列的某一帧,
	//_x,_y_scale分别是屏幕坐标和缩放大小，缩放用于调整原图片大小
	//cur_state的改变将会基于键盘的响应或AI的控制
	var curFrame = 0, updateFrame = 5, _x=0,_y=0,_scale=1,cur_state = "wait";
	var img ;//从AssetGetter获得
	var _spriteInfo = { };//包含各种状态	，以及角色的名字，某状态的各信息，
	
	/////getter
	var setX = function(x){
		_x = x;
	};
	var setY = function(y){
		_y = y;
	};
	var setScale = function(scale){
		_scale = scale;
	};
	var getScale = function(){
		return _scale;
	};
	var getEachFrames = function(){		
		return _spriteInfo.role_stateInfo[cur_state].each_frames;
	};
	var setImg = function(value){
		img = value;
	};
	var getWidth = function(){
		return _spriteInfo.role_stateInfo[cur_state].width;
	};
	var getHeight = function(){
		return _spriteInfo.role_stateInfo[cur_state].height;
	};
	var getRoleName = function(){
		return _spriteInfo.role_name;
	};
	var getRoleState = function(){
		return _spriteInfo.role_stateInfo[cur_state].desc;
	};
	var setSpriteInfo = function(spriteInfo){
		_spriteInfo = spriteInfo;
	};
	var getSeqLength = function(){
		return _spriteInfo.role_stateInfo[cur_state].seq_length;
	};
	var getKeyStateMap = function(){
		return _spriteInfo.role_stateInfo[cur_state].key_state_map;
	};
	
	var draw = function(ctx){
		if(typeof _scale === "undefined"){
			_scale = 1;
		}
		if(typeof img === "undefined" || img === null){
			return false;
		}
		ctx.drawImage(img,parseInt(curFrame,10)*getWidth(),0,getWidth(),getHeight(),_x,_y,
			_scale*getWidth(),(_scale*getHeight()));
		return true;
	};
	var update = function(){
		curFrame += (1.0 /  getEachFrames());
		if(curFrame >=  getSeqLength()){
			curFrame = 0;
		}
	};
	return {
		draw:draw,
		update:update,
		setX:setX,
		setY:setY,
		setScale:setScale,
		getScale:getScale,
		setImg:setImg,
		setSpriteInfo:setSpriteInfo,
		getWidth:getWidth,
		getHeight:getHeight,
		getRoleName:getRoleName,
		getRoleState:getRoleState
	};
})();
//需要一个工厂类来创建各类角色


////////