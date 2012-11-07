/** @Dependent : 依赖
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
var PRE_INIT = 0X0015; //重新开始 , 
var GS_EXIT = 0XFFFF; //退出游戏，关闭页面
function GameModel() {
    this.ctx;
	this.screenWidth =720;
	this.screenHeight = 540;
    var that = this;
    this.state = PRE_INIT;
	//背景，角色，技能，音效的载入进度
	this.assetLoadingStatus  = 0;
	
	this.level = 0;//游戏关卡
    this.Loop = function() {
		
		switch (that.state) {
		case PRE_INIT:
			{
				MFGEvent.addEvent(mfgEvents.assetLoading,that.setAssetLoadingStatus);
				that.setResLoading();
			}break;
        case GS_RES_LOADING:
            {							
                that.ResLoading();
            }break;
        case GS_PAUSING:
            {
                that.Pausing();
            }break;
        case GS_INIT:
            {

				MFGEvent.removeEvent(mfgEvents.assetLoading,that.setAssetLoadingStatus);
                that.Init();
            }break;
        case GS_RUNNING:
            {
                that.Running();
            }break;
        case GS_RESTART:
            {
				MFGEvent.addEvent(mfgEvents.assetLoading,that.setAssetLoadingStatus);
				//InputModel.Loop();
                that.Restart();
            }break;
        case GS_EXIT:
            {
				//InputModel.Loop();
                that.Exit();
                return;
            }break;
        default:
            {
                Log("not expected state.");
                break;
            }
        }
		if(GetKeyState(KEYS['p']))
		{
			that.setPausing();
		}
		if(GetKeyState(KEYS['n']))
		{
			that.setRunning();
		}	
		if(GetKeyState(KEYS['r']))
		{
			that.setRestart();
		}
   //     requestAnimFrame(that.Loop);
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

		that.ctx.font ="20pt 宋体";
		that.Write("资源载入中...."+that.assetLoadingStatus+"%.",10,24,"#5d7");
		
	   Log("RES_LOADING GameModel!");
		if(this.assetLoadingStatus  >= 100 )
		{
			console.log(AssetModel.resLevel);
			setTimeout(this.setInit,3000);
		}
    };
    this.Init = function() {
		console.log("Init");
		InputModel.Init();
		InputModel.bindEventListener();
		that.setRunning();
        Log("Init GameModel!");
        Log("游戏愉快!   : )  ",mfgConfig.toUserLevel);
    };
    this.Running = function() {
		InputModel.Loop();
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);        
        that.drawBG();
		Log("Running GameModel!");
	
    };
    this.Pausing = function() {
		
		Log("Pausing GameModel!");
			
    };
    this.Restart = function() {
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);    
		that.Write("Restart GameModel! ",100,100);
		InputModel.unbindEventListener();
        Log("Restart GameModel!");
		
		that.setInit();
    };
    this.Exit = function() {
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);    
		that.Write("Exit GameModel! ",100,100);
        Log("Exit GameModel!");
		
    };
	this.Write = function(info,x,y,color){
		if(typeof(that.ctx) === "undefined") {
			//Log("还未定义ctx");
			return ;
		}
		that.ctx.fillStyle = color ? color:"blue";
		that.ctx.textAlign = "left";
		that.ctx.fillText(info,x,y);
	};

	this.setAssetLoadingStatus= function(ev){
		that.assetLoadingStatus = parseInt(100*ev.args.loaded / ev.args.totalLoad);
	};
	
	this.drawBG = function(){
        that.ctx.drawImage(AssetModel.getBg(0,0), 0, 0,this.screenWidth,this.screenHeight);
	}











    //设置游戏状态
    this.setGameState = function(state) {
        that.state = state;
    };
    this.setResLoading = function() {
        that.setGameState(GS_RES_LOADING);
    };
    this.setStart = function() {
        that.setGameState(GS_RUNNING);
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
};


//////////////////////////////////////////////////////////////////////​​