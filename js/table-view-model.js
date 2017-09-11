function TableViewModel(model, element){
  this.$element = $(element);
	this.model = model;

  this.accelerationWindowMs = 10000;

  this.draggable = new Draggable({
    element: this.$element, 
    onDown: this.onDown.bind(this),
    onDrag: this.onDrag.bind(this), 
    onDrop: this.onDrop.bind(this),
    handle: ".js--moveHandle"
  });

  this.accelerationHelper = new AccelerationHelper();
  this.animationHelper = new AnimationHelper(this.animationCalc.bind(this), 
                                              this.animationRender.bind(this));
}
TableViewModel.prototype.onDown = function(downX, downY){
  this.accelerationHelper.resetPositions();
  this.accelerationHelper.recordPosition(0, 0);

  this.deltaX = 0;
  this.deltaY = 0;

  this.animationHelper.start();
}
TableViewModel.prototype.onDrag = function(deltaX, deltaY){
  this.accelerationHelper.recordPosition(deltaX, deltaY);
  this.accelerationHelper.cleanUpPositions(this.accelerationWindowMs);

  this.deltaX = deltaX;
  this.deltaY = deltaY;

  this.animationHelper.nudge();
}
TableViewModel.prototype.onDrop = function(deltaX, deltaY){
  this.model.move(deltaX, deltaY);

  this.deltaX = 0;
  this.deltaY = 0;
  
  this.$element.css({
    top: this.model.top(),
    left: this.model.left()
  });
  this.accelerationHelper.resetPositions();
}
TableViewModel.prototype.animationCalc = function(){
  var acceleration = this.accelerationHelper.calculateAcceleration(this.accelerationWindowMs);

  return { "transform": "translate3d(" + this.deltaX +  "px, " + this.deltaY + "px, 0px) " 
     + "skewX(" + acceleration.x * -200000 + "deg)" 
     + " scaleY(" + (1 + acceleration.y * -2000) + ")" };
}
TableViewModel.prototype.animationRender = function(css){
  this.$element.css(css);
}
TableViewModel.toHtml = function(model){
  //todo
  var cols = model.columns.map(function(item){
    var li = $("<li>");
    li.attr("class", item.key);
    li.append("<span class='key'></span>")
    li.append("<span class='name' contentEditable='true'>" + item.name + "</span>")
    var select = $("<select class='dataType'>");
    ["string", "int", "bit"].forEach(function(dt){
      select.append("<option value='" + dt + "'>" + dt + "</option>");
    });
    li.append(select);
    li.append("<span class='sort'></span>")
    return li;
  })

  var table = $("<div>");
  table.attr("class", "table");
  table.css({
    top: model._top,
    left: model._left
  })

  table.append("<h3 class='js--moveHandle'>" + model.name + "</h3>")

  var ol = $("<ol>");
  cols.forEach(function(col){
    ol.append(col);
  })
  table.append(ol);

  return table;
}