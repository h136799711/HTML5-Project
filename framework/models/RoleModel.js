
/////
/*
图片的名称 角色ID-state

id:角色ID，保证唯一。
nickname:角色名称。
state:角色状态 ，等待，行走，跑动，上跳，前跳。
update:更新
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
 role_stateInfo://第一个状态为默认状态
     {
	wait:{
	width:60,
	height:92,
	ani_seq:[0,1,2,3,4,5,6],
	total_frams:32 //总帧播放完此序列
      },//end wait state
    goForward:{
	width:60,
	height:92,
	ani_seq:[0,1,2,3,4,5,6],
	total_frams:24
       },//end goForward state
	 }//end role_stateInfo	   

*/

///
/*
* 流程 -
			1 创建一个RoleModel
			2 设置spriteInfo(用于信息设置)
			3 设置图片(图片是用于绘制即表象)
			4 update函数
			5 draw(ctx)绘制
			根据当前状态从spriteInfo中获得信息来更新
			RoleModel信息
*/
///
var RoleModel = (function(){
	//updateFrame图片变化的频率，表示一个状态
	//的一张图片持续的帧数
	var curFrame = 0, updateFrame = 5, _x=0,_y=0,_scale=1,cur_state = "wait";
	var img = undefined;//从AssetGetter获得
	var _spriteInfo = { };//包含各种状态	
	
	/////getter
	var setX = function(x){
		_x = x;
	};
	var setY = function(y){
		_y = y;
	};
	var setScale = function(scale){
		_scale = scale;
	};
	var getScale = function(){
		return _scale;
	};
	var getEachFrames = function(){		
		return _spriteInfo.role_stateInfo[cur_state].each_frames;
	};
	var setImg = function(value){
		img = value;
	};
	var getWidth = function(){
		return _spriteInfo.role_stateInfo[cur_state].width;
	};
	var getHeight = function(){
		return _spriteInfo.role_stateInfo[cur_state].height;
	};
	var getRoleName = function(){
		return _spriteInfo.role_name;
	};
	var getRoleState = function(){
		return _spriteInfo.role_stateInfo[cur_state].desc;
	};
	var setSpriteInfo = function(spriteInfo){
		_spriteInfo = spriteInfo;
	};
	var getSeqLength = function(){
		return _spriteInfo.role_stateInfo[cur_state].seq_length;
	};
	var getKeyStateMap = function(){
		return _spriteInfo.role_stateInfo[cur_state].key_state_map;
	};
	
	var draw = function(ctx){
		if(typeof _scale === "undefined"){
			_scale = 1;
		}
		if(typeof img === "undefined" || img == null){
			return false;
		}
		ctx.drawImage(img,parseInt(curFrame)*getWidth(),0,getWidth(),getHeight(),_x,_y,
			_scale*getWidth(),(_scale*getHeight()));
		return true;
	};
	var update = function(){
		curFrame += (1.0 /  getEachFrames());
		if(curFrame >=  getSeqLength()){
			curFrame = 0;
		}
	};
	return {
		draw:draw,
		update:update,
		setX:setX,
		setY:setY,
		setScale:setScale,
		getScale:getScale,
		setImg:setImg,
		setSpriteInfo:setSpriteInfo,
		getWidth:getWidth,
		getHeight:getHeight,
		getRoleName:getRoleName,
		getRoleState:getRoleState,
	};
})();
//需要一个工厂类来创建各类角色


////////