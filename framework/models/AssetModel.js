var AssetModel = {			
		
		parseJson:function(data){
			Log(data);
			if(data == undefined)
			{
				Log("argument of data is undefined!");
				return ;
			}
		},
		getResources:function(){			

			$.getScript(mfgConfig.remoteBaseUrl+resConfig.rs1).done(
			      function(script, textStatus){		
					parseJson(rs1);
					Log("success get json data.");
			}).fail(function (jqxhr,setting,exception){
				Log(mfgConfig.remoteBaseUrl+resConfig.rs1+"get failed!");
			});   

		},
		LoadMaps:function(){
			Log("LoadMaps");
		},
		LoadRoles:function(){
			Log("LoadRoles");
		},
		LoadSkills:function(){
			Log("LoadSkills");
		},
		LoadMusic:function(){
			Log("LoadMusic");
		},
		Load:function(){
			LoadMaps();
			LoadRoles();
			LoadSkills();
			LoadMusic();
		},//载入数据,
		LoadData:function(){
			if(this.isOnline()){
				AssetCtrl.getResources();
			}else{
				Log("不能联网",mfgConfig.alertLevel);
			}
		},//载入图片资源，比较耗时的
		LoadAsset:function(){
			Log("LoadAsset");
			LoadMaps();
			LoadRoles();
			LoadSkills();
			LoadMusic();
			
		},
		isOnline:function(){
			return navigator.onLine;
		},
			//远程得到的资源,JSON数据
		remoteResources:{}, 
		//背景图片
		localResources:{
			"bgimgs":[{
			"bgImg1":"bgtest.png",	
			"bgImg2":"bgtest.png"
			}],
			"Roles":[{
				"hy":"role1.png",
				"hd":"role2.png"
			}]
		}

};