function makeCurve(startX, startY, endX, endY){
  distance = Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
  bezDelt = distance / 2;
  return '<path d="M' + startX + "," + startY + " " +
    " C" + (startX - bezDelt) + "," + startY + " " + 
    (endX + bezDelt) + "," + endY + " " +
    endX + ","+ endY + '" marker-end="url(#arrow)" />';
}

$(function(){
  var startX, startY;
  var $gee = $(".gee")

  $(document).on("mousedown", ".table .fk .key, .table .pk .key", function (mde){
    startX = mde.pageX;
    startY = mde.pageY;
    $(document).on("mousemove.blat", function(mme){
      console.log(startX, startY, mme.pageX, mme.pageY);
      $gee.html(makeCurve(startX, startY, mme.pageX, mme.pageY));
    }).one("mouseup", function(){
      $(this).off(".blat")
    })
    return false;
  });

})