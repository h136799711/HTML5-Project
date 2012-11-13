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

function RoleModel(){
	//updateFrame图片变化的频率，表示一个状态
	//的一张图片持续的帧数
	//curFrame当前帧指的是此状态下动画序列的某一帧,
	//_x,_y_scale分别是屏幕坐标和缩放大小，缩放用于调整原图片大小
	//cur_state的改变将会基于键盘的响应或AI的控制
	var _curFrame = 0, updateFrame = 5, _x=0,_y=0,_scale=1,_cur_state = "wait",_img,_mirror=false ,
		loop=0;
	var _spriteInfo = { };//包含各种状态	，以及角色的名字，某状态的各信息，
	
	/////getter
	this.setX = function(x){	_x = x;		};
	this.setY = function(y){	_y = y		};
	this.setScale = function(scale){	_scale = scale;		};
	this.setMirror = function(mirror){	_mirror = mirror;	 };
	this.setImg = function(img){		_img = img;	 	};
	this.setSpriteInfo = function(spriteInfo){	_spriteInfo = spriteInfo;	};
	this. setRoleState = function(state){
		if(_spriteInfo === undefined || _spriteInfo.role_stateInfo[state] === undefined){
			return false;
		}
		_cur_state =  state;		
		loop = 0;
	//	console.log(this.getRoleName()+"角色状态改变 "+_cur_state);
		this.setImg(AssetGetter.getRole(this.getRoleName(),this.getRoleState()));
	//	console.log(this.getRoleName()+"角色状态改变 "+_cur_state);
		return true;
	};
	this.getX = function(){ return _x;		};
	this.getY = function(){ return _y;		};
	this.getCenterX= function() { return _x + this.getWidth() / 2;};
	this.getCenterY= function() { return _y + this.getHeight() / 2;};
	this.getMirror = function(){	 return _mirror;	};
	this.getScale = function(){	return _scale;	};
	this.getEachFrames = function(){	return _spriteInfo.role_stateInfo[_cur_state].each_frames;	};	
	this.getWidth = function(){	return _spriteInfo.role_stateInfo[_cur_state].width;	 	};
	this.getHeight = function(){		return _spriteInfo.role_stateInfo[_cur_state].height;	};
	this.getRoleName = function(){		return _spriteInfo.role_name;	};
	this.getRoleState = function(){		return _spriteInfo.role_stateInfo[_cur_state].desc;	};
	this.getNextState = function(){		return this.getKeysStateMap()[_cur_state].nextstate;	};
	this.getSeqLength = function(){		return _spriteInfo.role_stateInfo[_cur_state].seq_length;	};
	this.getAnimSeq = function(){		return _spriteInfo.role_stateInfo[_cur_state].ani_seq;};
	this.getCurAnimFrame = function(){	return this.getAnimSeq()[parseInt(_curFrame,10)];}
	this.getKeysStateMap = function(){		return _spriteInfo.key_state_map;	};
	this.getLoop = function(){	return _spriteInfo.role_stateInfo[_cur_state].loop;	};
	//动画序列是否播放完成，在这个状态下
	this.isAnimSeqOver = function(){	 return loop >= this.getLoop();	};
	this.draw = function(ctx){
		if(typeof _scale === "undefined"){
			_scale = 1;
		}
		if(typeof _img === "undefined" || _img === null){
			return false;
		}
		ctx.drawImage(_img,this.getCurAnimFrame()*this.getWidth(),0,this.getWidth(),this.getHeight(),_x,_y,
			_scale*this.getWidth(),(_scale*this.getHeight()));
		return true; 
	};
	this.update = function(){
		_curFrame += (1.0 /  this.getEachFrames());
		if(_curFrame >= this.getSeqLength()){
			_curFrame = 0 ;
			loop++;
		}
	//	_curFrame = _curFrame >= getSeqLength()? 0 :_curFrame + (1.0 /  getEachFrames());
	};
}
//需要一个工厂类来创建各类角色


////////