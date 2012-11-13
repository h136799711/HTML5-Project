/* @require document,FRAMES_PASSED(config.js)
 * @author hebidu
 * @lastdate 2012-11-5
 *  @description 输入
 */

var InputModel = (function(){
	var keyStates =  new Array(257);
	var lazyFrames = 25;
	var init = function(){
		var i;
		for(i=0;i<keyStates.length;i++)
		{
			//press 对象的说明 cnt:按下的次数25帧内，time记录着上2次按下时候的帧数
			keyStates[i] = {iskeydown:false,press:{cnt:0,time:[]},upFrames:lazyFrames};
		}
	};
	var update =  function(){
		var i;
		for(i=256;i>=0;i--)
		{
			//pressNum === 0时，表示没有按下不用处理
			//
			if(keyStates[i].press.cnt !== 0 && (keyStates[i].upFrames -= 1) === 0){
				keyStates[i].upFrames = lazyFrames;
				keyStates[i].press.cnt = (keyStates[i].press.cnt - 1)  > 0 ? keyStates[i].press.cnt-1:0;
				keyStates[i].press.time[keyStates[i].press.cnt] = -1;
			}
		}
	};
	var onkeyPress = function(ev){
		if(ev.keyCode >= 39 && ev.keyCode <= 42)
		{
			ev.preventDefault();
		}
	};
	var onkeyDown = function(ev){
		keyStates[ev.keyCode].iskeydown = true;
		if(ev.keyCode >= 39 && ev.keyCode <= 42)
		{
			ev.preventDefault();
		}
	};
	var onkeyUp = function(ev){
		//被放开必然已经被按下，这是前提条件		
		keyStates[ev.keyCode].press.time[keyStates[ev.keyCode].press.cnt] = FRAMES_PASSED;
		keyStates[ev.keyCode].press.cnt=keyStates[ev.keyCode].press.cnt < 2 ?keyStates[ev.keyCode].press.cnt+1 : 0 ;
		keyStates[ev.keyCode].iskeydown = false;
		
		
	};
	var bindEventListener = function(){
		document.body.addEventListener("keypress",onkeyPress);
		document.body.addEventListener("keydown",onkeyDown);
		document.body.addEventListener("keyup",onkeyUp);
	};
	var unbindEventListener = function(){
		document.body.removeEventListener("keydown",onkeyDown);
		document.body.removeEventListener("keypress",onkeyPress);
		document.body.removeEventListener("keyup",onkeyUp);		
	};
	var isKeyUp = function(key){
		if(keyStates[key] === undefined){
			return false;
		}
		return !keyStates[key].iskeydown;
	};
	var isKeyDown = function(key){
		if(keyStates[key] === undefined) {
			return false;
		}
		return keyStates[key].iskeydown;
	};
	
	var getKeyPress2 = function(key){
		return keyStates[key].press;
	};
	return {
		bindEventListener:bindEventListener,
		unbindEventListener:unbindEventListener,
		update:update,
		init:init,
		isKeyDown:isKeyDown,
		isKeyUp:isKeyUp ,
		getKeyPress2:getKeyPress2 //某个按键被按了几次在限定的帧数内
	};
})();
	


