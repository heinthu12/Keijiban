window.addEventListener('DOMContentLoaded',
                         function(){
     var roll = document.querySelector('#roll');
	var pass = document.querySelector('[type="password"]');
    var epass = document.querySelector('#epass');
	var sub = document.querySelector('#submit');
	var reset = document.querySelector('#reset'); 
    var hh = document.querySelector('#hh');
    var eno = document.querySelector('#eno');//エラーメッセージ出力用
	hh.addEventListener('keyup',
                       function(e){
        myValidate(hh,eno);//関数myValidateをCall
    },false
);
    //passを入力後実行するコート
   pass.addEventListener('keyup',
                        function(e){
        myValidate(pass,epass);//関数myValidateをCall
   },false
 );
    //submitボタンのクリック時実行するコート
    sub.addEventListener('click',
                        function(e){
        e.preventDefault();
        if(hh.validity.valid==true && pass.validity.valid==true){//エラーはない
            alert('出席番号は' + no.value + '￥nパスワードは' + pass.value);
            
    }else{//エラーがある
         // no のチェック
        myValidate(hh,eno);//関数myValidateをCall
        //passのチェック
        myValidate(pass,epass);//関数myValidateをCall
         }
       },false
    );
    //resetボタンのクリック時実行するコート
    reset.addEventListener('click',
                          function(){
        //htmlの初期化
        eno.innerHTML = '';
        epass.innerHTML = '';
    },false
                          );
  },false
);
    //関数myValidateの定義
function myValidate(inE,outE){
    var message = ''; //メッセージ初期化
    //入力値のチェック
    if(inE.value === '')
        message = '未入力です。</br>';
    else if(inE.validity.valid === false)
        message = 'パータンが違います。</br>';
    else
        message = 'img src="check.png">';
    //メッセージの表示
    outE.innerHTML = message;
}
