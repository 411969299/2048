

//Math.random()

var rid = 0; // 向上累加  用于随机生成 dom

var useable_dom_pos = [];  // 可用的位置

var domArr = []; //当前生成的dom集合
var matrixArr = []; // 矩阵数组

var row_x = 4;  //行数
var row_y = 4; //列数

var domdt = 125; //每格 移动的距离

var breakEvent = false;
var gameend = false;
var conCFG ;
var conCFG_0 = {
	"0":{a:"2",b:"set_2"},
	"1":{a:"4",b:"set_4"},
	"2":{a:"8",b:"set_8"},
	"3":{a:"16",b:"set_16"},
	"4":{a:"32",b:"set_32"},
	"5":{a:"64",b:"set_64"},
	"6":{a:"128",b:"set_128"},
	"7":{a:"256",b:"set_256"},
	"8":{a:"512",b:"set_512"},
	"9":{a:"1024",b:"set_1024"},
	"10":{a:"2048",b:"set_2048"},
	"11":{a:"4096",b:"set_4096"},
	"12":{a:"8192",b:"set_8192"},
};
var conCFG_1 = {
	"0":{a:"列兵",b:"set_2"},
	"1":{a:"上士",b:"set_4"},
	"2":{a:"少尉",b:"set_8"},
	"3":{a:"大尉",b:"set_16"},
	"4":{a:"少校",b:"set_32"},
	"5":{a:"中校",b:"set_64"},
	"6":{a:"上校",b:"set_128"},
	"7":{a:"大校",b:"set_256"},
	"8":{a:"少将",b:"set_512"},
	"9":{a:"中将",b:"set_1024"},
	"10":{a:"上将",b:"set_2048"},
	"11":{a:"大将",b:"set_4096"},
	"12":{a:"元帅",b:"set_8192"},
};
var conCFG_2 = {
	"0":{a:"秦朝",b:"set_2"},
	"1":{a:"汉",b:"set_4"},
	"2":{a:"三国",b:"set_8"},
	"3":{a:"两晋",b:"set_16"},
	"4":{a:"十六国",b:"set_32"},
	"5":{a:"南北朝",b:"set_64"},
	"6":{a:"隋",b:"set_128"},
	"7":{a:"唐",b:"set_256"},
	"8":{a:"宋",b:"set_512"},
	"9":{a:"元",b:"set_1024"},
	"10":{a:"明",b:"set_2048"},
	"11":{a:"清",b:"set_4096"},
	"12":{a:"大中华",b:"set_8192"},
}
var conCFG_3 = {
	"0":{a:"主簿",b:"set_2"},
	"1":{a:"县丞",b:"set_4"},
	"2":{a:"司务",b:"set_8"},
	"3":{a:"典籍",b:"set_16"},
	"4":{a:"通判",b:"set_32"},
	"5":{a:"主事",b:"set_64"},
	"6":{a:"侍中",b:"set_128"},
	"7":{a:"少卿",b:"set_256"},
	"8":{a:"通政",b:"set_512"},
	"9":{a:"御史",b:"set_1024"},
	"10":{a:"内务总管",b:"set_2048"},
	"11":{a:"大学士",b:"set_4096"},
	"12":{a:"皇帝",b:"set_8192"},
}


var defultCon = '0';
var key = {
	left : 37,
	top : 38,
	right : 39,
	down : 40,
	ok : 13,
	back : 27,
	KEY_0 : 48,
	KEY_1 : 49,
	KEY_2 : 50,
	KEY_3 : 51,
	KEY_4 : 52,
	KEY_5 : 53,
	KEY_6 : 54,
	KEY_7 : 55,
	KEY_8 : 56,
	KEY_9 : 57,
	KEY_BACKSPACE : 12
	
}
var li_dom={x:0,y:0,con:"0",left:0,top:0,id:null,sty:'set_2',del:false,glide:0};
//glide  移动到指定的坐标

function random_useable () {
	if(useable_dom_pos.length <= 0){
		return false;
	}
	var n = Math.floor(Math.random()*(useable_dom_pos.length))//向下舍入  在可用位置里取
	var rn = useable_dom_pos[n];
	
	useable_dom_pos.splice(n,1);

	//console.log(useable_dom_pos.length+" -- "+rn)
	return rn;
}

