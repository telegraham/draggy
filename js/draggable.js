function Draggable(attrs) {
  this.$element = attrs["element"];
  this.downCallback = attrs["onDown"] || function(){ };
  this.dragCallback = attrs["onDrag"] || function(){ };
  this.dropCallback = attrs["onDrop"] || function(){ };
  this.handleSelector = attrs["handle"];

  this.$document = $(document);

  this.$element.on("mousedown", this.handleSelector, this.down.bind(this));
}
Draggable.computeDeltas = function($mouseDownEvent, $mouseNowEvent){
  var startX = $mouseDownEvent.clientX;
  var startY = $mouseDownEvent.clientY;

  var currentX = $mouseNowEvent.clientX;
  var currentY = $mouseNowEvent.clientY;

  //console.log(startX, startY, currentX, currentY);

  return [currentX - startX, currentY - startY];
}
Draggable.prototype.down = function($mouseDownEvent){
  this.$document.on("mousemove.tabledrag", this.drag.bind(this))
                .one("mouseup", this.drop.bind(this));
  this.downCallback($mouseDownEvent.clientX, $mouseDownEvent.clientY);
  this.$mouseDownEvent = $mouseDownEvent;
}
Draggable.prototype.drag = function($mouseMoveEvent){
  var deltas = Draggable.computeDeltas(this.$mouseDownEvent, $mouseMoveEvent)
  this.dragCallback.apply(null, deltas)
}
Draggable.prototype.drop = function($mouseUpEvent){
  $(document).off(".tabledrag")
  var deltas = Draggable.computeDeltas(this.$mouseDownEvent, $mouseUpEvent)
  this.dropCallback.apply(null, deltas);
}