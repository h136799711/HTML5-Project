//include AssetModel

function IndexModel(){
}
IndexModel.fn = IndexModel.prototype = new BaseModel;
IndexModel.fn.PutMap = function(){
	console.log("PutMap");
};
IndexModel.fn.initialize = function(){
		//资源异步加载
		Log("AssetModel.asyncLoad start!");
		$(PREFIX_ID+clsid_parms.id_start).bind("click",IndexModel.fn.onstart);
		AssetModel.LoadData();
		Log("AssetModel.asyncLoad end!");
};
IndexModel.fn.onstart = function(){
	mfgConfig.appStartTime = Date.now();
	AssetModel.LoadAsset();

};
