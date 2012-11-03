//依赖于window.$
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为全局配置文件。
PREFIX_CLS = ".";
PREFIX_ID = "#";
var mfgConfig = {
        isDebug: true,
        screenWidth: 640,
        screenHeight: 480,
        remoteBaseUrl: "http://www.hebidu.cn/html5/",
        localBaseUrl: "http://127.0.0.1:8080/HTML5-Project/",
        logLevel: 5,
        alertLevel: 4,
        errorLevel: 3,
        deadLevel: 1,
        cfgLoadTime: (Date.now() || new Date().getTime()),
        appStartTime: this.cfgLoadTime,
        version: "1.0.0"

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
	id_information:"information"//显示给用户的信息，不便于在游戏中显示的，比如 加载资源的信息
};
var resConfig = {
	resUrl_relative:"asset/",
    rs1: "rs1.js"
};

function getResUrl(resWhich){
    return navigator.onLine ?  mfgConfig.remoteBaseUrl + resConfig.resUrl_relative + resWhich : mfgConfig.localBaseUrl + resConfig.resUrl_relative + resWhich;  
}
function Log(info,level) {
    if (level  !== undefined && level === mfgConfig.alertLevel) {
        alert(info);
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