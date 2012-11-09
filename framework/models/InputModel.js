/* @require document
 * @author hebidu
 * @lastdate 2012-11-5
 *  @description 输入
 */

 //按键 a-z ,小键盘0-9 ，空格键，上下左右4个方向键

var KEYS = {
    "a":65,'b':66,'c':67,'d':68,'e':69,'f':70,'g':71,'h':72,'i':73,
    'j':74,'k':75,'l':76,'m':77,'n':78,'o':79,'p':80,'q':81,'r':82,
    's':83,'t':84,'u':85,'v':86,'w':87,'x':88,'y':89,'z':90,
     "SPACE":32,"left":37,"up":38,"right":39,"down":40,
        //key num pad
    "num_0":96,"num_1":97,    "num_2":98,    "num_3":99,    "num_4":100,
    "num_5":101,"num_6":102,    "num_7":103,    "num_8":104,    "num_9":105
};
var InputModel = {
	keyStates : new Array(257),//所有键的状态按下，放开
	lazyFrames :5,
	lazyUpKey :[],//延时-在放开按键之后继续假设按着5帧
	Init:function(){
		lazyUpKey = [];
	},
	update :  function(){
		var i;
		for(i= this.lazyUpKey.length -1 ;i>=0;i--)
		{
			if(typeof this.lazyUpKey[i] === "undefined") {		
				this.lazyUpKey.splice(i,1);
				continue;
			}
			if((this.lazyUpKey[i].f -= 1) === 0)
			{
				this.keyStates[this.lazyUpKey[i].k] = false;			
				this.lazyUpKey.splice(i,1);
			}
		}
	},
	bindEventListener : function(){
		document.body.addEventListener("keydown",InputModel.keyDown);
		document.body.addEventListener("keyup",InputModel.keyUp);		
	//	console.log("input bindevent");
	},
	unbindEventListener : function(){
		document.body.removeEventListener("keydown",InputModel.keyDown);
		document.body.removeEventListener("keyup",InputModel.keyUp);		
	},
	keyDown : function(ev){
	//	console.log("keydown");
		InputModel.keyStates[ev.keyCode] = true;
		if(ev.keyCode < 112 || ev.keyCode > 123){
			ev.preventDefault();
		}
	//	console.log("keydown"+ev.keyCode);
	},
	keyUp : function(ev){
		var i=-1;
		for(i= InputModel.lazyUpKey.length -1 ;i>=0;i--)
		{
			if(typeof InputModel.lazyUpKey[i] === "undefined")
			{
				continue;
			}
			if(InputModel.lazyUpKey[i].k  == ev.keyCode)
			{
				InputModel.lazyUpKey[i].f = InputModel.lazyFrames;
				break;
			}
		}
		if(i < 0){
			InputModel.lazyUpKey.push({k:ev.keyCode,f:InputModel.lazyFrames});
		}
		}
};

function GetKeyState(key){//取过一次数据则废弃
	if(InputModel && typeof	InputModel.keyStates !== "undefined"){
		var rst = InputModel.keyStates[key];
		InputModel.keyStates[key] = false;	
		return rst;
	}

}