function updataUseable (_arr) {
	
	useable_dom_pos = [];
	var cache = []
	/*
	for (var i=0; i < _arr.length; i++) {
		if(_arr[i].length <= 0){
			continue;
		}
		for (var j=0; j < _arr[i].length; j++) {
			if(!_arr[i][j].del){
				var n = (_arr[i][j].x-1)*row_y+_arr[i][j].y
				cache.push(n)
			}
		};
	  
	};
	*/
	for (var j=0; j < _arr.length; j++) {
			if(!_arr[j].del){
				var n = (_arr[j].x-1)*row_y+_arr[j].y
				cache.push(n)
			}
		};
		
	
	//console.log(cache)
	function testNum (_n) {
	  for (var i=0; i < cache.length; i++) {
	  	if(cache[i] == _n){
			return true;
		}
		
	  };
	  return false;
	}
	
	for (var i=0; i < row_x*row_y; i++) {
		var k = i+1;
		if(!testNum(k)){
			useable_dom_pos.push(k)
		}
   
  };
  //console.log(_arr)
  //console.log(useable_dom_pos)
}

function createDom (_n,_an) {
	if(!_n){
		_n = 1;
	}
	//var dom = {};
  for (var i=0; i < _n; i++) { 
  	var n = random_useable();
  	if(!n){
  		//console.log()
  		return false;
  	}
  	var dom = {};
  	// dom = li_dom   传地址 ，经典的 传址 和 传值问题
  	//console.log("n=="+n+" n/row_y == "+Math.ceil(n/row_y))
  	dom.x = Math.ceil(n/row_y);  // 行数
  	//console.log("dom.x == "+dom.x)
  	dom.y = n%row_y == 0 ? row_y : n%row_y;  // 列
  	dom.left = (dom.y -1)*domdt;
  	dom.top = (dom.x -1)*domdt;
  	dom.id = "box_"+rid;rid++;
  	dom.con='0';
  	dom.sty = conCFG[dom.con].b;
  	dom.del=false;
  	dom.glide=0;
  	
  	var li = '<li class="'+dom.sty+'" style="left:'+dom.left+'px;top:'+dom.top+'px;" id="'+dom.id+'">'+conCFG[dom.con].a+'</li>'
  	$('#setLiDom').append(li)
  	
  	
		if(_an != "begin") {
			var elem = $("#" + dom.id)
			elem.css('animation', 'pound1 .8s infinite');

			setTimeout(function() {
				elem.css('animation', '');
			}, 801)
		}

  	
    domArr.push(dom)
     
  };
  
  return true;
 //console.log(domArr)
  
}

function quickSort(array) {  // 快速排序
    //var array = [8,4,6,2,7,9,3,5,74,5];
    //var array = [0,1,2,44,4,324,5,65,6,6,34,4,5,6,2,43,5,6,62,43,5,1,4,51,56,76,7,7,2,1,45,4,6,7];
    var i = 0;
    var j = array.length - 1;
    var Sort = function(i, j) {

        // 结束条件
        if (i == j) {
            return
        };

        var key = array[i];
        var stepi = i; // 记录开始位置
        var stepj = j; // 记录结束位置
        while (j > i) {
            // j <<-------------- 向前查找
            if (array[j] >= key) {
                j--;
            } else {
                array[i] = array[j]
                //i++ ------------>>向后查找
                while (j > ++i) {
                    if (array[i] > key) {
                        array[j] = array[i];
                        break;
                    }
                }
            }
        }

        // 如果第一个取出的 key 是最小的数
        if (stepi == i) {
            Sort(++i, stepj);
            return;
        }

        // 最后一个空位留给 key
        array[i] = key;

        // 递归
        Sort(stepi, i);
        Sort(j, stepj);
    }

    Sort(i, j);

    return array;
}
/*
var ceshid = [{x:4,y:1},{x:1,y:2}]
var ceshidd = bubbleSort(ceshid,"y")
console.log(ceshidd)
*/
function bubbleSort(_array,_xy) {  //冒泡排序  应该是由小到大，配合检测
	var array = clone(_array,2)
	//console.log(array)  // 输出的是 排序好的
    
    var len = array.length;var d;
	//console.log(array)
    for (var i = 0; i < len-1; i++) {
        for (var j = 0; j < len-i-1; j++) {
        	
			//console.log("i == "+i+" j == "+j+"array[j][_xy] == "+array[j][_xy] + "  array[j+1][_xy] == "+array[j+1][_xy])
            if (array[j][_xy] > array[j+1][_xy]) {
                d = array[j];
                array[j] = array[j+1];
                array[j+1] = d;
               // console.log(array[j][_xy])
            }
        }
    }
	//console.log(array)
    return array;
}



