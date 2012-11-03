//依赖 AssetModel,config
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主模型。


function IndexModel() {
	this.gameModel = { };
    this.initialize = function() {
		this.bindEventHandler();
        //资源异步加载
        Log("AssetModel.asyncLoad start!");
        AssetModel.getResDesc(resConfig.rs1);
        Log("AssetModel.asyncLoad end!");
    };
    this.onstart = function() {
        mfgConfig.appStartTime = Date.now();
        AssetModel.LoadAsset();
//按理应该在资源加载完执行
		var canvas = document.getElementById(clsid_parms.id_canvas);
		var ctx = canvas.getContext("2d");
		gameModel = new GameModel(ctx);
		gameModel.Run();
    };
	this.unbindEventHandler = function(){
        $(PREFIX_ID + clsid_parms.id_start).unbind("click", this.onstart);
	};
	this.bindEventHandler = function(){
        $(PREFIX_ID + clsid_parms.id_start).bind("click", this.onstart);
	};

}
IndexModel.fn = IndexModel.prototype = new BaseModel();
//