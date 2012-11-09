
//依赖 AssetModel,config
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主模型。

//添加loadAsset 事件，触发loadAsset事件
//添加start 事件
function IndexModel() {
    this.initialize = function() {
        //资源加载
        Log("AssetModel.getResDesc start!",mfgConfig.toUserLevel);
        AssetModel.getResDesc(resConfig.rs1);
		MFG.gameCtrl = new GameCtrl();
		MFGEvent.addEvent(mfgEvents.assetLoad,AssetModel.LoadAsset);
		MFGEvent.addEvent(mfgEvents.start,MFG.gameCtrl.update);
    };
	this.destroy = function(){
		delete MFG.gameCtrl;
		this.unbindEventHandler();
		MFGEvent.removeEvent(mfgEvents.assetLoad,AssetModel.LoadAsset);
		MFGEvent.removeEvent(mfgEvents.start,MFG.gameCtrl.update);
	};
	//点击开始按钮时触发
    this.onstart = function(eve) {
        mfgConfig.appStartTime = Date.now();
		MFGEvent.fireEvent(mfgEvents.assetLoad);//开始载入资源
    };
	this.unbindEventHandler = function(){
        $(PREFIX_ID + clsid_parms.id_start).unbind("click", this.onstart);
	};
	this.bindEventHandler = function(){
        $(PREFIX_ID + clsid_parms.id_start).bind("click", this.onstart);
	};

}
IndexModel.fn = IndexModel.prototype = new BaseModel();
//

//依赖于window对象和Jquery 
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主视图。

function IndexView() {
	//显示客服端浏览器的信息
    this.ShowDevsInfo = function() {
        $(PREFIX_CLS + clsid_parms.cls_monitorWidth).text(window.screen.width);
        $(PREFIX_CLS + clsid_parms.cls_monitorHeight).text(window.screen.height);
        $(PREFIX_CLS + clsid_parms.cls_navigatorUserLanguage).text(navigator.userLanguage || navigator.language);
        $(PREFIX_CLS + clsid_parms.cls_navigatorPlatform).text(navigator.platform);
        $(PREFIX_CLS + clsid_parms.cls_browser).text(navigator.appName);
        var version = parseFloat(navigator.appVersion);
        $(PREFIX_CLS + clsid_parms.cls_browserVersion).text(version);
        $(PREFIX_CLS + clsid_parms.informationForUser).hide();
		
    };
    this.Layout = function() {
        var topleft = $(PREFIX_ID + clsid_parms.id_canvas).offset();
		$(PREFIX_ID + clsid_parms.id_closeLight).offset({top:2,left:topleft.left});
        topleft.top = topleft.top + $(PREFIX_ID + clsid_parms.id_canvas).height() / 2;
        topleft.left = topleft.left + $(PREFIX_ID + clsid_parms.id_canvas).width() / 2;
        topleft.top = topleft.top - 32;
        topleft.left = topleft.left - 32;
        $(PREFIX_ID + clsid_parms.id_start).offset(topleft);
        $(PREFIX_ID + clsid_parms.id_start).addClass(clsid_parms.cls_onstart);
		$(PREFIX_ID+ clsid_parms.id_mask).css("height",$(document).height());
		$(PREFIX_ID+ clsid_parms.id_mask).css("width",$(document).width());
		$(PREFIX_ID+ clsid_parms.id_mask).css("background-color","#000");
    };
    this.startmouseover = function() {
        $(PREFIX_ID + clsid_parms.id_start).removeClass(clsid_parms.cls_onstart);
        $(PREFIX_ID + clsid_parms.id_start).addClass(clsid_parms.cls_onstartOver);
        $(PREFIX_ID + clsid_parms.id_canvas).addClass(clsid_parms.cls_canvasStartOver);
        //Log("startmouseover");
    };
    this.startmouseout = function() {
        $(PREFIX_ID + clsid_parms.id_start).removeClass(clsid_parms.cls_onstartOver);
        $(PREFIX_ID + clsid_parms.id_start).addClass(clsid_parms.cls_onstart);
        $(PREFIX_ID + clsid_parms.id_canvas).removeClass(clsid_parms.cls_canvasStartOver);
        //Log("startmouseout");

    };
    this.onstart = function() {
        $(PREFIX_ID + clsid_parms.id_start).hide();
    };
    this.bindEventHandler = function() {
        $(PREFIX_ID + clsid_parms.id_start).bind("mouseover", this.startmouseover);
        $(PREFIX_ID + clsid_parms.id_start).bind("mouseout", this.startmouseout);
        $(PREFIX_ID + clsid_parms.id_start).bind("click", this.onstart);
        $(PREFIX_ID + clsid_parms.id_closeLight).bind("click", this.toggleLight);
    };
    this.unbindEventHandler = function() {
        $(PREFIX_ID + clsid_parms.id_start).unbind("mouseover", this.startmouseover);
        $(PREFIX_ID + clsid_parms.id_start).unbind("mouseout", this.startmouseout);
        $(PREFIX_ID + clsid_parms.id_start).unbind("click", this.onstart);
    };
	
    this.initialize = function() {
        this.Layout();
        this.ShowDevsInfo();
    };
	this.destory = function(){
		this.unbindEventHandler();
        $(PREFIX_ID + clsid_parms.id_start).show();
	};
	this.toggleLight = function(){
		if($(PREFIX_ID+ clsid_parms.id_mask).css("visibility") == "hidden")
		{		
			$(PREFIX_ID+clsid_parms.id_mask).css("visibility","visible");
			$(PREFIX_ID+clsid_parms.id_canvas).css("position","absolute");
			$(PREFIX_ID+clsid_parms.id_closeLight).text("开灯");
			Log("visible");
		}else{
			$(PREFIX_ID+ clsid_parms.id_mask).css("visibility","hidden");
			$(PREFIX_ID+clsid_parms.id_canvas).css("position","relative");	
			$(PREFIX_ID+clsid_parms.id_closeLight).text("关灯");
			Log("hidden");
		}
	};
}
IndexView.prototype = new BaseView();
//​​

//依赖于IndexModel,IndexView,BaseCtrl
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主控制器。
(function(window) {

//addEvent res_desc_ready : binderEventHandler
    function IndexCtrl() {
        this.model = new IndexModel();
        this.view = new IndexView();
		var that = this;
		this.IndexAction = function() {
            this.initialize();
            Log("IndexAction's Called  complete!");
		};
		this.bindEventHandler = function(){
				that.view.bindEventHandler();
				that.model.bindEventHandler();
				Log("点击下方的开始按钮，开始加载游戏吧!",mfgConfig.toUserLevel);
		};
		this.initialize = function() {
			try {
				if (typeof(window.MFG) === undefined) {
					return;
				}
				if(AssetModel.isReadyToLoad){
					this.bindEventHandler();
				}
				else{
					MFGEvent.addEvent(mfgEvents.resDescReady,this.bindEventHandler);
				}
				this.view.initialize();
				this.model.initialize();
			} catch (e) {
				Log(e.message);
			}
		};
		this.destroy = function(){
			this.model.destroy();
			this.view.destroy();
		};
    }
	IndexCtrl.fn = IndexCtrl.prototype = new BaseCtrl();
    window.MFG = new IndexCtrl();

})(window);
//