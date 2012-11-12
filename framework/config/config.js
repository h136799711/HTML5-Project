//依赖于window.$
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为全局配置文件。
PREFIX_CLS = ".";
PREFIX_ID = "#";
var mfgConfig = {
        bLoadFromLocal:true,//无用，使用相对路径了，
        isDebug: true,
        screenWidth: 640,
        screenHeight: 480,
        remoteBaseUrl: "http://www.hebidu.cn/html5/",
        localBaseUrl: "http://127.0.0.1:8080/HTML5-Project/",
        
        logLevel: 5,//记录开发用
        alertLevel: 4,//警告，使用alert方法显示文字
        toUserLevel: 3,//给予用户看
        deadLevel: 1,//直接退出，会记录以console.log方式
        cfgLoadTime: (Date.now() || new Date().getTime()),
        appStartTime: this.cfgLoadTime, //程序启动时间在IndexModel中的onstart方法中重新赋值就是在按下开始按钮后赋值，
        version: "1.1.0"

};
var clsid_parms = {
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
    id_mask:"mask"//关灯遮罩
};
//资源配置文件
//资源的相对路径和资源描述符对象的文件名
var resConfig = {
    resUrl_relative:"asset/",    //所有资源的目录
    rs1: "rs1.js",//资源描述
    imgsUrl_relative:"images/"//所有图片资源的目录
};
var mfgEvents = {//程序中自定义的事件
    resDescReady:"resDescReady",//准备好资源描述字符串
    assetLoad:"assetLoad",//开始载入资源
    assetLoading:"assetLoading",//开始载入资源

    start:"start"//开始游戏,游戏循环开始，但是资源未必载入成功
    
};
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
            $(PREFIX_ID+clsid_parms.id_information).text(info).fadeOut("slow",function(){
            $(PREFIX_ID+clsid_parms.id_information).fadeIn("fast");
            });
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

var KEYS = {
    a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,
     j :74, k :75, l :76, m :77, n :78, o :79,p:80,q:81,r:82,
     s :83, t :84, u :85, v :86, w :87, x :88, y :89, z :90,
      SPACE :32, left :37, up :38, right :39, down :40,
        //key num pad
     num_0 :96, num_1 :97,     num_2 :98,     num_3 :99,     num_4 :100,
     num_5 :101, num_6 :102,     num_7 :103,     num_8 :104,     num_9 :105
};
//player 1
var KEY_PLAYER1 = [];
KEY_PLAYER1.up  = {key:KEYS.w,pressNum:0,pressTime:0};
KEY_PLAYER1.down  = {key:KEYS.s,pressNum:0,pressTime:0};
KEY_PLAYER1.left  = {key:KEYS.a,pressNum:0,pressTime:0};
KEY_PLAYER1.right  = {key:KEYS.d,pressNum:0,pressTime:0};
//player 2

//如何创建角色
var roleConfig = [{
    //以下表示RYU1角色有2个状态
    //wait持续32帧,forward持续24帧
    //
      role_name:"RYU1",
      key_state_map:{    //按键与状态相对应
        goForward:[
            "right"//right key
            ]
        
        /*
        如何对应键：状态
        */
      },
      role_stateInfo://第一个状态为默认状态
      //总帧50左右良好
     {
    wait:{
    desc:"wait",
    width:62,
    height:92,
//    ani_seq:[0,5,3,4,4,2],
    ani_seq:[0,1,2,3,4,5],
    each_frames:17 ,//每each_frames帧递增,
    seq_length:6//序列总长度,便于获取，不用每次ani_seq.length
      },//end wait state
    goForward:{
    desc:"goForward",
    width:66,
    height:92,
    ani_seq:[0,1,2,3,4,5],
    each_frames:6,
    seq_length:6
       }//end goForward state
     }//end role_stateInfo          
    },//end RYU1  
];//end roleConfig
$ = window.$;
var MFG_RES_DESC= [
		{
        bgs:["g/loading.jpg","g/front.gif"],//这个比较特殊第一张是载入图片，背景图片
        roles:["RYU1/RYU1_wait.gif","RYU1/RYU1_goForward.gif"],//角色图片
        skills:[
            {
                 name:"s_001",
                 url:"RYU1/RYU1_light_kick11.gif"
            },
            {
                 name:"s_002",
                 url:"RYU1/RYU1_light_kick.gif"
            }
            ]
         }
           ];
//window = window;
//document = window.document;
//navigator = window.navigator;

//​​​​