window.addEventListener
    ('DOMContentLoaded',
         function(){
    var w_id,gmap,c_point;
    var m_list = new google.maps.MVCArray();
    var result = document.querySelector('#result');
    var showcurrent = document.querySelector('#showcurrent');
    var stopwatch = document.querySelector('#stopwatch');
    var removemaraker = function(){
        m_list.forEach(function(marker, index){
            marker.setMap(null);
        });
    };
    var showmap = function(e){
        removemaraker();
        //(1) めもタイトルをタップした場合の処理を定義
        if(localStorage){
            var id = e.target.getAttribute('data-id');
            var list = localStorage.getItem('memolist');
            if (list != null){
                //(2)メモ情報が存在する場合の処理を定義
                list = JSON.parse(list);
                var item = list[id];
                var point = new google.maps.LatLng(
                  item.latitude, item.longitude);
                var marker = new google.maps.Marker({
                    //(3) マーカーの基本情報を定義
                    map : gmap,
                    position : point
                });
                var msg = printf('<strong>{0}</strong><br />{1}',
                   item.subject, item.memo);
                if(item.picture){
                    msg += printf(
                     '<br /><img src= "{0}" width="100" heigh="100" />',
                    item.picture);
                }
                var info = new google.maps.InfoWindow({
                    //(4) メッセージウィンドウの基本情報を定義
                    content:msg
                });
                google.maps.event.addListener(marker, 'click' ,
                    function(){
                    //(5)マーカータップ時の動作を定義
                    info.open(gmap, marker);
                });
             gmap.setCenter(point);
                m_list.push(marker);
            }
        }
    };
    var removememo = function(e){
        removemaraker();
        if(localStorage){
            //(1)メモリリストから対象のメモを削除するコート
            var id = e.target.getAttribute('data-id');
            var list = JSON.parse(localStorage.getItem('memolist'));
            list = list.filter(function(memo, c_index,ary){
                //(29)削除対象のメモ除法
                if(id !== c_index.toString()){return memo;}
            
    });
            localStorage.setItem('memolist',JSON.stringify(list));
            showmemo();
        }
    };
    var showmemo = function(){
        if(localStorage){            
            var msg = '';
            var list = localStorage.getItem('memolist');
            if(list !== null){
                //(2)ローカルストレージからmemolistを取得できた場合の処理
                list = JSON.parse(list);
                for(var i = 0; i < list.length; i++){
                    //(3)リストを表するタブを組み立て
                    msg += printf(
                    '<li><a href="#" class="show" data-id="{0}">{1}</a>'+
                    '<a class="del" href="#" data-id="{0}">X</a></li>'
                    ,i, list[i].subject);
                }
                var r_list = document.querySelector('#list');
                r_list.innerHTML = msg;
                var subjects = document.querySelectorAll('#list a.show');
                for(var i = 0; i < subjects.length; i++){
                    subjects.item(i).addEventListener(
                    'click',showmap,false);
                }
                var deletes = document.querySelectorAll('#list a.del');
                for(var i = 0; i < deletes.length; i++){
                    deletes.item(i).addEventListener(
                    'click', removememo, false);
                }
                
            }
        }else{
            window.alert('ストレージに対応しているブラウザでアクセスしてください。');
        }
    };
    showcurrent.addEventListener('click',
        function(e){
        removemaraker();
        gmap.setCenter(c_point);
    },false
  );
    if(navigator.geolocation){
        //
       navigator.geolocation.getCurrentPosition(
          function(pos){
              //2
         /*msg = '緯度' + pos.coords.latitude + '<br />' +
             　'経度'　+ pos.coords.longitude + '<br />' +
               '方角' + pos.coords.heading;
              result.innerHTML = msg ;*/
              c_point = new google.maps.LatLng(
              pos.coords.latitude,pos.coords.longitude);
              gmap = new google.maps.Map(
               result,
               {
                zoom: 14,
                   center: c_point,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                }
              );
                if(sessionStorage){
                    sessionStorage.setItem(
                    'cpos_latitude',pos.coords.latitude);
                    sessionStorage.setItem(
                    'cpos_longitude', pos.coords.longitude);
                }            
          },
           function(err){
           var msgs = [
             err.message,
               'Geolocationの利用が許可されていません。',
               '位置情報を取得できません.',
            　　'位置情報の取得中にタイムアウトしました。'
           ];
           result.innerHTML = msgs[err.code];
       },
           {
               //2
               timeout :5000,
               maximumAge : 0,
               enableHighAccuracy : true
           }
       );
    }else{
        window.alert('Geolocation API に対応しているブラウザでアクセスしてください。')
    }
    showmemo();
    //result.innerHTML = 
        //'Hello,JavaScript!!</br>J218 Hein Thu';
    
    
   }, false
);