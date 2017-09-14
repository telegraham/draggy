//= require binding
//= require draggable
//= require animation-helper

function TableViewModel(model, element){
  var _this = this;

  this.$element = $(element);
	this.model = model;

  var tableNameInput = this.$element.find(".tableName");
  var setFn = function(newValue){
    _this.model.name = newValue;
  };
  var getFn = function(){
    return _this.model.name;
  };
  
  this.binding = new Binding(tableNameInput, setFn, getFn);

  this.accelerationWindowMs = 10000;

  this.draggable = new Draggable({
    element: this.$element, 
    onDown: this.onDown.bind(this),
    onDrag: this.onDrag.bind(this), 
    onDrop: this.onDrop.bind(this),
    handle: ".js--moveHandle"
  });

  //this.accelerationHelper = new AccelerationHelper();
  this.animationHelper = new AnimationHelper(this.animationCalc.bind(this), 
                                              this.animationRender.bind(this));
}
TableViewModel.prototype.onDown = function(downX, downY){
  //this.accelerationHelper.resetPositions();
  //this.accelerationHelper.recordPosition(0, 0);

  this.deltaX = 0;
  this.deltaY = 0;

  this.animationHelper.start();
  this.notifyColumnsDragStart();
}
TableViewModel.prototype.onDrag = function(deltaX, deltaY){
  //this.accelerationHelper.recordPosition(deltaX, deltaY);
  //this.accelerationHelper.cleanUpPositions(this.accelerationWindowMs);

  this.deltaX = deltaX;
  this.deltaY = deltaY;

  this.animationHelper.nudge();
  this.notifyColumnsDrag();
}
TableViewModel.prototype.notifyColumnsDragStart = function(){
  this.columns.forEach(function(column){
    column.notifyDragStart();
  })
}
TableViewModel.prototype.notifyColumnsDrag = function(){
  this.columns.forEach(function(column){
    column.notifyDrag();
  })
}
TableViewModel.prototype.onDrop = function(deltaX, deltaY){
  this.model.move(deltaX, deltaY);

  this.deltaX = 0;
  this.deltaY = 0;
  
  this.$element.css({
    top: this.model.top(),
    left: this.model.left()
  });
  //this.accelerationHelper.resetPositions();
}
TableViewModel.prototype.animationCalc = function(){
  //var acceleration = this.accelerationHelper.calculateAcceleration(this.accelerationWindowMs);

  return { "transform": "translate3d(" + this.deltaX +  "px, " + this.deltaY + "px, 0px) " 
     //+ "skewX(" + acceleration.x * -200000 + "deg)" 
     //+ " scaleY(" + (1 + acceleration.y * -2000) + ")" 
   };
}
TableViewModel.prototype.animationRender = function(css){
  this.$element.css(css);
}
TableViewModel.htmlId = function(modelId) {
  return "table--" + modelId;
}
TableViewModel.toHtml = function(model){
  //todo
  var cols = model.columns.map(function(col){
    return ColumnViewModel.toHtml(col);
  })

  var table = $("<div>");
  table.attr("id", TableViewModel.htmlId(model.id));
  table.attr("class", "table");
  table.css({
    top: model._top,
    left: model._left
  })

  table.append("<h3 class='js--moveHandle'><input type='text' class='tableName' value='" + model.name + "'></input></h3>")

  var ol = $("<ol>");
  cols.forEach(function(col){
    ol.append(col);
  })
  table.append(ol);

  return table;
}