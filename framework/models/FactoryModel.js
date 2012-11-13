/** @require: RoleModel,AssetGetter(AssetModel)
*   @author :hebidu  
*   @Last Modify Date : 2012-11-3
*   @Comment : 注释说明
*/
///////////////////////////////////////////////////////////////////////
//由GameModel在初始化时读取
//创建角色，所有角色。
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
})();







//////////////////////////////////////////////////////////////////////
