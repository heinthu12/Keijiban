// グローバル変数

window.addEventListener(
	'DOMContentLoaded', // event名
	function(){			// 処理
        var obj = document.querySelectorAll('p button');
        var id;
        obj[0].addEventListener(
         'click',
            function(){
                id = setInterval(myFunc3, 500);    
            },
            false
        );
             obj[1].addEventListener(
         'click',
            function(){
               clearInterval(id);    
            },
            false
        );
		// p75
		// querySelectorAllを使うと配列で取得できます
		var myO = document.querySelectorAll('button');
		var myP = document.querySelector('#result');
		var myB = document.querySelector('input[type="button"]');
		//表示３のボタンをクリックするとタイトルの色を変更する
		myO[1].addEventListener(
			'click',
			function(){	//無名関数
				myFunc3();
			},
			false
		);
		//表示１のボタンをクリックすると自分の出席番号を表示する
		myO[0].addEventListener(
			'click',
			function(){
				myFunc2(this, myP);
			},
			false
		);		
		
		//表示２のボタンをクリックすると自分の名前を表示する
		myB.addEventListener(
			'click',
			function(){	//無名関数
				myFunc(myP);
			},
			false
		);

	},
	false				// 他のオブジェクトに影響しない
);
//関数かんすうリテラル myFunc
var myFunc = function(Obj){
	// ローカル変数
	var  name = 'Hein Thu';
	if(Obj.innerHTML != ''){
		Obj.innerHTML = '';
	}else{
		Obj.innerHTML = name;
	}
};
//関数かんすうリテラル myFunc2
var myFunc2 = function(My, Obj){
	if(My.style.color != 'red'){
		My.style.color = 'red';
	}else{
		My.style.color = 'purple';
	}
	Obj.innerHTML = 'J218';
	Obj.style.color = 'red';	
};
var myFunc3 = function(){
	var myH = document.querySelector('h1');
	if(myH.style.color != 'orange'){
		myH.style.color = 'orange';
	}else{
		myH.style.color = 'black';
	}
};