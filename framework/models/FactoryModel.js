/** @require: RoleModel,AssetGetter(AssetModel)
*   @author :hebidu  
*   @Last Modify Date : 2012-11-3
*   @Comment : 注释说明
*/
///////////////////////////////////////////////////////////////////////
//由GameModel在初始化时读取
//如何创建角色
var roleConfig = [[{
	//以下表示RYU1角色有2个状态
	//wait持续32帧,forward持续24帧
	//
      role_name:"RYU1",
	  key_state_map:{	//按键与状态相对应
		goForward:[
			39//right key
			],
		
		/*
		如何对应键：状态
		*/
	  },
      role_stateInfo://第一个状态为默认状态
     {
	wait:{
	desc:"wait",
	width:62,
	height:92,
	ani_seq:[0,1,2,3,4,5,6],
	each_frames:5 ,//每each_frames帧递增,
	seq_length:6//序列总长度,便于获取，不用每次ani_seq.length
      },//end wait state
    goForward:{
	desc:"goForward",
	width:66,
	height:92,
	ani_seq:[0,1,2,3,4,5,6],
	each_frames:5,
	seq_length:6
       }//end goForward state
	 }//end role_stateInfo	      
	}],//end RYU1
		//END LEVEL 0 等级0或者说是关卡0
	[]//END LEVEL 1  等级1或者说是关卡1，暂时用不到
];//end roleConfig
//创建角色，所有角色。
var FactoryModel = (function(){
	var createRoles = function(){
		//for(roleConfig
		var rolesCtrl = [],i,j;
		for(i=0;i<roleConfig.length;i++){
			var tmp = [],tmpCtrl=[];
			for(j=0;j<roleConfig[i].length;j++){
				tmp.push(Object.create(RoleModel));
				tmp[j].setSpriteInfo(roleConfig[i][j]);
				tmp[j].setImg(AssetGetter.getRole(i,tmp[j].getRoleName(),tmp[j].getRoleState()));
				tmpCtrl.push(Object.create(RoleCtrl));
				tmpCtrl[j].setModel(tmp[j]);
			}
			rolesCtrl.push(tmpCtrl);
		}
		return rolesCtrl;
	};

	return {
		createRoles:createRoles
	};
})();







//////////////////////////////////////////////////////////////////////
