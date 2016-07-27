$(document).ready(function() {

var food = "",
    snake = ['_0_2', '_0_1', '_0_0'],
    dir =  4;
    score = 0,
    highScore = 0,
    game = 'new';


    localStorage.setItem('highScore', highScore);
    localStorage.getItem('highScore');
function setHighScore() {
  if (localStorage.getItem('highScore') < score) {
    highScore = score
    localStorage.setItem('highScore', highScore);
  }
}

function myScore() {
  $(".score").text(score);
  $(".high-score").text(highScore);
}


  function initiateGameWindow() {
    var gameWindow = $('.game-window');
    gameWindow.html("");
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        gameWindow.append("<div class=cell-square id=cell_" + i + "_" + j +"></div>");
      }
    }
    $("#cell_0_0, #cell_0_1, #cell_0_2").addClass("snake");
    randomFood();
  }
  initiateGameWindow();

  //generates random food
  function randomFood() {
    var row = Math.round(Math.random()*19);
    var col = Math.round(Math.random()*19);
    var foodCell = $('#cell_'+row+'_'+col);
        if (!foodCell.hasClass('snake')) {
          foodCell.addClass("food");
          food='_'+row+'_'+col;
        }
        else randomFood();
  }

  function update() {
      //removes tail
      var tail = snake.pop();
      $('#cell'+tail).removeClass('snake');
      //add head block
      var head = snake[0];
      var rowCol = head.split('_');
      var sRow = Number(rowCol[1]);
      var sCol = Number(rowCol[2]);
      switch(dir){
        case 1: sRow++;  // down
        break;
        case 2: sCol--; // left
        break;
        case 3: sRow--; // up
        break;
        case 4: sCol++; // right
        break;
      }
      var newHead = '_'+sRow+'_'+sCol;

      // when head touches food, add a cell.
     if(newHead === food) {
       snake.push(tail);
       $('#cell'+food).removeClass("food");
       score += 1;
       setHighScore();
       randomFood();
     }
      snake.unshift(newHead);

      // end game if snake hits the border OR hits itself
    if (sCol<0 || sRow<0 || sCol>19 || sRow>19 ||  $('#cell'+newHead).hasClass('snake') ){
      snake.push(tail);
      $('#cell'+tail).addClass("snake");
      $('#cell'+snake[1]).addClass("dead-snake");
      game = 'gameOver';
      function gameOver() {
        alert("You lose!");
      }
      setHighScore();
      gameOver();
      return;
    }
    else {
      $('#cell'+newHead).addClass('snake');
    }

    myScore();

    game = 'inProgress';
      setTimeout(function() {
        update();
      }, 150);
  }


  //logic for directions
  $(document).on('keyup', function(e) {
    if(e.keyCode === 40 && dir !== 3) {
      dir = 1;
    }
    if(e.keyCode === 37 && dir !== 4) {
      dir = 2;
    }
    if(e.keyCode === 38 && dir !== 1) {
      dir = 3;
    }
    if(e.keyCode === 39 && dir !== 2) {
      dir = 4;
    }
    //start game with 'Enter'
    if (e.keyCode === 13 && game === 'new') {
      update();

    }
    //restart game with 'enter'
    if(e.keyCode === (13 || 40 || 37 || 38 || 39) && game === 'gameOver') {
      snake = ["_0_2", "_0_1", "_0_0"];
      food = "";
      dir = 4;
      score = 0;
      game = 'new';
      initiateGameWindow();
      update();
    }
  });

    //Start or restart game with click
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
});
