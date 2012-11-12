/* @require document
 * @author hebidu
 * @lastdate 2012-11-5
 *  @description 输入
 */

var InputModel = (function(){
	var keyStates =  new Array(257);
	var keyPress = [];
	var lazyFrames = 30;
	var init = function(){
		var i;
		for(i=0;i<keyStates.length;i++)
		{
			keyStates[i] = {pressNum:0,upFrames:-1};
		}
	};
	var update =  function(){
		var i;
		for(i=256;i>=0;i--)
		{
			if(keyStates[i].upFrames !== -1){
				if((keyStates[i].upFrames -= 1) === 0){
					//console.log(i);
					//console.log(keyStates[i]);
					keyStates[i].pressNum = 0;
					keyStates[i].upFrames = -1;
				}
			}else{
				keyStates[i].pressNum = (keyStates[i].pressNum - 1)  > 0 ? keyStates[i].pressNum:0;
			}
		}
	};
	var bindEventListener = function(){
		document.body.addEventListener("keydown",onkeyDown);
		document.body.addEventListener("keypress",onkeyPress);
		document.body.addEventListener("keyup",onkeyUp);
	};
	var unbindEventListener = function(){
		document.body.removeEventListener("keydown",onkeyDown);
		document.body.removeEventListener("keypress",onkeyPress);
		document.body.removeEventListener("keyup",onkeyUp);		
	};
	var onkeyPress = function(ev){
		if(ev.keyCode >= 97 && ev.keyCode <122)
		{
			ev.keyCode -= 32;
		}
//		keyPress.push(ev.keyCode);
	};
	var onkeyDown = function(ev){
		if(keyStates[ev.keyCode].upFrames !== -1)
		{
			keyStates[ev.keyCode].pressNum++;
		}else{
			keyStates[ev.keyCode].pressNum = 1;	
		}
		if(ev.keyCode < 112 || ev.keyCode > 123){
			ev.preventDefault();
		}
	};
	var onkeyUp = function(ev){
		//被放开必然已经被按下，这是前提条件
		keyStates[ev.keyCode].upFrames = lazyFrames;
	};
	var isKeyUp = function(key){
		if(keyStates[key] === undefined){
			return false;
		}
		return keyStates[key].upFrames !== -1;
	};
	var isKeyDown = function(key){
		if(keyStates[key] === undefined) {
			return false;
		}
		return keyStates[key].upFrames === -1 && keyStates[key].pressNum > 0 ;
	};
	var keyPressNum = function(key){
		return keyStates[key].pressNum;
	};
	return {
		bindEventListener:bindEventListener,
		unbindEventListener:unbindEventListener,
		update:update,
		init:init,
		isKeyDown:isKeyDown,
		isKeyUp:isKeyUp ,
		keyPressNum:keyPressNum //某个按键被按了几次在限定的帧数内
	};
})();
	


