$(document).ready(function(){
  var $deck = $('.deck');
  $deck.html('');

  var $feed = $('<div></div>');
  $feed.appendTo($deck);

  var $subDeck = $('.user_tweets');
  $subDeck.html('');  

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
      $tweetTime.text('[' + postedAt + ']');
      $tweetTime.appendTo($tweet);      

      $user = $('<a></a>');
      $user.attr({'href': '#', 'data-user': tweet.user, 'class': 'username'});
      $user.text('<' + tweet.user + '>');
      $user.appendTo($tweet);

      $tweet.append('  ' + tweet.message);

      $tweet.appendTo($feed);
    }

    $('.username').on('click', function (e) {
      e.preventDefault();
      autoUpdate.pause();
      displayTweets($(this).data('user'));
      $('h2').text('@' + $(this).data('user')).show();
    });

    $('.refreshLink').on('click', function (e) {
      e.preventDefault();
      //autoUpdate = setInterval(displayTweets, 500, 'all');
      autoUpdate.resume();
      $('h2').text('').hide();
      //displayTweets('all');
    });
  }

// Interval timer from stackOverflow
// http://stackoverflow.com/questions/24724852/pause-and-resume-setinterval
  function InvervalTimer(callback, interval) {
        var timerId, startTime, remaining = 0;
        var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

        this.pause = function () {
            if (state != 1) return;

            remaining = interval - (new Date() - startTime);
            window.clearInterval(timerId);
            state = 2;
        };

        this.resume = function () {
            if (state != 2) return;

            state = 3;
            window.setTimeout(this.timeoutCallback, remaining);
        };

        this.timeoutCallback = function () {
            if (state != 3) return;

            callback();

            startTime = new Date();
            timerId = window.setInterval(callback, interval);
            state = 1;
        };

        startTime = new Date();
        timerId = window.setInterval(callback, interval);
        state = 1;
  }

    var autoUpdate = new InvervalTimer(function () {
        displayTweets('all');
    }, 500);
     
});