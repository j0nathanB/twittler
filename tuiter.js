$(document).ready(function(){
  var $deck = $('.deck');
  $deck.html('');

  var $feed = $('<div></div>');
  $feed.appendTo($deck);

  function displayTweets(){
    $feed.html('');

    var index = streams.home.length - 1;
    for (index; index >= 0; index--){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      var postedAt = moment(tweet.created_at).format('HH:mm:ss');
      
      $tweet.text('[' + postedAt + ']  ' +'<' + tweet.user + '>  ' + tweet.message);
      $tweet.appendTo($feed);
    }
  }
    
  setInterval(displayTweets, 1000); 
});