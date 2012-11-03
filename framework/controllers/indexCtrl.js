//依赖于IndexModel,IndexView,BaseCtrl
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主控制器。
(function(window) {
    window.requestAnimFrame = (function() {
        var fps = 33;
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, fps);
        };
    })();

    function IndexCtrl() {
        this.model = new IndexModel();
        this.view = new IndexView();
		this.IndexAction = function() {
            this.initialize();
            Log("IndexAction's Called  complete!");
		};
		this.bindEventHandler = function(){
				MFG.view.bindEventHandler();
				MFG.model.bindEventHandler();
		};
		this.initialize = function() {
			try {
				if (typeof(window.MFG) === undefined) {
					return;
				}
				if(AssetModel.isReadyToLoad)
					this.bindEventHandler();
				else{
					MFGEvent.addEvent(mfgEvents.ready,this.bindEventHandler);
				}
				this.view.initialize();
				this.model.initialize();
			} catch (e) {
				Log(e.message);
			}
		};
		this.destroy = function(){
			this.model.destroy();
			this.view.destroy();

		};
    }
	IndexCtrl.fn = IndexCtrl.prototype = new BaseCtrl();
    window.MFG = new IndexCtrl();

})(window);
//