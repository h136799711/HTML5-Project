//依赖于window.$
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为全局配置文件。

PREFIX_CLS  =".";
PREFIX_ID ="#";
var mfgConfig = (function(){
	return {
		isDebug:true,
		screenWidth:[640,320],
		screenHeight:[480,240],
		remoteBaseUrl:"http://www.hebidu.cn/html5/",
		localBaseUrl:"http://127.0.0.1:8080/HTML5-Project/",
		logLevel:5,
		alertLevel:4,
		errorLevel:3,
		deadLevel:1,
		cfgLoadTime:(Date.now() || new Date().getTime()),
		appStartTime:cfgLoadTime,
		version:"1.0.0"
		
	};
})();
var clsid_parms = {
			cls_canvasStartOver : "canvas-start-over",
			cls_onstartOver : "onstart-over",
			cls_onstart : "onstart",
			cls_monitorWidth  : "monitor-width",
			cls_monitorHeight  : "monitor-height",
			cls_navigatorUserLanguage  :  "Navigator-userLanguage",
			cls_navigatorPlatform  : "Navigator-platform",
			cls_browser  : "browser",
			cls_browserVersion  : "browser-version",
			id_canvas : "canvas",
			id_start : "start"
};
var resConfig = {
	rs1:"rs1.js"
};
function Log(info,level){
	if(typeof(level) == Number && level == mfgConfig.alertLevel)
	{
		alert(info);
		return 0;
	}
	if(mfgConfig.isDebug)
		console.log(info);
	else
		console.log("something happened!");
}
$ = window.$;