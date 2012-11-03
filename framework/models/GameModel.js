/** @Dependent : 依赖
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 注释说明
 */
///////////////////////////////////////////////////////////////////////


function GameModel() {
    this.ctx;
    this.state = 0;
	this.skillsLoaded = false ;
	this.rolesLoaded = false;
	this.musicLoaded = false;
	this.mapsLoaded = false;
    var that = this;

    this.Run = function() {

        switch (that.state) {
        case 0:
            {
                that.initialize();
                Log("Game state 1",mfgConfig.toUserLevel);
                that.state = 1;
            }
            break;
        case 1:
            {
                that.ctx.clearRect(0, 0, 60, 60);
                that.ctx.fillStyle = Math.random() * (0xffffff);
                that.ctx.fillRect(0, 0, Math.random() * 60, Math.random() * 60);
                that.state = 1;
            }
        default:
            break;
        }

        Log("Game Run");
        requestAnimFrame(that.Run);
    };
    this.initialize = function() {
        var canvas = document.getElementById(clsid_parms.id_canvas);
        if (!canvas || typeof canvas === "undefined") {
            Log("some bad thing occur", mfgConfig.alertLevel);
            return;
        }

        var ctx = canvas.getContext("2d");
        MFG.gameModel.ctx = ctx;
        if (typeof(that.ctx) === "undefined") {
            Log("canvas context is undefined");
            return;
        }
        Log("Game state 0");
        that.ctx.drawImage(AssetModel.resources.bgs[0], 0, 0);
    }
};


//////////////////////////////////////////////////////////////////////​