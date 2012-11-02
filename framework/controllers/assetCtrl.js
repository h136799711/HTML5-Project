var AssetCtrl = {			
		parseJson:function(data){
			Log(data);
		},
		getResources:function(){
			$.getScript(mfgConfig.remoteBaseUrl+resConfig.rs1).done(
			      function(script, textStatus){		
					Log(rs1);
					Log("textStatus = "+textStatus);	  
					Log("success get json data.");
			}).fail(function (jqxhr,setting,exception){
				Log(mfgConfig.remoteBaseUrl+resConfig.rs1+"get failed!");
			});   
		/*
			$.getJSON(mfgConfig.remoteBaseUrl+"rs1.json",
				function(data,status,xhr){
					Log("success get json data.");
					parseJson(data);
				});*/
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