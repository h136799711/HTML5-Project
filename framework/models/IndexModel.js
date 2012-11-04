//依赖 AssetModel,config
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主模型。

//添加loadAsset 事件，触发loadAsset事件
//添加start 事件
function IndexModel() {
    this.initialize = function() {
        //资源加载
        Log("AssetModel.getResDesc start!",mfgConfig.toUserLevel);
        AssetModel.getResDesc(resConfig.rs1);
		//MFG.gameModel = new GameModel();
		MFG.gameCtrl = new GameCtrl();
		MFGEvent.addEvent(mfgEvents.loadAsset,AssetModel.LoadAsset);
		MFGEvent.addEvent(mfgEvents.start,MFG.gameCtrl.Loop);
        Log("AssetModel.getResDesc end!",mfgConfig.toUserLevel);
    };
	this.destroy = function(){
		delete MFG.gameCtrl;
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