function clone(obj, _s) {
	var oa;
	if(!_s || _s == 1) {
		oa = [];

		for(var i = 0; i < obj.length; i++) {
			oa.push([]);
			for(var j = 0; j < obj[i].length; j++) {
				var ob = {};

				for(var k in obj[i][j]) {
					ob[k] = obj[i][j][k]
				}
				oa[i].push(ob)

			};
		}

	} else if(_s == 2) {
		oa = [];

		for(var i = 0; i < obj.length; i++) {
			var ob = {};
			for(var k in obj[i]) {

				ob[k] = obj[i][k]
			}
			oa.push(ob)
		}

	
	} else if(_s == 3) {
		oa = {};
		for(var k in obj) {
			oa[k] = obj[k]
		}
	}


	return oa;
}

function arrGroup (_xay) {
	var a = []
  if (_xay == "x") {
		
		for (var i = 0; i < row_y; i++) {
			a.push([])
		}

		var domArr_c = clone(domArr, 2);
		
		for (var i = 0; i < domArr_c.length; i++) {
			
				a[domArr_c[i].y - 1].push(domArr_c[i])

		}

	} else if (_xay == "y") {

		for (var i = 0; i < row_x; i++) {
			a.push([])
		}

		var domArr_c = clone(domArr, 2);
		for (var i = 0; i < domArr_c.length; i++) {
			
				a[domArr_c[i].x - 1].push(domArr_c[i])

		}

	}
	return a;
}

function divideArr (_xay,_direction) {
	// 上下  列 y
	//左右 行 x
	matrixArr =[];
	var ifm = false;  //判断是否可以移动
	var ifm_xy = "x";
	
	matrixArr = arrGroup(_xay);
	
	ifm_xy = _xay == "x" ? "y":"x";
	
	
	//console.log(domArr)
	for(var i = 0; i < matrixArr.length; i++) {
		if(matrixArr[i].length > 1) {
			//console.log(matrixArr[i])
			matrixArr[i] = bubbleSort(matrixArr[i], _xay)
		}
		
		var len = matrixArr[i].length;

			if(!ifm) {
				for(var k = 0; k < matrixArr[i].length; k++) {
					if(ifm) {
						break;
					}
					
					
					switch (_direction) {
						case key.top:
							if(matrixArr[i][0][_xay] != 1) {//最上一个是否在顶部
								ifm = true
							}
							break;
						case key.down:
						
							//console.log("i == "+i+" xy == "+matrixArr[i][len-1][_xay])
							//console.log(matrixArr[i])
							if(matrixArr[i][len-1][_xay] != row_y) {//最后一个是否在底部
								ifm = true
							}
							break;
						case key.left:
							if(matrixArr[i][0][_xay] != 1) {
								ifm = true
							}
							break;
						case key.right:
							if(matrixArr[i][len-1][_xay] != row_x) {
								ifm = true
							}
							break;

					}
					
					if(ifm) {
						break;
					}
			
			
					if(k + 1 < matrixArr[i].length) {
						if(matrixArr[i][k][_xay] != matrixArr[i][k+1][_xay] - 1 || matrixArr[i][k].con == matrixArr[i][k + 1].con) {
							ifm = true
						}

					}

				}
			}

	}


	return ifm;
	//console.log(domArr)
	//console.log(matrixArr)
  
}  



