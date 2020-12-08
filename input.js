window.addEventListener('DOMContentLoaded',
					   function(){
	var o_x =0, o_y = 0 , flag = false;
	var subject = document.querySelector('#subject');
	var memo = document.querySelector('#memo');
	var save = document.querySelector('#save');
	var cancel =document.querySelector('#cancel');
	
	if(HTMLCanvasElement){
		//(1)Canvas APi　を利用した処理
		var board = document.querySelector('#board');
		var c = board.getContext('2d');
		c.strokeStyle ='#00F';
		c.lineWidth =3;
		/*c.fillRect(10,10,100,100);
		c.strokeRect(50,50,100,100);
		c.beginPath();
		c.moveTo(250,10);
		c.lineTo(50,50);
		c.lineTo(30,150);
		c.lineTo(170,180);
		c.lineTo(250,150);
		c.closePath();
		c.moveTo(200,10);
		c.quadraticCurveTo(10,100,250,150);
		c.moveTo(40,50);
		c.bezierCurveTo(50,150,350,50,120,150);
		c.arc(150,100,80,0,2 * Math.PI,true);
		c.fillStyle ='#cc5'
		c.strokeStyle ='#f00';
		c.lineWidth = 3;
		c.stroke();
		c.fill();*/
	}else{
		window.alert('Canvas対応のブラウザでアクセスしてください。');
		return;
	}
	
	save.addEventListener('click',
						 function(e){
		e.preventDefault();
		if(subject.validity.valid===false||memo.validity.valid===false){
			window.alert('件名、メモはいずれも必須です。');
			return;
		}
		if(localStorage){
			//(1)セッションストレージから現在立場を取得するコード
			var cpos_latitude = sessionStorage.getItem('cpos_latitude');
			var cpos_longitude = sessionStorage.getItem('cpos_longitude');
			if(cpos_latitude===null||cpos_longitude===null){
				window.alert('トップページからアクセスし直してください');
				location.href='index.html';
			}
			//(2)ローカルストレージにメモ情報を登録するコード
			var list = localStorage.getItem('memolist');
			if(list===null){
				list = [];
			}else{
				list = JSON.parse(list);
			}
			
			list.push({
				//(3)ロカールストレージに保存する内容
				latitude: cpos_latitude,
				longitude: cpos_longitude,
				subject: subject.value,
				memo: memo.value,
				picture:board.toDataURL(),
				updated: new Date()
			});
			list = JSON.stringify(list);
			localStorage.setItem('memolist',list);
			location.href ='index.html';
		}
	},false
						 );
	
	cancel.addEventListener('click',
						   function(){
		location.href='index.html';
	},false
						   );
	var ondown = function(e){
		//(1)タッチ開発/マウスダウン時の処理
		e.preventDefault();
		flag = true;
		if(e.touches){e = e.touches[0];}
		var c_rect = e.target.getBoundingClientRect();
		o_x = e.clientX - c_rect.left;
		o_y = e.clientY - c_rect.top;
	};
	var onup = function(e){
		//(2)タッチ終了/マウスアップ時の処理
		e.preventDefault();
		flag = false;
	};
	
	var onmove = function(e){
		//(3)タッチ移動中/マウス移動中の処理
		e.preventDefault();
		if(flag){
			//(6)マウスが押されている場合の描画処理
			if(e.touches){e = e.touches[0];}
			var c_rect = e.target.getBoundingClientRect();
			var x = e.clientX - c_rect.left;
			var y = e.clientY - c_rect.top;
			c.beginPath();
			c.moveTo(o_x,o_y);
			c.lineTo(x,y);
			c.stroke();
			o_x = x;
			o_y = y;
			
		}
	};
	
	if(window.ontouchstart === undefined){
		//(4)タッチイベントに対応していない場合の処理
		board.addEventListener('mousedown',ondown,false);
		board.addEventListener('mouseup',onup,false);
		board.addEventListener('mousemove',onmove,false);
	}else{
		//(5)タッチイベントに対応している場合の処理
		board.addEventListener('touchstart',ondown,false);
		board.addEventListener('touchend',onup,false);
		board.addEventListener('touchmove',onmove,false);
	}
	
	
},false
					   );