$(document).ready(function(){
  var $deck = $('.deck');
  $deck.html('');

  var $feed = $('<div></div>');
  $feed.appendTo($deck);

  function displayTweets(context){
    $feed.html('');

    if (context === 'all') {
      source = streams.home; // {streams} comes from data_generator.js
    } else if (context) {
      source = streams.users[context];
    }

    var index = source.length - 1;
    for (index; index >= 0; index--){
      var tweet = source[index];
      var $tweet = $('<div></div>');
      var postedAt = moment(tweet.created_at).format('HH:mm:ss');
      var $user = $('<a></a>');

      $user.attr({'href': '#', 'data-user': tweet.user, 'class': 'username'});
      $user.text('<' + tweet.user + '>');
      $user.appendTo($tweet);

      $tweet.text('[' + postedAt + ']  ' +'<' + tweet.user + '>  ' + tweet.message);
      $tweet.appendTo($feed);
    }

    $('.username').on('click', function (e) {
      e.preventDefault();
      printTweets($(this).data('user'));
    });
  }
    
  setInterval(displayTweets, 1000, 'all'); 
});