window.addEventListener('DOMContentLoaded',
    function(){
     //ページ本体が読み込まれたタイミングで実行
    var str = 'こんにちは、JavaScript!';
    //logの出力
    //console.log(str);
    var result = document.querySelector('#result');
   //
    result.innerHTML=str;                      
    result.style.color = 'red'; 
    //reset button change
    var res = document.querySelector('[type="reset"]');
    res.addEventListener('click',
       function(){
        //resultのいんえｒHTML propertyに空の文字列を代入
        result.innerHTML = '';
       },
       false
      );
   },
    false
);