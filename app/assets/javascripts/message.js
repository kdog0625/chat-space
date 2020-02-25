$(function(){
  var reloadMessages = function() {
    var last_message_id = $('.main_mes:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main_message').append(insertHTML);
        $('.main_message').animate({ scrollTop: $('.main_message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `
        <div class="main_mes" data-message-id=${message.id}>
          <div class="main_messa">
            <div class="message_info_talk">
              ${message.user_name}
            </div>
            <div class="message_info_date">
              ${message.created_at}
            </div>
          </div>
          <div class="message_text">
            <p class="message_text_content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `
      <div class="main_mes" data-message-id=${message.id}>
          <div class="main_messa">
            <div class="message_info_talk">
              ${message.user_name}
            </div>
            <div class="message_info_date">
              ${message.created_at}
            </div>
          </div>
          <div class="message_text">
            <p class="message_text_content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    // console.logを用いてイベント発火しているか確認
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_message').append(html);      
      $('.main_message').animate({ scrollTop: $('.main_message')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  })
  .always(function() {
    $('.submit-btn').prop('disabled', false); 
  });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});