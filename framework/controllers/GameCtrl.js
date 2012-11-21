/**
 * @author hebidu
 * @date 2012-11-5
 * @description 
 */
function GameCtrl(){
	var _model = new GameModel();
	var that = this;
    this.update = function() {
		_model.update();
		
		if(InputModel.isKeyDown(KEYS.p))
		{
			_model.setPausing();
		}
		if(InputModel.isKeyDown(KEYS.n))
		{
			_model.setResume();
		}
		if(InputModel.isKeyDown(KEYS.r))
		{
			_model.setRestart();
		}





		FRAMES_PASSED ++;
		requestAnimFrame(that.update);
    };
	
	this.setPausing = function(){
		_model.setPausing();
	};
	this.setResume = function(){	
		_model.setResume();
	};
}
GameCtrl.prototype = new BaseCtrl();