/** @Dependent : 依赖Jquery
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 主要是图片资源、和音乐的管理。
 */
 //@trigger res_desc_ready事件 
 //@trigger loadedAsset事件 
 //@trigger start事件 ，触发游戏模型进行循环
 /*
	resLevel =   [ 
	[Object ]
		=>bgs [Array]
		=>roles[Array]
		=>skills[Array]
	]
	需要有一个文件来描述
	技能名: 技能描述
		(伤害,帧数，动画序列，动画效果easein)
	角色:
		角色名字，角色状态
		角色技能，技能触发表
	
 */
var AssetModel = {	

	getLoop : 0,
	//资源
	resLevel : [],
	loaded:0,
	totalLoad:0,	
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
		//指向资源描述对象
       // jsonRes = JSON.stringify(data);
//        Log("数据转为JSON后: "+JSON.stringify(data));
		this.isReadyToLoad = true;
		Log(data);
		for(var i=0;i<data .length;i++)
		{
			var objtmp =  new Object();
			var j;
			var tmp = data[i]["res"]["bgs"];
			Log("背景资源数目:"+tmp.length);
			objtmp["bgs"] = [];
		//	objtmp["bgs"].push(0);//标记已载入资源数目
			this.totalLoad += tmp.length;
			for( j=0;j<tmp.length;j++)
			{
				console.log(tmp[j]);
				objtmp["bgs"].push({bg_url:tmp[j],bg_img:null});
			}
			tmp = data[i]["res"]["roles"];
			Log("角色资源数目:"+tmp.length);			
			objtmp["roles"] = [];
		//	objtmp["roles"].push(0);//标记已载入资源数目
			this.totalLoad += tmp.length;
			for( j=tmp.length-1;j>=0;j--)
			{
				console.log(tmp[j]);
				objtmp["roles"].push({role_url:tmp[j],role_img:null});
				
			}
			tmp = data[i]["res"]["skills"];
			Log("技能资源数目:"+tmp.length);	
			objtmp["skills"] = [];
		//	objtmp["skills"].push(0);//标记已载入资源数目
			this.totalLoad += tmp.length;
			for( j=tmp.length-1;j>=0;j--)
			{
				console.log(tmp[j]);
				objtmp["skills"].push({skill_name:tmp[j].name,skill_url:tmp[j].url,skill_img:null});
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
			this.resLevel.push(objtmp);
			
		}
		console.log("资源解析后的结果: ");
		console.log(this.resLevel);
		MFGEvent.fireEvent(mfgEvents.resDescReady);//触发ready事件		
		console.log("点击下方的开始按钮，开始加载游戏吧!");
	
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
				getLoop = 0;
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
				if(this.getLoop > 3) {
					Log("从本地，远程，缓存都无法获取到数据。");
				}
				mfgConfig.bLoadFromLocal = !mfgConfig.bLoadFromLocal;
				this.getLoop ++;
				anThis.getResDesc(resWhich);
			}
        });

    },


	
    LoadBgs: function(bgs) {
        Log("BgsLoding....");
		for(var j=0,length = bgs.length ;j<length;j++)
		{
				var img = new Image();
				img.src = getResUrl(resConfig.imgsUrl_relative + bgs[j].bg_url);	
				this.bindImageEventHandler(img);
				bgs[j].bg_img = img;
		}
    },
    LoadRoles: function(roles) {
        Log("rolesLoding....");    

		for(var j=0,length = roles.length ;j<length;j++)
		{
				var img = new Image();
				img.src = getResUrl(resConfig.imgsUrl_relative + roles[j].role_url);	
				this.bindImageEventHandler(img);
				roles[j].role_img = img;
		
		}

    },
    LoadSkills: function(skills) {
        Log("skillsLoding....");    

		for(var j=0,length = skills.length ;j<length;j++)
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
		for(var i=0;i<AssetModel.resLevel.length;i++)
		{
			Log("LoadAsset level "+(i+1));	
			var tmp = AssetModel.resLevel[i]["bgs"];
			AssetModel.LoadBgs(tmp);
			var tmp = AssetModel.resLevel[i]["roles"];
			AssetModel.LoadRoles(tmp);
			var tmp = AssetModel.resLevel[i]["skills"];
			AssetModel.LoadSkills(tmp);
			AssetModel.LoadMusic(tmp);
		}
		MFGEvent.fireEvent(mfgEvents.start);
		
		//setTimeout(self.tmp,2000);
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
		Log("图片获取失败.");
	},
	imgOnAbort : function(){
		Log("Image On Abort.");
	},
	/*根据关数，背景下标获得背景图片*/
	getBg:function(level,index){
		return this.resLevel[level]["bgs"][index].bg_img;
	},
	/*根据关数，技能名字获得技能图片*/
	getSkill:function(level,skill_name){
			this.resLevel[level]["skills"]
	},
	/*根据关数，角色对象获得角色图片 (未定)*/
	getRole:function(level,role){
		
	}
};
//​​