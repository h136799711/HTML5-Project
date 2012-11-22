//依赖于window.$
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为全局配置文件。
var PREFIX_CLS = ".";
var PREFIX_ID = "#";
var FPS_RATE = 1;
var mfgConfig ={
        isDebug: true,
        screenWidth: 640,
        screenHeight: 480,		
        alertLevel: 4,//警告，使用alert方法显示文字
        toUserLevel: 3,//给予用户看
  };
var clsid_parms = (function(){

 return {
	 cls_canvasStartOver: "canvas-start-over",
    cls_onstartOver: "onstart-over",
    cls_onstart: "onstart",
    cls_monitorWidth: "monitor-width",
    cls_monitorHeight: "monitor-height",
    cls_navigatorUserLanguage: "Navigator-userLanguage",
    cls_navigatorPlatform: "Navigator-platform",
    cls_browser: "browser",
    cls_browserVersion: "browser-version",
    id_canvas: "canvas",//canvas
    id_start: "start",//开始按钮
    id_information:"information-for-user",//显示给用户的信息，不便于在游戏中显示的，比如 加载资源的信息
    id_closeLight:"closeLight",//关灯按钮
    id_mask:"mask",//关灯遮罩
	id_content:"content",		
	id_contentInput:"contentInput"
 }
})();
//资源配置文件
//资源的相对路径和资源描述符对象的文件名
var resConfig = (function(){
  return {
		resUrl_relative:"asset/",    //所有资源的目录
		imgsUrl_relative:"images/",//所有图片资源的目录
		sndsUrl_relative:"sound/"//所有图片资源的目录
  }
})();
var mfgEvents = (function(){//程序中自定义的事件

  return {
		releaseSkill:"releaseSkill",
		resDescReady:"resDescReady",//准备好资源描述字符串
		assetLoad:"assetLoad",//开始载入资源
		assetLoading:"assetLoading",//开始载入资源
		start:"start"//开始游戏,游戏循环开始，但是资源未必载入成功

  }
})();
//返回资源的完整路径，第二个参数期望为mfgConfig.bLoadFromLocal.不应该赋其他值
//根据第二个参数为true则返回本地路劲，
//
function getResUrl(resWhich,b){
    return navigator.onLine ? (b?resConfig.resUrl_relative + resWhich:  resConfig.resUrl_relative + resWhich) : resConfig.resUrl_relative + resWhich;  
}
function Log(info,level) {
    if (level  !== undefined){
        if(level === mfgConfig.alertLevel) {
            alert(info);
        }
        if(level === mfgConfig.toUserLevel){
			if($(PREFIX_ID+clsid_parms.id_information).text() !== info){
	            $(PREFIX_ID+clsid_parms.id_information).text(info).fadeOut("slow",function(){
		        $(PREFIX_ID+clsid_parms.id_information).fadeIn("fast");
			    });
			}
        }
        return 0;
    }
    
    if (mfgConfig.isDebug) {
        console.log(info);
    } else {
        console.log("something happened!");
    }
}
 //按键 a-z ,小键盘0-9 ，空格键，上下左右4个方向键
var KEYS = (function(){
 return {
	 a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,
     j :74, k :75, l :76, m :77, n :78, o :79,p:80,q:81,r:82,
     s :83, t :84, u :85, v :86, w :87, x :88, y :89, z :90,
      SPACE :32, left :37, up :38, right :39, down :40,
        //key num pad
     num_0 :96, num_1 :97,     num_2 :98,     num_3 :99,     num_4 :100,
     num_5 :101, num_6 :102,     num_7 :103,     num_8 :104,     num_9 :105
 }
})();
//player 1
function PlayKey(key){
	var _key = key,_press={ cnt:0,time:[] },_isdown=false;
	this.isDown = function(){		return _isdown === true;	 };
	this.setDown = function(isdown){	_isdown = isdown;	};
	this.setPress = function(press){	_press = press;		};
	this.getKey = function(){	return _key;};
	this.getPress = function(){	return _press;	};
	this.getPressCnt = function(){	return _press.cnt;};
	this.getPressTime = function(){	return _press.time;};
};
var KEY_PLAYER1 = [];
KEY_PLAYER1.up  = new PlayKey(KEYS.w);
KEY_PLAYER1.down  = new PlayKey(KEYS.s);
KEY_PLAYER1.left  = new PlayKey(KEYS.a);
KEY_PLAYER1.right  = new PlayKey(KEYS.d);
KEY_PLAYER1.lightBoxing  = new PlayKey(KEYS.j);//轻拳
KEY_PLAYER1.lightKick  = new PlayKey(KEYS.k);//轻脚
KEY_PLAYER1.heavyBoxing  = new PlayKey(KEYS.i);//重拳
KEY_PLAYER1.heavyKick  = new PlayKey(KEYS.o);//重脚

