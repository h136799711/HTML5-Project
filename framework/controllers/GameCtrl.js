/**
 * @author hebidu
 * @date 2012-11-5
 * @description 
 */
function GameCtrl(){
	this.model = new GameModel();
	this.view = new GameView();
	var that = this;
    this.update = function() {
		that.model.update();
		FRAMES_PASSED ++;
		requestAnimFrame(that.update);
    };
}
GameCtrl.prototype = new BaseCtrl();