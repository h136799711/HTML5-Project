/** @Dependent : 依赖
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 注释说明
 */
///////////////////////////////////////////////////////////////////////
function GameModel(ctx){
	this.ctx = ctx || undefined;
	this.state = 0;
	var that = this;
	
	this.Run = function(){

		switch(that.state)
		{
			case 0:
			{	
				that.ctx.clearRect(0,0,640,480);
				if(that.ctx === undefined){
					Log("canvas context is undefined");
					return ;
				}
				that.ctx.fillStyle = Math.random()*(0xffffff);
				that.ctx.fillRect(0,0,Math.random()*mfgConfig.screenWidth,Math.random()*mfgConfig.screenHeight);
				that.state = 1;
				Log("Game state 0");		
			}break;
			case 1:
			{
				that.initialize();
				Log("Game state 1");
				that.state = 2;
			}break;
			default:break;
		}
		
		Log("Game Run");		
		requestAnimFrame(that.Run);
	};
	this.initialize = function(){
		that.ctx.drawImage(AssetModel.resources.bgs[0],10,10);
	}
};


//////////////////////////////////////////////////////////////////////​​