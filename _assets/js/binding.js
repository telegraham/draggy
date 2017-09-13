function Binding($element, set, get) {

  if ($element.is('input[type="text"]')) {
    $element.on("keyup",function(event) {
      if (event.which == 27) { //esc
        $element.val(get()); //reset value
        $element.blur(); //deselect
      }
    });
  } 
  //else if ($element.is('select')) { }


  $element.on("change", function(){
    set($element.val());
  });

}