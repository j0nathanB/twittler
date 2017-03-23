$(document).ready(function(){
  var $deck = $('.deck');
  $deck.html('');

  var index = streams.home.length - 1;
  for (index; index >= 0; index--){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    var postedAt = tweet.created_at.toLocaleTimeString();
    
    $tweet.text('[' + postedAt + ']' +'@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($deck);
  }
        
});