function changeDomPos_down (_xay,_tal) {

	var oldarr = clone(matrixArr,1)

	domArr = [];
	for(var i = 0; i < oldarr.length; i++) {

		if(oldarr[i].length <= 0){
			continue;
		}
		var j = oldarr[i].length-1;
		oldarr[i][j][_xay] = row_y;  // 定死
		if(j==0){
			domArr.push(clone(oldarr[i][j],3))
			continue;
		}
		for(;j >= 0; j--) {
			
			if(oldarr[i][j].del){   // 当前dom已经被标记删除  就不用对比了。
				continue;
			}

			if( j == 0){  // 如果走的这里 肯定是 落单儿了
				oldarr[i][j][_xay] = oldarr[i][j+1][_xay]-1;
				domArr.push(clone(oldarr[i][j],3))
				continue;
			}


			if(j != oldarr[i].length-1){
				//console.log("oldarr[i][k].id == "+oldarr[i][k].id+"  oldarr[i][k].x == "+oldarr[i][k].x)
				oldarr[i][j][_xay] = oldarr[i][j+1][_xay]-1;//当前dom 跟着上一个
				//console.log("oldarr[i][k-1].id == "+oldarr[i][k-1].id+"  oldarr[i][k-1].x-1 == "+(oldarr[i][k-1].x-1))
			}

			if(oldarr[i][j].con == oldarr[i][j-1].con){
				oldarr[i][j-1].del = true;
				oldarr[i][j-1][_xay] = oldarr[i][j][_xay];
				var c = parseInt(oldarr[i][j].con);
				c++;
				oldarr[i][j].con = c+"";
				
			}else{

			}
			
			domArr.push(clone(oldarr[i][j],3))

			
		};

	};


	//updataUseable(oldarr); // 更新可用位置
	updataUseable(domArr); // 更新可用位置
	
	breakEvent = true;
	move_animation(oldarr,_xay,_tal);
	
	var xylen = row_x * row_y;
	if(domArr.length < xylen) {
		var d = createDom(1);
	}
	//console.log(domArr)
	updataUseable(domArr); // 更新可用位置
	JudgingMove(_xay,oldarr);
  
}

function changeDomPos_top (_xay,_tal) {

	var oldarr = clone(matrixArr,1)

	domArr = [];
	for(var i = 0; i < oldarr.length; i++) {

		if(oldarr[i].length <= 0){
			continue;
		}
		var j = 0;
		oldarr[i][j][_xay] = 1;  // 定死
		if(j==oldarr[i].length-1){
			domArr.push(clone(oldarr[i][j],3))
			continue;
		}
		for(;j <oldarr[i].length; j++) {

			if(oldarr[i][j].del){   // 当前dom已经被标记删除  就不用对比了。
				continue;
			}

			if( j == oldarr[i].length-1){  // 如果走的这里 肯定是 落单儿了
				oldarr[i][j][_xay] = oldarr[i][j-1][_xay]+1;
				domArr.push(clone(oldarr[i][j],3))
				continue;
			}


			if(j != 0){
				//console.log("oldarr[i][k].id == "+oldarr[i][k].id+"  oldarr[i][k].x == "+oldarr[i][k].x)
				oldarr[i][j][_xay] = oldarr[i][j-1][_xay]+1;//当前dom 跟着上一个
				//console.log("oldarr[i][k-1].id == "+oldarr[i][k-1].id+"  oldarr[i][k-1].x-1 == "+(oldarr[i][k-1].x-1))
			}

			if(oldarr[i][j].con == oldarr[i][j+1].con){
				oldarr[i][j+1].del = true;
				oldarr[i][j+1][_xay] = oldarr[i][j][_xay];
				var c = parseInt(oldarr[i][j].con);
				c++;
				oldarr[i][j].con = c+"";

			}else{

			}

			domArr.push(clone(oldarr[i][j],3))


		};

	};


	

	breakEvent = true;
updataUseable(domArr); // 更新可用位置
	move_animation(oldarr,_xay,_tal);
	
	var xylen = row_x * row_y;
	if(domArr.length < xylen) {
		var d = createDom(1);
	}
	
	updataUseable(domArr); // 更新可用位置
	JudgingMove(_xay,oldarr);

}

function move_animation(_od,_xay,_tal){
	var oldarr =_od;

	for(var i = 0; i < matrixArr.length; i++) {  // UI动画,删除操作

		for (var j = 0; j < matrixArr[i].length; j++) {


			var odom = $("#" + matrixArr[i][j].id);


			var gl = (oldarr[i][j][_xay] - 1) * domdt

			$("#" + matrixArr[i][j].id).css(_tal, gl + "px")



			if (oldarr[i][j].del) {
				var delid = oldarr[i][j].id;
				$("#" + delid).remove();

			} else {
				if (oldarr[i][j].con != matrixArr[i][j].con) {
					odom.html(conCFG[oldarr[i][j].con].a)
					odom.removeClass();
					odom.addClass(conCFG[oldarr[i][j].con].b)
				}
			}

		}
	}
}

