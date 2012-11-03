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
   //     this.bindEventHandler = function() {
  //          this.view.bindEventHandler();
//			this.model.bindEventHandler();
  //      };
 //       this.unbindEventHandler = function() {
 //          this.view.unbindEventHandler();
//			this.model.unbindEventHandler();
//        };
		this.IndexAction = function() {
            this.initialize();
            Log("IndexAction's Called  complete!");
		};
		this.initialize = function() {
			try {
				if (typeof(window.MFG) === undefined) {
					return;
				}
		//		this.bindEventHandler();
				this.view.initialize();
				this.model.initialize();
			} catch (e) {
				Log(e.message);
			}
		};
    }
	IndexCtrl.fn = IndexCtrl.prototype = new BaseCtrl();

    window.MFG = new IndexCtrl();
})(window);
//