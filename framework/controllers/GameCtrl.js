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
    this.Loop = function() {
		that.model.Loop();
		that.framePassed++;
		requestAnimFrame(that.Loop);
    };
	this.Write = function(info,x,y){		
		that.model.Write(info,x,y);
	};
}
GameCtrl.prototype = new BaseCtrl();