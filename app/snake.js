$(document).ready(function() {

    var food = "",
        snake = ['_0_2', '_0_1', '_0_0'],
        dir =  4,
        score = 0,
        game = 'new',
        flag = false;

    var snakeGameWindow = $('.snake-game-window');

    var snakeHighScore = localStorage.getItem('snakeHighScore') || 0;
    localStorage.setItem('snakeHighScore', snakeHighScore);

    function setHighScore() {
      if (localStorage.getItem('snakeHighScore') < score) {
        snakeHighScore = score
        localStorage.setItem('snakeHighScore', snakeHighScore);
      }
    }
    setHighScore();

    function myScore() {
      $(".snake-local-score").text(score);
      $(".snake-high-score").text(snakeHighScore);
    }


  function initiateGameWindow() {
    snakeGameWindow.html("");
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        snakeGameWindow.append("<div class=snake-cell-square id=snake-cell_" + i + "_" + j +"></div>");
      }
    }
    $("#snake-cell_0_0, #snake-cell_0_1, #snake-cell_0_2").addClass("snake");
    randomFood();
    snakeGameWindow.focus();
  }
  initiateGameWindow();

  //generates random food
  function randomFood() {
    var row = Math.round(Math.random()*19);
    var col = Math.round(Math.random()*19);
    var foodCell = $('#snake-cell_'+row+'_'+col);
        if (!foodCell.hasClass('snake')) {
          foodCell.addClass("snake-food");
          food='_'+row+'_'+col;
        }
        else randomFood();
  }

  function update() {
      //removes tail
      var tail = snake.pop();
      $('#snake-cell'+tail).removeClass('snake');
      //add head block
      var head = snake[0];
      var rowCol = head.split('_');
      var sRow = parseInt(rowCol[1], 10);
      var sCol = parseInt(rowCol[2], 10);
      switch(dir){
        case 1: sRow += 1;  // down
        break;
        case 2: sCol -= 1; // left
        break;
        case 3: sRow -= 1; // up
        break;
        case 4: sCol += 1; // right
        break;
      }
      flag = false;
      var newHead = '_'+sRow+'_'+sCol;

      // when head touches food, add a cell.
     if(newHead === food) {
       snake.push(tail);
       $('#snake-cell'+food).removeClass("snake-food");
       score += 1;
       setHighScore();
       randomFood();
     }
      snake.unshift(newHead);

      // end game if snake hits the border OR hits itself
    if (sCol<0 || sRow<0 || sCol>19 || sRow>19 ||  $('#snake-cell'+newHead).hasClass('snake') ){
      snake.push(tail);
      $('#snake-cell'+tail).addClass("snake");
      $('#snake-cell'+snake[1]).addClass("dead-snake");
      game = 'gameOver';
      function gameOver() {
        alert("You lose!");
      }
      setHighScore();
      gameOver();
      return;
    }
    else {
      $('#snake-cell'+newHead).addClass('snake');
    }

    myScore();

    game = 'inProgress';
      setTimeout(function() {
        update();
    }, 100);
  }


  //logic for directions
  $(document).on('keydown', function(e) {
      if (!flag) {
          if(e.keyCode === 40 && dir !== 3) {
            dir = 1; // down
            flag = true;
          }
          if(e.keyCode === 37 && dir !== 4) {
            dir = 2; // left
            flag = true;
          }
          if(e.keyCode === 38 && dir !== 1) {
            dir = 3; // up
            flag = true;
          }
          if(e.keyCode === 39 && dir !== 2) {
            dir = 4; // right
            flag = true;
          }
      }
    //start game with 'Enter'
    if (e.keyCode === 13 && game === 'new') {
      update();
    }
    // restart game with 'enter'
    if(e.keyCode === 13 && game === 'gameOver') {
      snake = ["_0_2", "_0_1", "_0_0"];
      food = "";
      dir = 4;
      score = 0;
      game = 'new';
      initiateGameWindow();
      update();
    }
  });

    // Start or restart game with click
    $(document).click(function (e) {
      if(game === 'gameOver') {
        snake = ["_0_2", "_0_1", "_0_0"];
        food = "";
        dir = 4;
        score = 0;
        game = 'new';
        initiateGameWindow();
        update();
        myScore();
      }
      if (game === 'new') {
        update();
      }
    });

    // handle mobile swipes
    var touchstartX = 0;
    var touchstartY = 0;
    var touchendX = 0;
    var touchendY = 0;
    var swipeDistance = 150;

    window.addEventListener('touchstart', function(e) {
        var event = e.targetTouches[0];
        touchstartX = event.screenX;
        touchstartY = event.screenY;
    }, false);

    window.addEventListener('touchend', function(e) {
        e.preventDefault();
        var event = e.changedTouches[0];
        touchendX = event.screenX;
        touchendY = event.screenY;
        handleGesure();
    }, false);

    function handleGesure() {
        if (touchendX + swipeDistance < touchstartX && dir !== 4 && !flag) {
            dir = 2; // left
            flag = true;
        }
        if (touchstartX + swipeDistance < touchendX && dir !== 2 && !flag) {
            dir = 4; // right
            flag = true;
        }
        if (touchendY + swipeDistance < touchstartY  && dir !== 1 && !flag) {
            dir = 3; // up
            flag = true;
        }
        if (touchstartY + swipeDistance < touchendY  && dir !== 3 && !flag) {
            dir = 1; // down
            flag = true;
        }
        if (touchendY === touchstartY && game === 'new') { // start game with a tap
            update();
        }
    }
});
