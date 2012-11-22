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
			return ;//已经准备好了直接返回
		}
		if(typeof MFG_RES_DESC !== "undifined"){			
			this.parseResDesc(MFG_RES_DESC);
			Log("成功获取资源描述");
			return ;
		}

    },
    //载入图片资源，比较耗时的
    LoadAsset: function() {
		MFGEvent.fireEvent(mfgEvents.start);
		//载入背景图片
		var tmp = AssetModel.res.bgs;
		var j,length,img;
		for(j=0,length = tmp.length ;j<length;j++)
		{
				img = new Image();
				AssetModel.bindImageEventHandler(img);
				img.src = getResUrl(resConfig.imgsUrl_relative + tmp[j].bg_url);	
				tmp[j].bg_img = img;
		}
		//载入角色
		tmp = AssetModel.res.roles;
		var url;
		for(url in tmp)
		{
			if(tmp[url] === null){
				img = new Image();
				AssetModel.bindImageEventHandler(img);
				img.src = getResUrl(resConfig.imgsUrl_relative +url);	
				tmp[url] = img;
			}
		}
		//载入技能
		tmp = AssetModel.res.skills;
		for(skill_name in tmp)
		{
			if(tmp[skill_name].skill_img === null){
				img = new Image();
				AssetModel.bindImageEventHandler(img);
				img.src = getResUrl(resConfig.imgsUrl_relative +tmp[skill_name].skill_url);	
				tmp[skill_name].skill_img = img;
			}
		}
		tmp = AssetModel.res.sounds;
		for(url in tmp){
			if(!tmp[url].snd){
				img = new Audio();
				img.addEventListener("canplay",AssetModel.imgOnLoad);
				img.src = getResUrl(resConfig.sndsUrl_relative + tmp[url].url);	
				img.autoplay = true;
				img.loop = true;				
				tmp[url].snd = img;

			}
		}

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
		Log(AssetModel.loaded+" / " + AssetModel.totalLoad);
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
//		Log(data[0]);
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
		Log("角色资源数目:"+tmp.length);			
		this.res.roles = [];
		this.totalLoad += tmp.length;
		for( j=0;j<tmp.length;j++)
		{
			this.res.roles[tmp[j]] = null;
		}
		tmp = data[0].skills;
		Log("技能资源数目:"+tmp.length);	
		this.res.skills = [];
		this.totalLoad += tmp.length;
		for( j=0;j<tmp.length;j++)
		{
			this.res.skills[tmp[j].name] = {skill_url:tmp[j].url,skill_img:null};
		}
		tmp = data[0].sounds;
		Log("音效资源数目:"+tmp.length);	
		this.res.sounds = [];
	//	this.totalLoad += tmp.length;
		for( j=0;j<tmp.length;j++)
		{
			this.res.sounds[tmp[j].desc] = {url : tmp[j].url,	snd : null	};
		}

		console.log("资源解析后的结果: ");
		console.log(this.res);
		MFGEvent.fireEvent(mfgEvents.resDescReady);//触发ready事件	
    }	
};
var AssetGetter = (function(AssetModel){
		/*根据关数，背景下标获得背景图片*/
	var role_models=[];//所有角色模型
	var getBg = function(index){
		return AssetModel.res.bgs[index].bg_img;
	};
	/*根据关数，角色对象获得角色图片 (未定)*/
	var getRole = function(role_name,role_state){
		var filename = role_name+"/"+role_name +"_"+role_state+".gif",i;
		return AssetModel.res.roles[filename];
	
	};
	/*根据关数，技能名字获得技能图片*/
	var getSkill = function(skill_name){
			return AssetModel.res.skills[skill_name].skill_img;
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
//////////////////////////////////////////////////////////////////////

//