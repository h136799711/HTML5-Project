
/////
/*
图片的名称 角色ID-state

id:角色ID，保证唯一。
nickname:角色名称。
state:角色状态 ，等待，行走，跑动，上跳，前跳。
Update:更新
{
	drawImage(
}
spriteInfo:此状态下的图片信息包含
{
	总帧数:totalFrame,
	每帧宽度:frameWidth，高度:frameHeight

	总动画序列ani_seq[
	第一行"wait":动画序列1(1,2,3,5,7),
	第二行"":动画序列2
			]
			var currFrame = function(curFrame){
				currFrame++;
				return 当前动画序列帧
			}
}		
var stateInfo;
AssetModel.getRole(id,state,stateInfo);
返回stateInfo;







*/
var RoleModel = (function(){
	var role_name = "RYU1";
	var role_state = "wait";
	return {
		role_name:role_name,
		role_state:role_state
	};
})();
//需要一个工厂类来创建各类角色
////////