function GameCtrl(){
	this.model = new GameModel();
	this.view = new GameView();	
	this.framePassed = 0;
	var that = this;
    this.Loop = function() {
		that.model.Loop();
		requestAnimFrame(that.Loop);
    };
	this.Write = function(info,x,y){
		
		that.model.Write(info,x,y);
	};
}
GameCtrl.prototype = new BaseCtrl();