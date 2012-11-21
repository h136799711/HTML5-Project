/** @require MFGEvent,GetKeyState,KEYS,InputModel,Log,
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 注释说明
 */
///////////////////////////////////////////////////////////////////////
//添加loadedAsset事件 ，资源(图片，音乐等)载入完成
function GameModel() {
	var GS_RES_LOADING = 0X0001;
	var GS_INIT = 0X0002;
	var GS_RUNNING = 0X0003;
	var GS_PAUSING = 0X0004; //暂停
	var GS_RESTART = 0X0005; //重新开始 , 
	var PRE_INIT = 0X0015; //预初始 , 
	var GS_EXIT = 0XFFFF; //退出游戏，关闭页面
	var left_role ={}  , right_role ={} ;
	var assetLoadingStatus  = 0;
	var that =this;
    this.ctx=undefined;
    this.state = PRE_INIT;//游戏的即时状态
	//背景，角色，技能，音效的总载入进度
	this.level = 0;//游戏关卡
	
	//世界矩形范围，定义地上空间,坐上角坐标，右下角坐标
	this.worldRect = {leftUp : {x:0,y:0} ,rightDown:{x:0,y:0}};
	this.groundY = 25;//地面，相对 下Y 值的上偏移值
	this.csDet_RoleCtrl = function(role_ctrl1,role_ctrl2){
	
	if(role_ctrl1.getY() > this.worldRect.rightDown.y){	role_ctrl1.setY(this.worldRect.rightDown.y);}
	else if(role_ctrl1.getY() - role_ctrl1.getHeight() < this.worldRect.leftUp.y){	role_ctrl1.setY(this.worldRect.rightDown.y);	
	}
	if(role_ctrl1.getX() < this.worldRect.leftUp.x)		{	role_ctrl1.setX(this.worldRect.leftUp.x);		}
	else if(role_ctrl1.getX() + role_ctrl1.getWidth()> this.worldRect.rightDown.x) {	role_ctrl1.setX(this.worldRect.rightDown.x - role_ctrl1.getWidth());	}

	};
	this.collisionTest = function(lx1,ly1,w1,h1,lx2,ly2,w2,h2)
	{
		if(ly1 > ly2+h2 || lx1 + w1 < lx2 || ly1 + w1 < ly2 || lx1 > lx2 + w2)
		{
				return false;
		}
		return true;
	};
	this.csDet_Anim = function(){
		AnimationList.every(function(arr)
		{
			var i,j;
			for(i=arr.length-1;i>=0;i--)
			{
				for(j=arr.length-1;j>=0;j--)
				{
					if(i !== j && arr[i] && arr[j])
					{
						if(that.collisionTest(arr[i].getX(),arr[i].getY(),arr[i].getWidth(),arr[i].getHeight(),
							arr[j].getX(),arr[j].getY(),arr[j].getWidth(),arr[j].getHeight()))
						{
							arr[i] = null;
							arr[j] = null;
							arr.splice(i,1);
							arr.splice(j,1);
						}
					}
				}
				if(arr[i].getX() <  that.worldRect.leftUp.x || arr[i].getX() > that.worldRect.rightDown.x)
				{
							arr[i] = null;
							arr.splice(i,1);						
				}
			}
		});
	};
	//碰撞检测
	this.collisionDetection = function(){
		this.csDet_RoleCtrl(left_role);
		this.csDet_RoleCtrl(right_role);
		this.csDet_Anim();
	};
	
   // var that = this;
    //游戏状态
    this.ResLoading = function() {       
        //显示资源载入
		if(typeof this.ctx === "undefined")
		{
			var canvas = document.getElementById(clsid_parms.id_canvas);
			if (!canvas || typeof canvas === "undefined") {
				Log("some bad thing occur", mfgConfig.alertLevel);
				return;
			}
			
			
			this.worldRect.rightDown.x =  mfgConfig.screenWidth;
			this.worldRect.rightDown.y = mfgConfig.screenHeight - this.groundY;
			canvas.setAttribute("width",mfgConfig.screenWidth);
			canvas.setAttribute("height",mfgConfig.screenHeight);	
			this.ctx = canvas.getContext("2d");
			
		}
		if (typeof(this.ctx) === "undefined") {
            Log("canvas context is undefined");
            return;
        }
		this.clearScreen();
        this.ctx.drawImage(AssetGetter.getBg(0), 0, 0,this.screenWidth,this.screenHeight);
		
		this.ctx.font ="20pt 宋体";
		this.Write("资源载入中...."+assetLoadingStatus+"%.",10,24,"#5d7");
		
	    Log("正在载入资源中...如果太慢请按 F5!",mfgConfig.toUserLevel);
		if(assetLoadingStatus  >= 100 )
		{
			this.setInit();
		}
		Log(assetLoadingStatus,mfgConfig.toUserLevel);
    };
    this.Init = function() {
		this.InitRoles();
		InputModel.bindEventListener();	
		this.selectRole();
		this.setRunning();
        Log("游戏愉快!   : )  ",mfgConfig.toUserLevel);
    };
	this.Running = function() {
		InputModel.update();
		this.clearScreen();
        this.drawBG();
		this.drawRoles();
    };
    this.Pausing = function() {
		Log("游戏暂停中!",mfgConfig.toUserLevel);
	};
    this.Restart = function() {
		InputModel.unbindEventListener();
		this.clearScreen();
        Log("重开游戏中!",mfgConfig.toUserLevel);		
		this.setInit();
		InputModel.bindEventListener();
    };
    this.Exit = function() {
		this.clearScreen();
		this.Write("退出中....................! ",100,100);
        
    };

	
	this.Write = function(info,x,y,color,bgColor){
		if(typeof(this.ctx) === "undefined") {
			return ;
		}
		this.ctx.textAlign = "left";
		this.ctx.fillStyle = bgColor = bgColor === undefined ? "#ffffff" : bgColor;
		if(this.ctx.measureText){
			this.ctx.fillRect(x,y-20,this.ctx.measureText(info).width,25);
		}
		this.ctx.fillStyle = color ? color:"blue";
		if(this.ctx.fillText){
			this.ctx.fillText(info,x,y);
		}else{
			Log(info,mfgConfig.toUserLevel);
		}
	};
	this.drawBG = function(){
		 this.ctx.drawImage(AssetGetter.getBg(1), 0, 0, 440,224,0, 0, this.worldRect.rightDown.x,this.worldRect.rightDown.y + this.groundY); 
	};
	//绘制角色
	this.drawRoles = function(){
		left_role.draw(this.ctx);
		right_role.draw(this.ctx);
		AnimationList.draw(that.ctx);
		left_role.update();
		right_role.update();
		right_role.setRoleState(left_role.getRoleState()!=="jumpUp"?left_role.getRoleState():"wait");
		AnimationList.update();

		this.collisionDetection();
		
	};

	//初始化角色
	this.InitRoles = function(){
		
	};
	this.selectRole = function(){
		left_role = this.setRoleCtrl(AssetGetter.getRoleModelByName("RYU1"),0,"KeyBoardCtrl");
		right_role = this.setRoleCtrl(AssetGetter.getRoleModelByName("RYU2"),1,"AICtrl");
	};

	this.setRoleCtrl = function(role_model,side,ctrl_type){
		var role_ctrl;
		if(ctrl_type === "KeyBoardCtrl")
		{
			role_ctrl = new KeyBoardCtrl();
			role_ctrl.setKeys(KEY_PLAYER1);
			role_ctrl.setKeysStateMap(role_model.getKeysStateMap());
		}else{
			role_ctrl = AICtrl;
		}
		role_ctrl.setModel(role_model);//设置角色模型
		role_ctrl.setY(this.worldRect.rightDown.y);//设置地板
		role_ctrl.setScale(1.5);//设置放大倍数
		if(side === 0){
			role_ctrl.setLeft();
			role_ctrl.setX(this.worldRect.leftUp.x + 60);
		}else{
			role_ctrl.setRight();
			role_ctrl.setX(this.worldRect.rightDown.x - 120);
		}
		
		return role_ctrl;
	};
	this.skillInsert = function(ev){
				console.log(ev);
			var spriteInfo = ev.args;
			if(spriteInfo){
				//插入到技能绘制队列
				var skillmodel = new SkillModel();
				skillmodel.setImage(AssetGetter.getSkill(spriteInfo.name));
				skillmodel.setX(spriteInfo.x);
				skillmodel.setY(spriteInfo.y);
				skillmodel.setSpriteInfo(spriteInfo);
				console.log("外放技能");
				AnimationList.add(skillmodel);
			}
	};
	this.clearScreen = function(){		
		this.ctx.clearRect(0, 0, this.worldRect.rightDown.x,this.worldRect.rightDown.y + this.groundY); 
	};
	 this.update = function() {
		switch (this.state) {
		case PRE_INIT:
			InputModel.init();
			MFGEvent.addEvent(mfgEvents.assetLoading,that.setAssetLoadingStatus);
			MFGEvent.addEvent(mfgEvents.releaseSkill,that.skillInsert);
			this.setResLoading();
			break;
        case GS_RES_LOADING:
            this.ResLoading();
            break;
        case GS_PAUSING:
            this.Pausing();
            break;
        case GS_INIT:
            MFGEvent.removeEvent(mfgEvents.assetLoading,that.setAssetLoadingStatus);
            this.Init();
            break;
        case GS_RUNNING:
            this.Running();		    
            break;
        case GS_RESTART:
            this.Restart();
            break;
        case GS_EXIT:
			MFGEvent.removeEvent(mfgEvents.releaseSkill,that.skillInsert);
            this.Exit();
            return;
        default:
            Log("not expected state.");
            break;
        }
		this.Write("FPS: "+Utils.FPS.get(),520,30,"#f08080");
		//Log("FPS_RATE = "+FPS_RATE,mfgConfig.toUserLevel);
    };
	//设置资源载入进度
	this.setAssetLoadingStatus= function(ev){
		assetLoadingStatus = parseInt(((100.0*ev.args.loaded) / ev.args.totalLoad),10);
	};
    //设置游戏状态
    this.setGameState = function(state) {
        this.state = state;
    };
    this.setResLoading = function() {
        this.setGameState(GS_RES_LOADING);
    };
    this.setRunning = function() {
        this.setGameState(GS_RUNNING);
    };
    this.setInit = function() {
        this.setGameState(GS_INIT);
    };
    this.setPausing = function() {
        this.setGameState(GS_PAUSING);
    };
    this.setResume = function() {
        Log("========",mfgConfig.toUserLevel);
        this.setGameState(GS_RUNNING);
    };
    this.setRestart = function() {
        this.setGameState(GS_RESTART);
    };
    this.setExit = function() {
        this.setGameState(GS_EXIT);
    };
}
/*
**
**
**
*/
function SkillModel(){
	var _v0={x:0,y:0}, _curFrame = 0,  _x=0,_y=0,_scale=1,_mirror=false ,
		_loop=0,_image=null,_spriteInfo;
	this.setX = function(x)	 { _x = x;	};
	this.setY = function(y)	 { _y = y;	};
	this.getX = function(x)	 { return _x;	};
	this.getY = function(y)	 { return _y;	};
	this.getV = function(){		return _v0;		};
	this.setV = function(v){	_v0.x = v.x;	_v0.y = v.y;		};
	this.getWidth = function(){	 	return _spriteInfo.width;		};
	this.getHeight = function(){	return _spriteInfo.height;	 	};
	this.getDamage = function(){		return _spriteInfo.damage;	};
	this.getEachFrames = function(){	return _spriteInfo.each_frames;	};
	this.getAniSeq = function(){	return _spriteInfo.ani_seq;	};
	this.getCurFrame = function(){	return _spriteInfo.ani_seq[_curFrame];	};
	this.setSpriteInfo = function(spriteInfo){	  _spriteInfo = spriteInfo;	 this.setV(_spriteInfo.v);	};
	this.setImage = function(image){_image = image;};
	this.getName = function(){		return _spriteInfo.name;	};
	this.move = function(){	
		_x += (_v0.x	/ (FPS_RATE >0 ? FPS_RATE : 1));
	};
	var cnt=0;
	this.update = function(){
		this.move();
		if(cnt > this.getEachFrames() * (FPS_RATE>0?FPS_RATE:1)){
			_curFrame++;
			cnt=0;
		}
		cnt++;
		if(_curFrame  >= this.getAniSeq().length){
			_curFrame = 0 ;
			cnt=0;
			_loop++;
		}
	};
	this.draw = function(ctx){	
		if(!_image){ return ;	}
		
		ctx.drawImage(_image,this.getCurFrame()*this.getWidth(),0,this.getWidth(),this.getHeight(),_x,_y-_scale*(this.getHeight()/2*3),_scale * this.getWidth(),_scale*this.getHeight());
		
	};
}


