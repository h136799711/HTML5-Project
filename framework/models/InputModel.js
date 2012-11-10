/* @require document
 * @author hebidu
 * @lastdate 2012-11-5
 *  @description 输入
 */

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
var InputModel = (function(){
	//在5帧内一个键被按下的次数，要在放开后才计算
	//一直按着不算
	var keyStates =  new Array(257);
	var lazyFrames = 15;
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
			if(keyStates[i].upFrames !== -1 && (keyStates[i].upFrames -= 1) === 0){
				//console.log(i);
				//console.log(keyStates[i]);
				keyStates[i].pressNum = 0;
				keyStates[i].upFrames = -1;
			}
		}
	};
	var bindEventListener = function(){
		document.body.addEventListener("keydown",keyDown);
		document.body.addEventListener("keyup",keyUp);		
	};
	var unbindEventListener = function(){
		document.body.removeEventListener("keydown",keyDown);
		document.body.removeEventListener("keyup",keyUp);		
	};
	var keyDown = function(ev){
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
	var keyUp = function(ev){
		//被放开必然已经被按下，这是前提条件
		keyStates[ev.keyCode].upFrames = lazyFrames;
	};
	var getKeyStates = function(){		
		return keyStates;
	};
	var isKeyUp = function(key){
		if(keyStates[key] === undefined) return false;
		return keyStates[key].pressNum === 0 && keyStates[key].upFrames !== -1;
	};
	var isKeyDown = function(key){
		if(keyStates[key] === undefined) return false;
		return keyStates[key].upFrames === -1 && keyStates[key].pressNum > 0 ;
	};
	return {
		bindEventListener:bindEventListener,
		unbindEventListener:unbindEventListener,
		update:update,
		init:init,
		isKeyDown:isKeyDown,
		isKeyUp:isKeyUp  
	};
})();
	


