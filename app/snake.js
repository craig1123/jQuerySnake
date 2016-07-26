$(document).ready(function() {

var food,
    snake = [];


  function initiateGameWindow() {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        $('.game-window').append("<div class=cell-square id=cell_" + i + "-" + j +"></div>");
      }
    }
    $("#cell_0-0, #cell_0-1, #cell_0-2").addClass("snake");
    randomFood()
  }

  function randomFood() {
    var row = Math.round(Math.random()*19);
    var col = Math.round(Math.random()*19);
    $("#cell_"+row+"-"+col).addClass("food");
    food = "_"+row+"-"+col;
  }


  initiateGameWindow();

});