var AnimationList = (function(){
	var _anim = [];
	var add = function(anim){
		if(anim.update && anim.draw && anim.getName){
			if(!_anim[anim.getName()]){
				_anim[anim.getName()] = [];
			}
			_anim[anim.getName()].push(anim);
		}
	};
	var remove = function(anim){
		if(anim && anim.getName && _anim[anim.getName()])
		{
			for(var i=0;i<_anim[anim.getName()].length;i++)
			{
				if(_anim[anim.getName()][i] === anim)
				{
					_anim[anim.getName()].splice(i,1);
				}
			}
		}
	};
	var update = function(){
		var i,j;
		for(i in _anim)
		{
			if(typeof i === "string"){
				for(j=0;j<_anim[i].length;j++)
				{
					if(_anim[i][j].update){
						_anim[i][j].update();
					}
				}
			}
		}
		
	};
	var draw = function(ctx){
		var i,j;
		for(i in _anim)
		{
			if(typeof i === "string"){
				for(j=0;j<_anim[i].length;j++)
				{
					_anim[i][j].draw(ctx);
				}
			}
		}
		
	};
	var every = function(fn){
			var i;
			for(i in _anim)
			{
				if(typeof i === "string"){
						fn(_anim[i]);
				}
			}
	};
	return {
		add:add,
		remove:remove,
		update:update,
		draw:draw,
		every:every
	};
})();

//////////////////////////////////////////////////////////////////////​​