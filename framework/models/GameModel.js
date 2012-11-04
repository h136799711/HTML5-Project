/** @Dependent : 依赖
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 注释说明
 */
///////////////////////////////////////////////////////////////////////

function GameModel() {
    this.ctx;
    this.skillsLoaded = false;
    this.rolesLoaded = false;
    this.musicLoaded = false;
    this.mapsLoaded = false;
    var that = this;
    var GS_RES_LOADING = 0X0001;
    var GS_INIT = 0X0002;
    var GS_RUNNING = 0X0003;
    var GS_PAUSING = 0X0004; //暂停
    var GS_RESTART = 0X0005; //重新开始 , 
    var GS_EXIT = 0XFFFF; //退出游戏，关闭页面
    this.state = GS_RES_LOADING;
    this.Loop = function() {

        switch (that.state) {
        case GS_RES_LOADING:
            {			
				MFGEvent.addEvent(mfgEvents.loadedAsset,that.setInit);
                that.ResLoading();
            }
            break;
        case GS_PAUSING:
            {
                that.Pausing();
            }
            break;
        case GS_INIT:
            {
                that.Init();
            }
            break;
        case GS_RUNNING:
            {
                that.Running();
            }
            break;
        case GS_RESTART:
            {
                that.Restart();
            }
            break;
        case GS_EXIT:
            {
                that.Exit();
                return;
            }
            break;
        default:
            {
                Log("not expected state.");
                break;
            }
        }

        requestAnimFrame(that.Loop);
    };
    //游戏状态
    this.ResLoading = function() {
        //显示资源载入
        Log("RES_LOADING GameModel!", mfgConfig.toUserLevel);

    };
    this.Start = function() {
        Log("Start GameModel!", mfgConfig.toUserLevel);
    };
    this.Running = function() {
        //游戏运行
        that.ctx.clearRect(0, 0, 60, 60);
        that.ctx.fillStyle = Math.random() * (0xffffff);
        that.ctx.fillRect(0, 0, Math.random() * 60, Math.random() * 60);
        Log("Running GameModel!", mfgConfig.toUserLevel);
    };
    this.Init = function() {
        var canvas = document.getElementById(clsid_parms.id_canvas);
        if (!canvas || typeof canvas === "undefined") {
            Log("some bad thing occur", mfgConfig.alertLevel);
            return;
        }
        var ctx = canvas.getContext("2d");
        MFG.gameModel.ctx = that.ctx = ctx;
        if (typeof(that.ctx) === "undefined") {
            Log("canvas context is undefined");
            return;
        }
        that.ctx.drawImage(AssetModel.resources.bgs[0], 0, 0)
        that.setRunning();
        Log("Init GameModel!", mfgConfig.toUserLevel);
    };
    this.Pausing = function() {
        Log("Pausing GameModel!", mfgConfig.toUserLevel);

    };
    this.Restart = function() {
        Log("Restart GameModel!", mfgConfig.toUserLevel);
    };
    this.Exit = function() {
        Log("Exit GameModel!", mfgConfig.toUserLevel);

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