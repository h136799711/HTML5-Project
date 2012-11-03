/** @Dependent : 依赖Jquery
 *   @author :hebidu
 *   @Last Modify Date : 2012-11-3
 *   @Comment : 主要是图片资源、和音乐的管理。
 */
var AssetModel = {
	jsonRes:{},
    //解析资源描述字符串
    parseResDesc: function(data) {
        if (data === undefined) {
            Log("argument of data is undefined!");
            return;
        }
		jsonRes = data;
       // jsonRes = JSON.stringify(data);
        //Log(jsonRes);
    },
    //获得资源描述字符串
    getResDesc: function(resWhich) {
		var resdescUrl= getResUrl(resWhich);
        var anThis = this;
        $.getScript(resdescUrl).done(

        function(responese, textStatus) {	        
            anThis.parseResDesc(MFG_RES_DESC);
            Log("success get data from " + resdescUrl);
        }).fail(function(jqxhr, setting, exception) {
            Log(resdescUrl + "get failed!");
        });

    },
    LoadMaps: function() {
        Log("LoadMaps");
		this.resources.bgs[0] = new Image();
		this.resources.bgs[0].src = getResUrl(jsonRes.bgimgs.bg1);
    },
    LoadRoles: function() {
        Log("LoadRoles");
    },
    LoadSkills: function() {
        Log("LoadSkills");
    },
    LoadMusic: function() {
        Log("LoadMusic");
    },
    //载入图片资源，比较耗时的
    LoadAsset: function() {
        Log("LoadAsset start");
        this.LoadMaps();
        this.LoadRoles();
        this.LoadSkills();
        this.LoadMusic();
        Log("LoadAsset end");
    },
    isOnline: function() {
        return navigator.onLine;
    },
    //资源
    resources: {
	bgs:[],
	maps:[],
	roles:[],
	skills:[],
	musics:[]
	}
};
//​​