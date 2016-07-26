$(document).ready(function() {
  function initiateGameWindow() {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        $('.game-window').append("<div class=cell-square id=cell_" + i + "-" + j +"</div>");
      }
    }
    $("#cell_0-0").addClass('snake');
  }
  initiateGameWindow();

});