function JudgingMove(_xay) {//判断所有方向上 是否还可以移动
	//console.log(_d)
	// 把数组由小到大排列，，按照x和y的坐标 查找，，每次循环，都用当前坐标和 x+1或者Y=1 分别比较两次,只要有相同 就说明可以移动
	//console.log(_d)

	//console.log(domArr.length)
	//console.log(useable_dom_pos.length)
	setTimeout(function() {
						breakEvent = false;
					}, 180)
	var xylen = row_x * row_y;
	if(domArr.length == xylen) {
		var _d = arrGroup(_xay);

		for(var i = 0; i < _d.length; i++) {
			for(var j = 0; j < _d[i].length; j++) {

				if(j + 1 < _d[i].length && _d[i][j].con == _d[i][j + 1].con) {
					
					return true;
				}
				if(i + 1 < _d.length && _d[i][j].con == _d[i+1][j].con) {
					
					return true;
				}

			};

		};

		$("#messWindow").show();
		gameend = true;
		return false;
	}

		
		/*
	if(domArr.length < xylen) {
		if(domArr.length == xylen) {
			

			for(var i = 0; i < _d.length; i++) {
				for(var j = 0; j < _d[i].length; j++) {

					try {
						if(j + 1 < _d[i].length && _d[i][j].con == _d[i][j + 1].con) {

							return true;
						}
					} catch(_e) {
						console.log("i == " + i + "  j== " + j + " id== " + _d[i][j].id)
					}

					try {
						if(i + 1 < _d.length && _d[i][j].con == _d[i+1][j].con) {

							return true;
						}
					} catch(_e) {
						console.log(_d)
						console.log("i == " + i + "  j== " + j + " id== " + _d[i][j].id)
					}

				};

			};

			return false;
		}
		setTimeout(function() {
			breakEvent = false;

		}, 180)
		return true;
	} else {// 全满的情况下
		var _d = arrGroup(_xay);
		
		
	}
*/
}

function keyDownFun (_e) {
	if(breakEvent){
		return
	}
  var keyCode = _e.keyCode;
		//console.log(keyCode)
		
		
	if (gameend) {
		switch (keyCode) {
			case key.ok:
			restartGame()
				break;
		}
		return;
	}

		var dd = false;
	switch (keyCode) {
		case key.top:
			dd = divideArr("x",keyCode);
			if(dd){
				changeDomPos_top("x", "top");
			}
			
			break;
		case key.down:
			dd = divideArr("x",keyCode);
			if(dd){
				changeDomPos_down("x", "top")
			}
			
			break;
		case key.left:
			dd = divideArr("y",keyCode);
			if(dd){
				changeDomPos_top("y", "left");
			}
			
			break;
		case key.right:
			dd = divideArr("y",keyCode);
			if(dd){
				changeDomPos_down("y", "left")
			}
			
			break;
		case key.ok:

			break;
		case key.back:
			window.close();
			break;
	}
}
function main () {
  for (var i=0; i < row_x*row_y; i++) {
    useable_dom_pos[i]=i+1;
  };
  
  createDom(3,"begin")
  updataUseable(domArr); // 更新可用位置
  //console.log(useable_dom_pos)
}


function restartGame() {
	rid = 0;
	// 向上累加  用于随机生成 dom

	useable_dom_pos = [];
	// 可用的位置

	domArr = [];
	//当前生成的dom集合
	matrixArr = [];
	// 矩阵数组
	gameend = false;
	$('#setLiDom li').remove();
	main ();
	$("#messWindow").hide();
}

$(document).ready(function(_d){
	conCFG = conCFG_1;
	main();
	
	$(this).bind('keydown', function(_e) {
		keyDownFun(_e);

	})
	
	var sd =  $("#setLiDom");
	$("#type_li li").bind('click', function(_e) {
		var t = $(this).index();
		if(t==0){
			sd.removeClass();
			sd.addClass("kuang_0");
			conCFG = conCFG_0;
		}else if(t==1){
			sd.removeClass();
			sd.addClass("kuang_1");
			conCFG = conCFG_1;
		}else if(t==2){
			sd.removeClass();
			sd.addClass("kuang_2");
			conCFG = conCFG_2;
		}else if(t==3){
			sd.removeClass();
			sd.addClass("kuang_3");
			conCFG = conCFG_3;
		}
		restartGame()

	})
	$("#restart").bind('click', function(_e) {
		restartGame()

	})

})








