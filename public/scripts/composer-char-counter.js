$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    const temp = $(this).siblings()[1];
    let counter = $(temp).children()[1];
    
    const textLength =  $(this)[0].value.length;


    if (textLength > 140) {
      $(counter).addClass("red");
    } else {
      $(counter).removeClass('red');
    }
  
    $(counter).text(140 - textLength);
  
  });
});