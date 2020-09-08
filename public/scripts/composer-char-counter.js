$(document).ready(function () {
$('#tweet-text').on('keyup', function() {
  const temp = $(this).siblings()[1];
  let counter = $(temp).children()[1];
  
  const textLength =  $(this)[0].value.length;


  if (textLength > 140) {
    $(counter).addClass("red");
    //$(counter).css("color",'red');
  } else {
    $(counter).removeClass('red');
    //$(counter).css("color",'black');
  }
 
    $(counter).text(140 - textLength);
  

  //console.log(this.siblings());
  // const temp = this.siblings()[1];


  // console.log($(temp).children()[1]);
  //console.log(event.originalEvent.key);
});
});