$(document).ready(function() {

var food = "",
    snake = ['_0_2', '_0_1', '_0_0'],
    dir =  4;


  function initiateGameWindow() {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        $('.game-window').append("<div class=cell-square id=cell_" + i + "_" + j +"></div>");
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
       randomFood();
     }
      snake.unshift(newHead);

      // end game if snake hits the border OR hits itself
    if (sCol<0 || sRow<0 || sCol>19 || sRow>19 ||  $('#cell'+newHead).hasClass('snake') ){
      console.log('You lost!');
      snake.push(tail);
      $('#cell'+tail).addClass("snake");
      $('#cell'+snake[1]).addClass("dead-snake");

      return;
    }
    else {
      $('#cell'+newHead).addClass('snake');
    }
      setTimeout(update, 200);
  }
  update();

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
  });
});
