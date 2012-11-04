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
var GS_EXIT = 0XFFFF; //退出游戏，关闭页面
function GameModel() {
    this.ctx;
	this.screenWidth ;
	this.screenHeight ;
    var that = this;
    this.state = GS_RES_LOADING;
    this.Loop = function() {
		
		switch (that.state) {
        case GS_RES_LOADING:
            {			
                that.ResLoading();
				MFGEvent.addEvent(mfgEvents.loadedAsset,that.setInit);
            }break;
        case GS_PAUSING:
            {
                that.Pausing();
            }break;
        case GS_INIT:
            {
                that.Init();
            }break;
        case GS_RUNNING:
            {
                that.Running();
            }break;
        case GS_RESTART:
            {
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
        Log("RES_LOADING GameModel!", mfgConfig.toUserLevel);
		
    };
    this.Running = function() {
		InputModel.Loop();

		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);
        
		that.Write("Running GameModel! ",100,100);
        Log("Running GameModel!", mfgConfig.toUserLevel);
	
    };
    this.Init = function() {
		console.log("Init");
		InputModel.Init();
		if(typeof MFG.gameCtrl.ctx === "undefined")
		{
			var canvas = document.getElementById(clsid_parms.id_canvas);
			if (!canvas || typeof canvas === "undefined") {
				Log("some bad thing occur", mfgConfig.alertLevel);
				return;
			}
			this.screenWidth =  mfgConfig.screenWidth;
			this.screenHeight = mfgConfig.screenHeight;
			var ctx = canvas.getContext("2d");
			MFG.gameCtrl.ctx = that.ctx = ctx;
        
		}
			if (typeof(that.ctx) === "undefined") {
            Log("canvas context is undefined");
            return;
        }
		InputModel.bindEventListener();
		that.ctx.save();
        that.ctx.drawImage(AssetModel.resources.bgs[0], 0, 0);
		that.ctx.restore();
		that.setRunning();
        Log("Init GameModel!", mfgConfig.toUserLevel);
    };
    this.Pausing = function() {
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);    
		that.Write("Pausing GameModel! ",100,100);
        Log("Pausing GameModel!", mfgConfig.toUserLevel);
		
		
    };
    this.Restart = function() {
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);    
		that.Write("Restart GameModel! ",100,100);
		InputModel.unbindEventListener();
        Log("Restart GameModel!", mfgConfig.toUserLevel);
		
		that.setInit();
    };
    this.Exit = function() {
		that.ctx.clearRect(0, 0, that.screenWidth,that.screenHeight);    
		that.Write("Exit GameModel! ",100,100);
        Log("Exit GameModel!", mfgConfig.toUserLevel);

    };
	this.Write = function(info,x,y){
		if(typeof(that.ctx) === "undefined") {
			Log("还未定义ctx");
			return ;
		}
		that.ctx.font = "12pt Carbir";
		that.ctx.fillStyle = 'blue';
		that.ctx.fillText(info,x,y);
	};














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