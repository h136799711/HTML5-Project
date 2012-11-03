//依赖 AssetModel,config
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主模型。


function IndexModel() {
    this.initialize = function() {
        //资源异步加载
        Log("AssetModel.getResDesc start!",mfgConfig.toUserLevel);
        AssetModel.getResDesc(resConfig.rs1);
		MFG.gameModel = new GameModel();
		MFGEvent.addEvent(mfgEvents.loadAsset,AssetModel.LoadAsset);
		MFGEvent.addEvent(mfgEvents.start,MFG.gameModel.Run);
        Log("AssetModel.getResDesc end!",mfgConfig.toUserLevel);
    };
	this.destroy = function(){
		delete MFG.gameModel;
		this.unbindEventHandler();
		MFGEvent.removeEvent(mfgEvents.loadAsset);
		MFGEvent.removeEvent(mfgEvents.start);
	};
    this.onstart = function(eve) {
        mfgConfig.appStartTime = Date.now();
		MFGEvent.fireEvent(mfgEvents.loadAsset);
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