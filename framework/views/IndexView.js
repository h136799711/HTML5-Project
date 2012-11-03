//依赖于window对象和Jquery 
//@author : hebidu 
//@Last Modify : 2012-11-3 11:28
//@Comments: 期望为主视图。

function IndexView() {
    this.ShowDevsInfo = function() {
        $(PREFIX_CLS + clsid_parms.cls_monitorWidth).text(window.screen.width);
        $(PREFIX_CLS + clsid_parms.cls_monitorHeight).text(window.screen.height);
        $(PREFIX_CLS + clsid_parms.cls_navigatorUserLanguage).text(navigator.userLanguage || navigator.language);
        $(PREFIX_CLS + clsid_parms.cls_navigatorPlatform).text(navigator.platform);
        $(PREFIX_CLS + clsid_parms.cls_browser).text(navigator.appName);
        var version = parseFloat(navigator.appVersion);
        $(PREFIX_CLS + clsid_parms.cls_browserVersion).text(version);
    };
    this.Layout = function() {
        var topleft = $(PREFIX_ID + clsid_parms.id_canvas).offset();
        topleft.top = topleft.top + $(PREFIX_ID + clsid_parms.id_canvas).height() / 2;
        topleft.left = topleft.left + $(PREFIX_ID + clsid_parms.id_canvas).width() / 2;
        topleft.top = topleft.top - 32;
        topleft.left = topleft.left - 32;
        $(PREFIX_ID + clsid_parms.id_start).offset(topleft);
        $(PREFIX_ID + clsid_parms.id_start).addClass(clsid_parms.cls_onstart);
    };
    this.startmouseover = function() {
        $(PREFIX_ID + clsid_parms.id_start).removeClass(clsid_parms.cls_onstart);
        $(PREFIX_ID + clsid_parms.id_start).addClass(clsid_parms.cls_onstartOver);
        $(PREFIX_ID + clsid_parms.id_canvas).addClass(clsid_parms.cls_canvasStartOver);
        Log("startmouseover");
    };
    this.startmouseout = function() {
        $(PREFIX_ID + clsid_parms.id_start).removeClass(clsid_parms.cls_onstartOver);
        $(PREFIX_ID + clsid_parms.id_start).addClass(clsid_parms.cls_onstart);
        $(PREFIX_ID + clsid_parms.id_canvas).removeClass(clsid_parms.cls_canvasStartOver);
        Log("startmouseout");

    };
    this.onstart = function() {
        $(PREFIX_ID + clsid_parms.id_start).hide();
    };
    this.bindEventHandler = function() {
        $(PREFIX_ID + clsid_parms.id_start).bind("mouseover", this.startmouseover);
        $(PREFIX_ID + clsid_parms.id_start).bind("mouseout", this.startmouseout);
        $(PREFIX_ID + clsid_parms.id_start).bind("click", this.onstart);
    };
    this.unbindEventHandler = function() {
        $(PREFIX_ID + clsid_parms.id_start).unbind("mouseover", this.startmouseover);
        $(PREFIX_ID + clsid_parms.id_start).unbind("mouseout", this.startmouseout);
        $(PREFIX_ID + clsid_parms.id_start).unbind("click", this.onstart);
    };

    this.initialize = function() {
        this.Layout();
        this.ShowDevsInfo();
        this.bindEventHandler();
    };
}
IndexView.prototype = new BaseView();
//​​