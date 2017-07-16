function TableViewModel(model, element){
	var _this = this;
  _this.$element = $(element);
	_this.model = model;

  this.$element.on("mousedown", ".js--moveHandle", function(e){
    _this.mouseDown.call(_this, e);
  })
}

TableViewModel.prototype.mouseDown = function(mde){
  var _this = this;
  $(document).on("mousemove.tabledrag", function(mme){
    _this.drag.call(_this, mde, mme)
  }).on("mouseup.tabledrag", function(mue){
    $(document).off(".tabledrag")
    _this.move.call(_this, mde, mue);
  })
}
TableViewModel.prototype.computeDeltas = function($mouseDownEvent, $mouseUpEvent){
  var startX = $mouseDownEvent.clientX;
  var startY = $mouseDownEvent.clientY;

  var currentX = $mouseUpEvent.clientX;
  var currentY = $mouseUpEvent.clientY;

  //console.log(startX, startY, currentX, currentY);

  return [currentX - startX, currentY - startY];
}

TableViewModel.prototype.drag = function($mouseDownEvent, $mouseMoveEvent){
  var deltas = this.computeDeltas($mouseDownEvent, $mouseMoveEvent)
  //console.log(deltas.join(" "))
  this.$element.css("transform", "translate3d(" + deltas.join("px, ") +  "px, 0px) skewX(-10deg)")
}
TableViewModel.prototype.move = function($mouseDownEvent, $mouseUpEvent){
  var deltas = this.computeDeltas($mouseDownEvent, $mouseUpEvent)
  this.model.move(deltas[0], deltas[1]);
  this.$element.css({
    "transform": "",
    top: this.model.top(),
    left: this.model.left()
  });
}

TableViewModel.toHtml = function(model){
  //todo
  var cols = model.columns.map(function(item){
    var li = $("<li>");
    li.attr("class", item.key);
    li.append("<span class='key'></span>")
    li.append("<span class='name'>" + item.name + "</span>")
    li.append("<span class='edit'></span>")
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