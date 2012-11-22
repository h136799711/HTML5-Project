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
	//_x,_y分别是人物的左下角坐标，这样即使人物高度不一致，但其底部是对齐即可
	//cur_state的改变将会基于键盘的响应或AI的控制
	var _curFrame = 0,  _x=0,_y=0,_scale=1,_cur_state,_img,_mirror=false ,
		_loop=0,_damage = 0;
	var _spriteInfo = { };//包含各种状态	，以及角色的名字，某状态的各信息，
	var _v0 = {	x:0,y:0	};//每个状态下的初速度
	/////getter
	this.setDamage = function(damage){	 _damage = damage;};
	this.getDamage = function(){	return _damage;};
	this.setX = function(x){	_x = x;		};
	this.setY = function(y){	_y = y;		};
	this.setScale = function(scale){	_scale = scale;		};
	this.setMirror = function(mirror){	_mirror = mirror;	 };
	this.setImg = function(img){		_img = img;	 	};
	this.setSpriteInfo = function(spriteInfo){	_spriteInfo = spriteInfo;	this.setRoleState("wait");};
	this. setRoleState = function(state){
		if(_spriteInfo === undefined || _spriteInfo.role_stateInfo[state] === undefined){
			return false;
		}
		_cur_state =  state;
		_loop = 0;
		_curFrame = 0 ;
		this.setImg(AssetGetter.getRole(this.getRoleName(),this.getRoleState()));
		if(_spriteInfo.role_stateInfo[_cur_state].v0 !== undefined){
			_v0.x =  Number(_spriteInfo.role_stateInfo[_cur_state].v0.x);
			_v0.y = Number(_spriteInfo.role_stateInfo[_cur_state].v0.y);
		}else{
			_v0.x = 0;_v0.y = 0;
		}
		if(_spriteInfo.role_stateInfo[_cur_state].damage){
			_damage = _spriteInfo.role_stateInfo[_cur_state].damage;
		}else{
			_damage = 0;
		}
		return true;
	};
	//坐下角坐标X,Y
	this.getX = function(){ return _x;		};
	this.getY = function(){ return _y;		};
	this.getCenterX= function() { return _x + this.getWidth() / 2;};
	this.getCenterY= function() { return _y - this.getHeight() / 2;};
	//是否使图片以镜像形式显示
	this.getMirror = function(){	 return _mirror;	};
	this.getScale = function(){	return  _scale;		};
	this.getEachFrames = function(){	return _spriteInfo.role_stateInfo[_cur_state].each_frames ;		};	
	this.getWidth = function(){	return _spriteInfo.role_stateInfo[_cur_state].width;	 	};
	this.getHeight = function(){		return _spriteInfo.role_stateInfo[_cur_state].height;	};
	this.getRoleName = function(){		return _spriteInfo.role_name;		};
	this.getRoleState = function(){		return _spriteInfo.role_stateInfo[_cur_state].desc;		};
	this.getNextState = function(){		return this.getKeysStateMap()[_cur_state].nextstate;	};
	this.getSeqLength = function(){		return _spriteInfo.role_stateInfo[_cur_state].seq_length;	};
	this.getAnimSeq = function(){		return _spriteInfo.role_stateInfo[_cur_state].ani_seq;};
	this.getCurAnimFrame = function(){	return this.getAnimSeq()[_curFrame];}
	this.getKeysStateMap = function(){		return _spriteInfo.key_state_map;	};
	this.getLoop = function(){	return _spriteInfo.role_stateInfo[_cur_state].loop;	};
	this.getVX = function(){	return _v0.x	;	};
	this.getVY = function(){	return _v0.y	 ;	};
	this.setVY = function(vy){	_v0.y	 = vy ;	};
	this.setVX = function(vx){	_v0.x	 = vx ;	};
	this.getReleaseFrame = function(){
		if(_spriteInfo.role_stateInfo[_cur_state].release_skill){
			return _spriteInfo.role_stateInfo[_cur_state].release_skill.frame;	
		}
	};

	this.getCurStateSkillName = function(){		return _spriteInfo.role_stateInfo[_cur_state].release_skill.name;	};
	this.getReleaseSkill = function(){	return _spriteInfo.skills_info[this.getCurStateSkillName()] ;	};
	this.getSkillSprite = function(){	return this.getReleaseSkill() === undefined ?undefined:this.getReleaseSkill().sprite;		};
	//动画序列是否播放完成，在这个状态下
	this.isAnimSeqOver = function(){	 return this.getLoop() === undefined || _loop >= this.getLoop();	};
	//动画序列是否正在播放中
	this.isAnimating = function(){	 return (cnt !== 0 || _curFrame !== 0 ) && _cur_state !== "wait";	};
	//移动
	this.move = function(){
		var offsetX = (this.getVX()	/ (FPS_RATE >0 ? FPS_RATE : 1));
		_x += offsetX;
		
		_y += (_v0.y -= (0.5*Utils.G / 17));		
	};	

	this.draw = function(ctx){
		if(typeof _img === "undefined" || _img === null){
			return false;
		}
		var offset = this.getCurAnimFrame();
		if(this.isAnimSeqOver()){
			offset = this.getAnimSeq()[this.getSeqLength()-1];
		}
		ctx.drawImage(_img,offset*this.getWidth(),0,this.getWidth(),this.getHeight(),_x,_y-(_scale*this.getHeight()),
			_scale*this.getWidth(),(_scale*this.getHeight()));
	
		//var x1 = Utils.Tween.easeLinear(_curFrame,_x,this.getVX(),this.getSeqLength()),
	//		y1 = Utils.Tween.easeLinear(_curFrame,_y,this.getVX(),this.getSeqLength());
	//	ctx.drawImage(_img,this.getCurAnimFrame()*this.getWidth(),0,this.getWidth(),this.getHeight(),x1,y1-(_scale*this.getHeight()),
	//		_scale*this.getWidth(),(_scale*this.getHeight()));
		return true; 
	};
	var cnt=0;
	this.update = function(){
		this.move();
		if(cnt > this.getEachFrames() * (FPS_RATE>0?FPS_RATE:1)){
			_curFrame++;
			cnt=0;
			if(_curFrame === this.getReleaseFrame())
			{
					console.log(this.getRoleName()+" ( "+this.getX()+","+this.getY()+" )");
					this.setDamage(0);
					var sprite = this.getSkillSprite();
					sprite.mirror = this.getMirror();
					sprite.x = this.getX()+this.getWidth()+5;
					sprite.y = this.getCenterY()-sprite.height/2;
					MFGEvent.fireEvent(mfgEvents.releaseSkill,sprite);
			}
		}
		cnt++;
		if(_curFrame  >= this.getSeqLength()){
			_curFrame = 0;
			cnt=0;
			_loop++;
		}

	//	if("wait" !== _cur_state){
		//	console.log(this.getRoleState()+" "+this.getCurAnimFrame()+" "+_curFrame);
	//	}
	};
}
//需要一个工厂类来创建各类角色


////////