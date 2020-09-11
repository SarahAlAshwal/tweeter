/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function to escap unsafe text
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (let t = tweets.length - 1 ; t >= 0; t--) {
    let attachedTweet = createTweetElement(tweets[t]);
    $('#tweet-container').append(attachedTweet);
  }
}
//displaying the tweets dynamically
const createTweetElement = function(tweet) {
  let $tweet = `
        <article class="tweet">
          <header>
            <div class= "name-photo">
              <img src=${tweet.user.avatars}></img>
             <p>${tweet.user.name}</p>
           </div>
           <p class="handler">${tweet.user.handle}</p>
          </header>
          <p class="tweet-text">${escape(tweet.content.text)}</p>
          <footer>${tweet.created_at}</footer>
        </article>
  ` ;

  return $tweet;
}

//Fetch the tweets using ajax
const loadTweets = function (){
  $.ajax('/tweets/',{method: 'GET', dataType: 'JSON'}).then( function(response){

   renderTweets(response)
  } 
  );
 }


$(document).ready(function(){
  $('#error-message').slideUp();
  loadTweets();


  //Form submission handeling
  $(".tweet-form").on('submit', function(evt) {
    evt.preventDefault();
    if(! $('#tweet-text').val()){
      $('#error-text').text("Sorry, you can't post an empty tweet");
      $('#error-message').removeClass('hidden');
      $('#error-message').slideDown();
    } else if ($('#tweet-text').val().length > 140) {
      $('#error-text').text('Sorry, your tweet is longer than 140 characters!!');
      $('#error-message').removeClass('hidden');
      $('#error-message').slideDown();
    } else {
      const input = $('#tweet-text').serialize();
      $.ajax({url: '/tweets/', method: 'POST', data: $('#tweet-text').serialize()}).then( function(){
        console.log('inside post');
        $('#tweet-text').val('');
        $('.counter').val(140);
        $('#error-message').slideUp();
        $('#error-message').css('visibility','hidden');
        $('#tweet-container').empty();
        loadTweets();

      });
    }
   
  });
} ) ;


