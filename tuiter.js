$(document).ready(function(){
  var $deck = $('.deck');
  $deck.html('');

  var $feed = $('<div></div>');
  $feed.appendTo($deck);

  function displayTweets(context){
    var postedAt;
    var $user;
    var $tweetTime;

    $feed.html('');

    if (context === 'all') {
      source = streams.home;
    } else if (context) {
      source = streams.users[context];
    }

    var index = source.length - 1;
    for (index; index >= 0; index--){
      var tweet = source[index];
      var $tweet = $('<div></div>');
      
      postedAt = moment(tweet.created_at).format('HH:mm:ss');
      $tweetTime = $('<span></span>');
      $tweetTime.addClass('timestamp');
      $tweetTime.text('[' + postedAt + ']  ');
      $tweetTime.appendTo($tweet);      

      $user = $('<a></a>');
      $user.attr({'href': '#', 'data-user': tweet.user, 'class': 'username'});
      $user.text('<' + tweet.user + '>');
      $user.appendTo($tweet);

      $tweet.append(': ' + tweet.message);

      $tweet.appendTo($feed);
    }

    $('.username').on('click', function (e) {
      e.preventDefault();
      displayTweets($(this).data('user'));
    });
  }
    
  setInterval(displayTweets, 1000, 'all'); 
});