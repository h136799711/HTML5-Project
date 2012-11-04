/** @Dependent : 依赖Jquery
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 主要是图片资源、和音乐的管理。
 */
 //@trigger res_desc_ready事件 
 //@trigger loadedAsset事件 
 //@trigger start事件 ，触发游戏模型进行循环
var AssetModel = {
	isReadyToLoad:false,//是否准备好载入资源(图片，音乐)
	mapsLoaded:false,
	rolesLoaded:false,
	skillsLoaded:false,
	jsonRes:{},//指向资源描述对象
    //解析资源描述字符串
    parseResDesc: function(data) {
        if (data === undefined) {
            Log("argument of data is undefined!");
            return;
        }
		this.jsonRes = data;
       // jsonRes = JSON.stringify(data);
        Log("数据转为JSON后: "+JSON.stringify(this.jsonRes));
		this.isReadyToLoad = true;
		MFGEvent.fireEvent(mfgEvents.res_desc_ready);//触发ready事件
    },
    //获得资源描述字符串
    getResDesc: function(resWhich) {
		if(this.isReadyToLoad) return ;//已经准备好了直接返回，
		var resdescUrl= getResUrl(resWhich,mfgConfig.bLoadFromLocal);
        var anThis = this;
        $.ajax({
			url:resdescUrl,
			type:"GET",
			timeout:4000,
			dataType:"script",
			context:anThis,
			success: function(){		
				Log("成功获取资源描述。");
				anThis.parseResDesc(MFG_RES_DESC);	
			},
			error:function(){
				Log("无法从远程获取，将从本地获取！");
				mfgConfig.bLoadFromLocal = true;
				anThis.getResDesc(resWhich);
			}
        });

    },
    LoadMaps: function() {
        Log("LoadMaps");
		this.resources.bgs[0] = new Image();
		this.resources.bgs[0].src = getResUrl(this.jsonRes[0]["res"]["bgs"][0],mfgConfig.bLoadFromLocal);
		this.resources.bgs[0].onload = function(){
			mapsLoaded = true;
			Log("image onload one",mfgConfig.toUserLevel);
			MFGEvent.fireEvent(mfgEvents.loadedAsset);
			Log("fireEvent loadedAsset");
		}
    },
    LoadRoles: function() {
        Log("LoadRoles");
		rolesLoaded  = false;
    },
    LoadSkills: function() {
        Log("LoadSkills");
		skillsLoaded = true;
    },
    LoadMusic: function() {
        Log("LoadMusic");
		musicLoaded = true;
    },
    //载入图片资源，比较耗时的
    LoadAsset: function() {
        Log("LoadAsset start");		
        AssetModel.LoadMaps();
        AssetModel.LoadRoles();
        AssetModel.LoadSkills();
        AssetModel.LoadMusic();
		MFGEvent.fireEvent(mfgEvents.start);
//按理应该在资源加载完执行
        Log("LoadAsset end");
    },
    isOnline: function() {
        return navigator.onLine;
    },
    //资源
    resources: {
	bgs:[],
	maps:[],
	roles:[],
	skills:[],
	musics:[]
	}
};
//​​