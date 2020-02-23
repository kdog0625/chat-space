$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `
        <div class="main_mes">
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
      <div class="main_mes">
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
});