window.requestAnimFrame = (function() {
        var fps = 17;
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, fps);
        };
})();


if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) { return sKey ? this[sKey] : null; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) { return aKeys[nKeyId]; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () { return aKeys.length; },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx,sKey;
      for (sKey in oStorage)
	  {
		  if(true){
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) { 
			oStorage.setItem(sKey, oStorage[sKey]);
			}
        else {
			aKeys.splice(iThisIndx, 1);
			}
		
					delete oStorage[sKey];
		
		  }
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
      var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/);
	  for (; nIdx < aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
  if (!window.localStorage) {
  window.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) {
      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
    },
    setItem: function (sKey, sValue) {
      if(!sKey) { return; }
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}
}
if (!Object.create) {
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first parameter.');
        }
        function F() {}
        F.prototype = o;
        return new F();
    };
}
if(!document.addEventListener){
	document.addEventListener = document.attachEvent;
	document.removeEventListener = document.detachEvent;
}
if(!Date.now){
		Date.now = function(){	return new Date().getTime();};	
}
/////////////////////////////
//这个效果是 位置与时间的函数关系
//t是当前时间单位,b是起始位置,c是终点位置-起始位置,d是总共需要多少时间单位
//时间单位，我准备使用帧做时间单位
var Utils = {		G : -10 	};
Utils.Tween = (function(){
	var easeLinear = function(t,b,c,d){
		return c * (t/=d) + b;
	};
    var easeInQuad = function(t,b,c,d){
        return c * (t /= d) * t + b;
    };
    var easeOutQuad= function(t,b,c,d){        
        return -c * (t /= d) *(t - 2) + b;
    };
    var easeInCubic = function (t, b, c, d) {
        return c * ((t/=d)*t*t) + b;
    };
    var easeOutCubic = function (t, b, c, d) {
        return c * (((t/=d)-1)*(t-1)*(t-1) + 1) + b;
    };
    var easeInOutCubic = function (t, b, c, d) {
        if ((t/=d/2) < 1)
        return c/2 * (t*t*t) + b;
        return c/2 * ((t-=2)*t*t + 2) + b;
    };
	var halfEaseInQuad = function(t,b,c,d){
		return easeInQuad(0.5 * t > d ? d - t: t,b,c,d);
	};
    return {
		easeLinear:easeLinear,
		halfEaseInQuad:halfEaseInQuad,
        easeInQuad:easeInQuad,
        easeOutQuad:easeOutQuad,//2次方
        easeInCubic :easeInCubic, 
        easeOutCubic:easeOutCubic,
        easeInOutCubic :easeInOutCubic //3次方
    };
})();
Utils.equation = (function(){
	//dir_of_g 指定gravity的方向,gravity的方向默认是Y轴的负方向
	var displacement = function(v0,t,dir_of_g){
		//return 0;
		return v0*t+ 0.5 * (Utils.G / 17) *(dir_of_g === undefined ? 1 : dir_of_g) * t * t; 
	};
	var dist2 = function(x1,y1,x2,y2){
		return (((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));
	};
	return {
		displacement : displacement,
		dist2:dist2
	};
})();
Utils.FPS = (function(){
	var _fps =60,passed_frames=0,pre_time=  (new Date()).getTime();
	function get(){
		var now = (new Date()).getTime();
		if(now - pre_time >= 1000){
			_fps = passed_frames;
			passed_frames=0;
			pre_time = now;
			FPS_RATE = Number(_fps / 60);
			return _fps; 
		}
		passed_frames++;
		return _fps;		
	}
	return {
		get:get
	};	
})();
//