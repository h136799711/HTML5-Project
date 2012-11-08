/**
 * @author hebidu
 * @date 2012-11-5
 * @description 
 */
function GameCtrl(){
	this.model = new GameModel();
	this.view = new GameView();	
	this.framePassed = 0;
	var that = this;
    this.Update = function() {
		that.model.Update();
		that.framePassed++;
		requestAnimFrame(that.Update);
    };
	this.Write = function(info,x,y){		
		that.model.Write(info,x,y);
	};
}
GameCtrl.prototype = new BaseCtrl();