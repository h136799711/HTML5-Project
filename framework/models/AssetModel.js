/** @require :Jquery,window.localStorage,getResUrl(config.js),
*    @require:mfgConfig,MFGEvent
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 主要是图片资源、和音乐的管理。
 */
 //@trigger res_desc_ready事件 
 //@trigger loadedAsset事件 
 //@trigger start事件 ，触发游戏模型进行循环
 /*
	res =   [ 
	[Object ]
		=>bgs [Array]
		=>roles[Array]
		=>skills[Array]
	]
	
 */
var AssetModel = {	

	getLoop : 0,
	//资源
	res:{},
	loaded:0,
	totalLoad:0,	
    //获得资源描述字符串
    getResDesc : function(resWhich) {
		if(this.isReadyToLoad) {
			return ;//已经准备好了直接返回，
		}
		if(typeof MFG_RES_DESC !== "undifined"){			
			this.parseResDesc(MFG_RES_DESC);
			Log("成功获取资源描述");
			return ;
		}
		var resdesc = window.localStorage.getItem("MFG_RES_DESC");
		if(resdesc && typeof resdesc !== "undefined"){
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
				getLoop = 0;
				if(mfgConfig.bLoadFromLocal)
				{
					Log("从本地，成功获取资源描述。");
				}else{
					Log("从远程，成功获取资源描述。");
				}
				Log(MFG_RES_DESC);
				anThis.parseResDesc(MFG_RES_DESC);
				if(typeof window.localStorage != 'undefined'){
				window.localStorage.setItem("MFG_RES_DESC",JSON.stringify(MFG_RES_DESC));
				Log("设置localStorage MFG_RES_DESC");
				}
			},
			error:function(){
				Log("无法从远程获取，将从本地获取！");
				if(this.getLoop > 3) {
					Log("从本地，远程，缓存都无法获取到数据。");
					return ;
				}
				mfgConfig.bLoadFromLocal = !mfgConfig.bLoadFromLocal;
				this.getLoop ++;
				anThis.getResDesc(resWhich);
			}
        });

    },	
    LoadBgs: function(bgs) {
        Log("BgsLoding....");
		var j,length;
		for(j=0,length = bgs.length ;j<length;j++)
		{
				var img = new Image();
				img.src = getResUrl(resConfig.imgsUrl_relative + bgs[j].bg_url);	
				this.bindImageEventHandler(img);
				bgs[j].bg_img = img;
		}
    },
    LoadRoles: function(roles) {
        Log("rolesLoding....");    
		//var j,length;
	//	for(j=0,length = roles.length ;j<length;j++)
	//	{
	//			var img = new Image();
	//			img.src = getResUrl(resConfig.imgsUrl_relative + roles[j].role_url);	
	//			this.bindImageEventHandler(img);
	//			roles[j].role_img = img;
		
	//	}
		var url;
		for(url in roles)
		{
			if(roles[url] === null){
				var img = new Image();
				img.src = getResUrl(resConfig.imgsUrl_relative +url);	
				this.bindImageEventHandler(img);
				roles[url] = img;
			}
		}

    },
    LoadSkills: function(skills) {
        Log("skillsLoding....");    
		var j,length;
		for(j=0,length = skills.length ;j<length;j++)
		{
				var img = new Image();
				img.src = getResUrl(resConfig.imgsUrl_relative + skills[j].skill_url);	
				this.bindImageEventHandler(img);
				skills[j].skill_img = img;
		
		}
    },
    LoadMusic: function() {
        Log("musicsLoding....");    

    },
    //载入图片资源，比较耗时的
    LoadAsset: function() {
        Log("LoadAsset start");
		var tmp = AssetModel.res.bgs;
		AssetModel.LoadBgs(tmp);
		tmp = AssetModel.res.roles;
		AssetModel.LoadRoles(tmp);
		tmp = AssetModel.res.skills;
		AssetModel.LoadSkills(tmp);
		AssetModel.LoadMusic(tmp);
		MFGEvent.fireEvent(mfgEvents.start);
    },
    isOnline: function() {
        return navigator.onLine;
    },
	//绑定图片载入相关事件
	bindImageEventHandler:function(img){
		img.onerror = this.imgOnError;
		img.onabort =this.imgOnAbort;
		img.onload = this.imgOnLoad;
	},
	imgOnLoad : function(){
		MFGEvent.fireEvent(mfgEvents.assetLoading,{loaded:++AssetModel.loaded,totalLoad:	AssetModel.totalLoad});
		Log(AssetModel.loaded);
		Log(AssetModel.totalLoad);
		Log("imgOnLoad");
	},
	imgOnError:function(type){
		Log("请再次刷新,有图片载入失败.",mfgConfig.toUserLevel);
	},
	imgOnAbort : function(){
		Log("Image On Abort.");
	},
    //解析资源描述字符串
    parseResDesc: function(data) {
        if (data === undefined) {
            Log("argument of data is undefined!");
            return;
        }
		if(this.isReadyToLoad)
		{
			Log("已经准备好，无需再解析");
			return ;
		}
		this.isReadyToLoad = true;
		Log(data[0]);
		var tmp = data[0].bgs,j;
		Log("背景资源数目:"+tmp.length);
		this.res.bgs = [];
		this.totalLoad += tmp.length;
		for( j=0;j<tmp.length;j++)
		{
			//console.log(tmp[j]);
			this.res.bgs.push({bg_url:tmp[j],bg_img:null});
		}
		tmp = data[0].roles;
		//Log("角色资源数目:"+tmp.length);			
		this.res.roles = [];
		this.totalLoad += tmp.length;
		for( j=0;j<tmp.length;j++)
		{
			//console.log(tmp[j]);
		//	this.res.roles.push({role_url:tmp[j],role_img:null});
			this.res.roles[tmp[j]] = null;
		}
		tmp = data[0].skills;
		Log("技能资源数目:"+tmp.length);	
		this.res.skills = [];
		//	objtmp["skills"].push(0);//标记已载入资源数目
		this.totalLoad += tmp.length;
		for( j=0;j<tmp.length;j++)
		{
			console.log(tmp[j]);
			this.res.skills.push({skill_name:tmp[j].name,skill_url:tmp[j].url,skill_img:null});
		}
		/*
		tmp = data[i]["res"]["musics"];
		Log("音乐资源数目:"+tmp.length);
		objtmp["musics"] = [];
		objtmp["musics"].push(0);//标记已载入资源数目
		for( j=tmp.length-1;j>=0;j--)
		{
			objtmp["musics"].push(tmp[j]);			
		}*/
		console.log("资源解析后的结果: ");
		console.log(this.res);
		MFGEvent.fireEvent(mfgEvents.resDescReady);//触发ready事件		
		console.log("点击下方的开始按钮，开始加载游戏吧!");
    }	/*,
	getBg : function(level,index){
		return this.res[level].bgs[index].bg_img;
	}*/

};
var AssetGetter = (function(AssetModel){
		/*根据关数，背景下标获得背景图片*/
	var am = AssetModel,role_models=[];
	var getBg = function(index){
		return am.res.bgs[index].bg_img;
	};
	/*根据关数，角色对象获得角色图片 (未定)*/
	var getRole = function(role_name,role_state){
		var filename = role_name+"/"+role_name +"_"+role_state+".gif",i;
		return am.res.roles[filename];
	//	for(i=am.res.roles.length-1;i>=0;i--)
	//	{
	//		if(filename === am.res.roles[i].role_url)
	//		{
		//		return am.res.roles[i].role_img;
		//	}
	//	}
	};
	/*根据关数，技能名字获得技能图片*/
	var getSkill = function(skill_name){
			//this.res[level]["skills"]
	};
	var createRoleModels = function(){
		//for(roleConfig
		var j;
		for(j=0;j<roleConfig.length;j++){
			role_models[roleConfig[j].role_name] = new RoleModel();
			role_models[roleConfig[j].role_name].setSpriteInfo(roleConfig[j]);
		}
		
	};
	var getRoleModelByName = function(role_name){
		if(role_models.length <= 0 ){
			createRoleModels();
		}
		return role_models[role_name];
	};
	return {
		getBg:getBg,
		getRole:getRole,
		getSkill:getSkill,
		getRoleModelByName:getRoleModelByName
	};
})(AssetModel);
/** @require: RoleModel,AssetGetter(AssetModel)
*   @author :hebidu  
*   @Last Modify Date : 2012-11-3
*   @Comment : 注释说明
*/
///////////////////////////////////////////////////////////////////////
//由GameModel在初始化时读取
//创建角色，所有角色。
/*
var FactoryModel = (function(){
	var createRoles = function(){
		//for(roleConfig
		var roles = [],j;
		for(j=0;j<roleConfig.length;j++){
			roles.push(new RoleModel());
			roles[j].setSpriteInfo(roleConfig[j]);
			roles[j].setImg(AssetGetter.getRole(roles[j].getRoleName(),roles[j].getRoleState()));
		}
		
		return roles;
	};

	return {
		createRoles:createRoles
	};
})();*/







//////////////////////////////////////////////////////////////////////

//