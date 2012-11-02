//include AssetCtrl

function IndexModel(){
}
IndexModel.fn = IndexModel.prototype = new BaseModel;
IndexModel.fn.PutMap = function(){
	console.log("PutMap");
};
IndexModel.fn.initialize = function(){
		//资源异步加载
		Log("AssetCtrl.asyncLoad start!");
		$(PREFIX_ID+clsid_parms.id_start).bind("click",IndexModel.fn.onstart);
		AssetCtrl.LoadData();
		Log("AssetCtrl.asyncLoad end!");
};
IndexModel.fn.onstart = function(){
	AssetCtrl.LoadAsset();
};