/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (const t of tweets) {
    let attachedTweet = createTweetElement(t);
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
          <p class="tweet-text">${tweet.content.text}</p>
          <footer>${tweet.created_at}</footer>
        </article>
  ` ;

  return $tweet;
}

$(document).ready(function(){

//Fetch the tweets using ajax
  const loadTweets = function (){
   $.ajax('/tweets/',{method: 'GET', dataType: 'JSON'}).then( function(response){

    renderTweets(response)
   } 
   );
  }

  loadTweets();


  //Form submission handeling
  $(".tweet-form").on('submit', function(evt) {
    evt.preventDefault();
    console.log($('#tweet-text').serialize());
    $.ajax('/tweets/', {method: 'POST', data: $('#tweet-text').serialize()} ).then(
    
    )
  });
} ) ;


