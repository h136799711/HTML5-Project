//依赖 AssetModel,config
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主模型。
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
