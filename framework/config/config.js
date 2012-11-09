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
	resUrl_relative:"asset/",	//所有资源的目录
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
$ = window.$;

//window = window;
//document = window.document;
//navigator = window.navigator;

//