var h = function(str) {
    // h関数の実処理を定義
    if (str !== null) {
      // 引数strが空でない場合の処理
      str = str.toString();
      str = str.replace(/&/g, '&amp;');
      str = str.replace(/</g, '&lt;');
      str = str.replace(/>/g, '&gt;');
    } else {
      // 引数strが空である場合の処理
      str = '';
    }
    return str;
  };
  
  var printf = function(format) {
    // printf関数の実処理を定義
    for (var i = 1; i < arguments.length; i++) {
      var pattern = new RegExp('\\{' + (i - 1) + '\\}', 'g');
      format = format.replace(pattern, h(arguments[i]));
    }
    return format;
  };