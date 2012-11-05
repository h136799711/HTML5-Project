/** @Dependent : 依赖Jquery
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 主要是图片资源、和音乐的管理。
 */
 //@trigger res_desc_ready事件 
 //@trigger loadedAsset事件 
 //@trigger start事件 ，触发游戏模型进行循环
 var getLoop = 0;
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
		if(this.isReadyToLoad )
		{
			Log("已经准备好，无需再解析");
			return ;
		}
		this.jsonRes = (data);
       // jsonRes = JSON.stringify(data);
//        Log("数据转为JSON后: "+JSON.stringify(this.jsonRes));
		this.isReadyToLoad = true;
		Log(this.jsonRes);
		for(var i=this.jsonRes .length-1;i>=0;i--)
		{
			var objtmp =  new Object();
			var j;
			var tmp = this.jsonRes[i]["res"]["bgs"];
			Log("背景资源数目:"+tmp.length);
			objtmp["bgs"] = [];
			objtmp["bgs"].push(0);//标记已载入资源数目
			for( j=tmp.length-1;j>=0;j--)
			{
				console.log(tmp[j]);
				objtmp["bgs"].push(tmp[j]);
			}
			tmp = this.jsonRes[i]["res"]["roles"];
			Log("角色资源数目:"+tmp.length);			
			objtmp["roles"] = [];
			objtmp["roles"].push(0);//标记已载入资源数目
			for( j=tmp.length-1;j>=0;j--)
			{
				console.log(tmp[j]);
				objtmp["roles"].push(tmp[j]);
				
			}
			tmp = this.jsonRes[i]["res"]["skills"];
			Log("技能资源数目:"+tmp.length);	
			objtmp["skills"] = [];
			objtmp["skills"].push(0);//标记已载入资源数目
			for( j=tmp.length-1;j>=0;j--)
			{
				console.log(tmp[j]);
				objtmp["skills"].push(tmp[j]);
			}
			/*
			tmp = this.jsonRes[i]["res"]["musics"];
			Log("音乐资源数目:"+tmp.length);
			objtmp["musics"] = [];
			objtmp["musics"].push(0);//标记已载入资源数目
			for( j=tmp.length-1;j>=0;j--)
			{
				objtmp["musics"].push(tmp[j]);			
			}*/
			this.resLevel.push(objtmp);
			
		}
		console.log("资源解析后的结果: ");
		console.log(this.resLevel);






		MFGEvent.fireEvent(mfgEvents.res_desc_ready);//触发ready事件
		
    },
    //获得资源描述字符串
    getResDesc: function(resWhich) {
		if(this.isReadyToLoad) return ;//已经准备好了直接返回，
		
		var resdesc = window.localStorage.getItem("MFG_RES_DESC");
		if(resdesc && typeof resdesc !="undefined"){
			//Log(resdesc.toArray());
			this.parseResDesc(eval(resdesc));
			Log("从缓存成功获取资源描述。");
			return ;
		}
		var resdescUrl= getResUrl(resWhich,mfgConfig.bLoadFromLocal);					
		
        var anThis = this;
        $.ajax({
			url:resdescUrl,
			type:"GET",
			timeout:6000,
			dataType:"script",
			context:anThis,
			success: function(){
				if(mfgConfig.bLoadFromLocal)
				{
					Log("从本地，成功获取资源描述。");
				}else{
					Log("从远程，成功获取资源描述。");
				}
				anThis.parseResDesc(MFG_RES_DESC);
				if(typeof window.localStorage != 'undefined'){
				window.localStorage.setItem("MFG_RES_DESC",JSON.stringify(MFG_RES_DESC));
				Log("设置缓存 MFG_RES_DESC");
				}
			},
			error:function(){
				Log("无法从远程获取，将从本地获取！");
				if(getLoop > 4) {
					Log("从本地，远程，缓存都无法获取到数据。");
				}
				mfgConfig.bLoadFromLocal = !mfgConfig.bLoadFromLocal;
				getLoop ++;
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
	resLevel : [
	],
    //资源
    resources: {
	bgs:[],
	maps:[],
	roles:[],
	skills:[],
	musics:[]
	},
	bindImageEventHandler:function(img){
		img.onerror = function(){ console.log("img.onerror")};
		img.onabort = function(){
		console.log(img.obabort);};
		img.onload = function(){
			AssetModel.mapsLoaded = true;
			Log("image onload one",mfgConfig.toUserLevel);
			MFGEvent.fireEvent(mfgEvents.loadedAsset);
			Log("fireEvent loadedAsset");
		};
	}
};
//​​