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
	var framepassed = 0,start_update_time=0,fps=60;
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
	else if(role_ctrl1.getY() - role_ctrl1.getHeight() < this.worldRect.leftUp.y){	role_ctrl1.setY(this.worldRect.rightDown.y);		}
	if(role_ctrl1.getX() < this.worldRect.leftUp.x)		{	role_ctrl1.setX(this.worldRect.leftUp.x);		}
	else if(role_ctrl1.getX() + role_ctrl1.getWidth()> this.worldRect.rightDown.x) {	role_ctrl1.setX(this.worldRect.rightDown.x - role_ctrl1.getWidth());	}

	};
	//碰撞检测
	this.collisionDetection = function(){
		this.csDet_RoleCtrl(left_role);
		this.csDet_RoleCtrl(right_role);
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
		
	    Log("正在载入资源中...请等待!",mfgConfig.toUserLevel);
		if(assetLoadingStatus  >= 100 )
		{
			this.setInit();
		}
    };
    this.Init = function() {
		console.log("Init");
		this.InitRoles();
		InputModel.bindEventListener();	
		this.selectRole();
		this.setRunning();
        Log("Init GameModel!");
        Log("游戏愉快!   : )  ",mfgConfig.toUserLevel);
    };
	this.Running = function() {
		InputModel.update();
		this.clearScreen();
        this.drawBG();
		this.drawRoles();
		//Log("Running GameModel!");		
    };
    this.Pausing = function() {
		Log("Pausing Game!",mfgConfig.toUserLevel);
	};
    this.Restart = function() {
		InputModel.unbindEventListener();
		this.clearScreen();
		this.Write("Restart Game! ",100,100);
        Log("Restart Game!",mfgConfig.toUserLevel);		
		this.setInit();
		InputModel.bindEventListener();
    };
    this.Exit = function() {
		this.clearScreen();
		this.Write("Exiting....................! ",100,100);
        Log("Exit GameModel!");
		
    };

	
	this.Write = function(info,x,y,color,bgColor){
		if(typeof(this.ctx) === "undefined") {
			//Log("还未定义ctx");
			return ;
		}
		this.ctx.textAlign = "left";
		this.ctx.fillStyle = bgColor = bgColor === undefined ? "#ffffff" : bgColor;
		this.ctx.fillRect(x,y-20,this.ctx.measureText(info).width,25);
		this.ctx.fillStyle = color ? color:"blue";
		this.ctx.fillText(info,x,y);
	};
	this.drawBG = function(){
		 this.ctx.drawImage(AssetGetter.getBg(1), 0, 0, this.worldRect.rightDown.x,this.worldRect.rightDown.y + this.groundY); 
	};
	//绘制角色
	this.drawRoles = function(){
		left_role.update();
		right_role.update();
		this.collisionDetection();
		left_role.draw(this.ctx);
		right_role.draw(this.ctx);
		//var i;
		//for(i=this.roles[this.level].length-1;i>=0;i--)
		//{
		//	this.roles[this.level][i].update();
		//	this.roles[this.level][i].draw(this.ctx);
		//}
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





	 this.clearScreen = function(){		
		this.ctx.clearRect(0, 0, this.worldRect.rightDown.x,this.worldRect.rightDown.y + this.groundY); 
	};
	 this.update = function() {		
		if(Date.now() - start_update_time >= 1000){		
			fps = FRAMES_PASSED - framepassed;
			framepassed = FRAMES_PASSED;
			start_update_time = Date.now();
		}
		switch (this.state) {
		case PRE_INIT:
			InputModel.init();
			MFGEvent.addEvent(mfgEvents.assetLoading,that.setAssetLoadingStatus);
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
            this.Exit();
            return;
        default:
            Log("not expected state.");
            break;
        }
		if(InputModel.isKeyDown(KEYS.p))
		{
			this.setPausing();
		}
		if(InputModel.isKeyDown(KEYS.n))
		{
			this.setRunning();
		}
		if(InputModel.isKeyDown(KEYS.r))
		{
			this.setRestart();
		}
		this.Write("FPS: "+fps,520,30,"#f08080");
    };
	//设置资源载入进度
	this.setAssetLoadingStatus= function(ev){
		assetLoadingStatus = parseInt(((100*ev.args.loaded) / ev.args.totalLoad),10);
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
    this.setRestart = function() {
        this.setGameState(GS_RESTART);
    };
    this.setExit = function() {
        this.setGameState(GS_EXIT);
    };
}


//////////////////////////////////////////////////////////////////////​​