//player 2

//如何创建角色
var roleConfig = [{
    //以下表示RYU1角色有2个状态
    //wait持续32帧,forward持续24帧
    //
      role_name:"RYU1",
      key_state_map:{    //按键与状态相对应
		  
			wave_boxing:{
				keys:["down","right","lightBoxing"],
				isDown:[false,false,false],
				nextstate:"wait"				
			},
			heavy_kick:{
				keys:["heavyKick"],
				isDown:[false],
				nextstate:"wait"
			},
			light_boxing:{
				keys:["lightBoxing"],
				isDown:[false],
				nextstate:"wait"
			},
			light_kick:{
				keys:["lightKick"],
				isDown:[false],
				nextstate:"wait"
			},
		jump_forward:{
				keys:["right","up"],
				isDown:[true,false],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
		jump_back:{
				keys:["left","up"],
				isDown:[true,false],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
		crouch:{
				keys:["down"],
				isDown:[true],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
		jumpUp:{
				keys:["up"],
				nextstate:"jump_down"
			},
			goBack:{
				keys:["left"],
				isDown:[true],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
			goForward:{
				keys:["right"],
				isDown:[true],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
			jump_down:{
				isDown:[],
				nextstate:"wait"
			},
			wait:{
				isDown:[],
				nextstate:"wait"
			}
        /*
        如何对应键：状态
        */
      },
	 //技能信息
	skills_info:{
		  wave_boxing :{
			  sprite:{//可选
				  damage:10,
				  name:"s001",
				  width:56,
				  height:32,
				  ani_seq:[0,1,1,1,1,1,1,1],
			      each_frames:30,
				  v:{x:4,y:0}
			  }
		  }
	  },


      role_stateInfo://第一个状态为默认状态
      //总帧50左右良好
     {
    wave_boxing:{
    desc:"wave_boxing",
    width:108,
    height:90,
    ani_seq:[0,1,2,3,3,3,3],
    each_frames:6,
    seq_length:6,
	loop:1 ,
	release_skill:{frame:4,name:"wave_boxing"}
	},
    wait:{
    desc:"wait",
    width:62,
    height:92,
//    ani_seq:[0,5,3,4,4,2],
    ani_seq:[0,1,2,3,4,5],
    each_frames:10 ,//每each_frames帧递增,
    seq_length:6,//序列总长度,便于获取，不用每次ani_seq.length
     loop:1//循环次数
	  },//end wait state
    goForward:{
    desc:"goForward",
    width:66,
    height:92,
    ani_seq:[0,1,2,3,4,5],
    each_frames:6,
    seq_length:6,
	loop:1,
	v0:{x:1,y:0} //初始速度
       },//end goForward state
	crouch:{
    desc:"crouch",
    width:63,
    height:83,
    ani_seq:[0,0,0],
    each_frames:10,
    seq_length:3,
	loop:1
			},
		jumpUp:{  
		desc:"jumpUp",
		width:58,
		height:109,
		ani_seq:[0,1,2,3,4],
		each_frames:10,
		seq_length:5,
		loop:1,
		v0:{x:0,y:-10}
			},
			goBack:{
			desc:"goBack",
			width:63,
			height:91,
			ani_seq:[0,1,2,3,4,5],
			each_frames:4,
			seq_length:6,
			loop:1,
			v0:{x:-1,y:0} //初始速度
			},
		jump_down:{
			desc:"jumpUp",
			width:57,
			height:109,
			ani_seq:[5,6,6,6,6,6,6],
			each_frames:7,
			seq_length:7,
			loop:1 ,
			v0:{x:0,y:0}
			},
			jump_back:{
			desc:"jump_back",
			width:124,
			height:109,
			ani_seq:[0,1,2,3,4,5,6,7,8],
			each_frames:10,
			seq_length:9,
			loop:1 ,
			v0:{x:-3,y:-10}
			},	
			jump_forward:{
			desc:"jump_forward",
			width:124,
			height:109,
			ani_seq:[0,1,2,3,4,5,6,7,8],
			each_frames:10,
			seq_length:9,
			loop:1    ,
			v0:{x:3,y:-10}
			},
			light_boxing:{
			desc:"light_boxing",
			width:94,
			height:91,
			ani_seq:[0,1,2],
			each_frames:10,
			seq_length:3,
			loop:1 
				
			},
			light_kick:{
			desc:"light_kick",
			width:116,
			height:94,
			ani_seq:[0,1,2,3,4],
			each_frames:12,
			seq_length:5,
			loop:1 
				
			},
			heavy_kick:{
			desc:"heavy_kick",
			width:122,
			height:94,
			ani_seq:[0,1,2,3,4],
			each_frames:12,
			seq_length:5,
			loop:1 
				
			}
					
			//end  state

     }//end role_stateInfo       
	 

    },//end RYU1  
	








	{
      role_name:"RYU2",
      key_state_map:{    //按键与状态相对应
		  
			wave_boxing:{
				keys:["down","right","lightBoxing"],
				isDown:[false,false,false],
				nextstate:"wait"				
			},
			heavy_kick:{
				keys:["heavyKick"],
				isDown:[false],
				nextstate:"wait"
			},
			light_boxing:{
				keys:["lightBoxing"],
				isDown:[false],
				nextstate:"wait"
			},
			light_kick:{
				keys:["lightKick"],
				isDown:[false],
				nextstate:"wait"
			},
		jump_forward:{
				keys:["right","up"],
				isDown:[true,false],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
		jump_back:{
				keys:["left","up"],
				isDown:[true,false],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
		crouch:{
				keys:["down"],
				isDown:[true],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
		jumpUp:{
				keys:["up"],
				nextstate:"jump_down"
			},
			goBack:{
				keys:["left"],
				isDown:[true],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
			goForward:{
				keys:["right"],
				isDown:[true],//keys对应的键是否要按住不放开,true这个必须按住才行,false必须按过才行,可选参数，按过=按下，放开
				nextstate:"wait"
			},
			jump_down:{
				isDown:[],
				nextstate:"wait"
			},
			wait:{
				isDown:[],
				nextstate:"wait"
			}
        /*
        如何对应键：状态
        */
      },
	 //技能信息
	skills_info:{
		  wave_boxing :{
			  sprite:{//可选
				  damage:10,
				  name:"s001",
				  width:56,
				  height:32,
				  ani_seq:[0,1,1,1,1,1,1,1],
			      each_frames:30,
				  v:{x:4,y:0}
			  }
		  }
	  },


      role_stateInfo://第一个状态为默认状态
      //总帧50左右良好
     {
    wave_boxing:{
    desc:"wave_boxing",
    width:108,
    height:90,
    ani_seq:[0,1,2,3,3,3],
    each_frames:8,
    seq_length:6,
	loop:1 ,
	release_skill:"wave_boxing"
	},
    wait:{
    desc:"wait",
    width:62,
    height:92,
    ani_seq:[0,1,2,3,4,5],
    each_frames:10 ,//每each_frames帧递增,
    seq_length:6,//序列总长度,便于获取，不用每次ani_seq.length
     loop:1//循环次数
	  },//end wait state
    goForward:{
    desc:"goForward",
    width:66,
    height:92,
    ani_seq:[0,1,2,3,4,5],
    each_frames:6,
    seq_length:6,
	loop:1,
	v0:{x:1,y:0} //初始速度
       },//end goForward state
	crouch:{
    desc:"crouch",
    width:63,
    height:83,
    ani_seq:[0,0,0],
    each_frames:10,
    seq_length:3,
	loop:1
			},
		jumpUp:{  
		desc:"jumpUp",
		width:58,
		height:109,
		ani_seq:[0,1,2,3,4],
		each_frames:10,
		seq_length:5,
		loop:1,
		v0:{x:0,y:-10}
			},
			goBack:{
			desc:"goBack",
			width:63,
			height:91,
			ani_seq:[0,1,2,3,4,5],
			each_frames:4,
			seq_length:6,
			loop:1,
			v0:{x:-1,y:0} //初始速度
			},
		jump_down:{
			desc:"jumpUp",
			width:57,
			height:109,
			ani_seq:[5,5,6,6,6,6,6],
			each_frames:7,
			seq_length:7,
			loop:1 ,
			v0:{x:0,y:0}
			},
			jump_back:{
			desc:"jump_back",
			width:124,
			height:109,
			ani_seq:[0,1,2,3,4,5,6,7,8],
			each_frames:10,
			seq_length:9,
			loop:1 ,
			v0:{x:-3,y:-10}
			},	
			jump_forward:{
			desc:"jump_forward",
			width:124,
			height:109,
			ani_seq:[0,1,2,3,4,5,6,7,8],
			each_frames:10,
			seq_length:9,
			loop:1    ,
			v0:{x:3,y:-10}
			},
			light_boxing:{
			desc:"light_boxing",
			width:94,
			height:91,
			ani_seq:[0,1,2],
			each_frames:10,
			seq_length:3,
			loop:1 
				
			},
			light_kick:{
			desc:"light_kick",
			width:116,
			height:94,
			ani_seq:[0,1,2,3,4],
			each_frames:12,
			seq_length:5,
			loop:1 
				
			},
			heavy_kick:{
			desc:"heavy_kick",
			width:122,
			height:94,
			ani_seq:[0,1,2,3,4],
			each_frames:12,
			seq_length:5,
			loop:1 
				
			}
					
			//end  state

     }//end role_stateInfo       
	 
    }//end RYU2 
];//end roleConfig
$ = window.$;
var MFG_RES_DESC= [
		{
        bgs:["g/loading.jpg","g/front.gif"],//这个比较特殊第一张是载入图片，背景图片
        roles:["RYU1/RYU1_wait.gif",
			//右走，左走，上跳，下蹲，
		"RYU1/RYU1_goForward.gif","RYU1/RYU1_goBack.gif","RYU1/RYU1_jumpUp.gif","RYU1/RYU1_crouch.gif","RYU1/RYU1_jump_back.gif","RYU1/RYU1_jump_forward.gif","RYU1/RYU1_wave_boxing.gif","RYU1/RYU1_light_boxing.gif","RYU1/RYU1_light_kick.gif","RYU1/RYU1_heavy_kick.gif",
			
		
		
		
		
		
		
		"RYU2/RYU2_wait.gif",
			//右走，左走，上跳，下蹲，
		"RYU2/RYU2_goForward.gif","RYU2/RYU2_goBack.gif","RYU2/RYU2_jumpUp.gif","RYU2/RYU2_crouch.gif","RYU2/RYU2_jump_back.gif","RYU2/RYU2_jump_forward.gif","RYU2/RYU2_wave_boxing.gif","RYU2/RYU2_light_boxing.gif","RYU2/RYU2_light_kick.gif","RYU2/RYU2_heavy_kick.gif"],
		//角色图片
        skills:[
            {
                 name:"s001",
                 url:"magic/transverseWave.gif"
            },
			{
				name:"s002",
				url:"magic/transverseWaveDisappear.gif"
			}
            ],
			sounds:[{
				desc:"bgm",
				url:"china.mp3"}]
         } 
];

//​​​​