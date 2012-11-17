/** @require MFGEvent,GetKeyState,KEYS,InputModel,Log,
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 注释说明
 */
///////////////////////////////////////////////////////////////////////
//添加loadedAsset事件 ，资源(图片，音乐等)载入完成
var GS_RES_LOADING = 0X0001;
var GS_INIT = 0X0002;
var GS_RUNNING = 0X0003;
var GS_PAUSING = 0X0004; //暂停
var GS_RESTART = 0X0005; //重新开始 , 
var PRE_INIT = 0X0015; //预初始 , 
var GS_EXIT = 0XFFFF; //退出游戏，关闭页面
function GameModel() {
    this.ctx=undefined;
	this.screenWidth =720;
	this.screenHeight = 540;
    var that = this;
    this.state = PRE_INIT;
	var framepassed = 0,start_update_time=0,fps=60;
	var left_role ={}  , right_role ={} ;
	//背景，角色，技能，音效的总载入进度
	this.assetLoadingStatus  = 0;
	//this.roles = [];//所有角色
	this.level = 0;//游戏关卡

	//地面Y值
	this.getGroundY = function(){
		return that.screenHeight - 25;
	};
	this.leftX = 70;
	this.rightX = 500;
    this.update = function() {		
		if(Date.now() - start_update_time >= 1000){		
			fps = FRAMES_PASSED - framepassed;
			framepassed = FRAMES_PASSED;
			start_update_time = Date.now();
		}
		switch (that.state) {
		case PRE_INIT:
			InputModel.init();
			MFGEvent.addEvent(mfgEvents.assetLoading,that.setAssetLoadingStatus);
			that.setResLoading();
			break;
        case GS_RES_LOADING:
            that.ResLoading();
            break;
        case GS_PAUSING:
            that.Pausing();
            break;
        case GS_INIT:
            MFGEvent.removeEvent(mfgEvents.assetLoading,that.setAssetLoadingStatus);
            that.Init();
            break;
        case GS_RUNNING:
            that.Running();		    
            break;
        case GS_RESTART:
            that.Restart();
            break;
        case GS_EXIT:
            that.Exit();
            return;
        default:
            Log("not expected state.");
            break;
        }
		if(InputModel.isKeyDown(KEYS.p))
		{
			that.setPausing();
		}
		if(InputModel.isKeyDown(KEYS.n))
		{
			that.setRunning();
		}
		if(InputModel.isKeyDown(KEYS.r))
		{
			that.setRestart();
		}
		that.Write("FPS: "+fps,520,30,"#f08080");
    };
    //游戏状态
    this.ResLoading = function() {       
        //显示资源载入
		if(typeof that.ctx === "undefined")
		{
			var canvas = document.getElementById(clsid_parms.id_canvas);
			if (!canvas || typeof canvas === "undefined") {
				Log("some bad thing occur", mfgConfig.alertLevel);
				return;
			}
			this.screenWidth =  mfgConfig.screenWidth;
			this.screenHeight = mfgConfig.screenHeight;

			canvas.setAttribute("width",this.screenWidth);
			canvas.setAttribute("height",this.screenHeight);
			var ctx = canvas.getContext("2d");
		
			that.ctx = ctx;
			
		}
		if (typeof(that.ctx) === "undefined") {
            Log("canvas context is undefined");
            return;
        }
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);    
        that.ctx.drawImage(AssetGetter.getBg(0), 0, 0,this.screenWidth,this.screenHeight);
		
		that.ctx.font ="20pt 宋体";
		that.Write("资源载入中...."+that.assetLoadingStatus+"%.",10,24,"#5d7");
		
	    Log("正在载入资源中...请等待!",mfgConfig.toUserLevel);
		if(this.assetLoadingStatus  >= 100 )
		{
			this.setInit();
		}
    };
    this.Init = function() {
		console.log("Init");
		that.InitRoles();
		InputModel.bindEventListener();	
		that.selectRole();
		that.setRunning();
        Log("Init GameModel!");
        Log("游戏愉快!   : )  ",mfgConfig.toUserLevel);
    };
	this.Running = function() {
		InputModel.update();
		
		
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);        
        that.drawBG();
		that.drawRoles();
		//Log("Running GameModel!");		
    };
    this.Pausing = function() {
		Log("Pausing Game!",mfgConfig.toUserLevel);
	};
    this.Restart = function() {
		InputModel.unbindEventListener();
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);    
		that.Write("Restart Game! ",100,100);
        Log("Restart Game!",mfgConfig.toUserLevel);		
		that.setInit();
		InputModel.bindEventListener();
    };
    this.Exit = function() {
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);    
		that.Write("Exiting....................! ",100,100);
        Log("Exit GameModel!");
		
    };

	
	this.Write = function(info,x,y,color,bgColor){
		if(typeof(that.ctx) === "undefined") {
			//Log("还未定义ctx");
			return ;
		}
		that.ctx.textAlign = "left";
		that.ctx.fillStyle = bgColor = bgColor === undefined ? "#ffffff" : bgColor;
		that.ctx.fillRect(x,y-20,that.ctx.measureText(info).width,25);
		that.ctx.fillStyle = color ? color:"blue";
		that.ctx.fillText(info,x,y);
	};
	this.drawBG = function(){
		 that.ctx.drawImage(AssetGetter.getBg(1), 0, 0,this.screenWidth,this.screenHeight);
	};
	//绘制角色
	this.drawRoles = function(){
		left_role.update();
		left_role.draw(that.ctx);
		right_role.update();
		right_role.draw(that.ctx);
		//var i;
		//for(i=that.roles[that.level].length-1;i>=0;i--)
		//{
		//	that.roles[that.level][i].update();
		//	that.roles[that.level][i].draw(that.ctx);
		//}
	};

	//初始化角色
	this.InitRoles = function(){

	};
	this.selectRole = function(){
		left_role = that.setRoleCtrl(AssetGetter.getRoleModelByName("RYU1"),0,"KeyBoardCtrl");
		right_role = that.setRoleCtrl(AssetGetter.getRoleModelByName("RYU2"),1,"AICtrl");
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
		role_ctrl.setY(that.getGroundY());//设置地板
		role_ctrl.setScale(1.5);//设置放大倍数
		if(side === 0){
			role_ctrl.setLeft();
			role_ctrl.setX(that.leftX);
		}else{
			role_ctrl.setRight();
			role_ctrl.setX(that.rightX);
		}
		return role_ctrl;
	};







	//设置资源载入进度
	this.setAssetLoadingStatus= function(ev){
		that.assetLoadingStatus = parseInt(((100*ev.args.loaded) / ev.args.totalLoad),10);
	};
    //设置游戏状态
    this.setGameState = function(state) {
        that.state = state;
    };
    this.setResLoading = function() {
        that.setGameState(GS_RES_LOADING);
    };
    this.setRunning = function() {
        that.setGameState(GS_RUNNING);
    };
    this.setInit = function() {
        that.setGameState(GS_INIT);
    };
    this.setPausing = function() {
        that.setGameState(GS_PAUSING);
    };
    this.setRestart = function() {
        that.setGameState(GS_RESTART);
    };
    this.setExit = function() {
        that.setGameState(GS_EXIT);
    };
}


//////////////////////////////////////////////////////////////////////​​