function TableViewModel(element, model){
	var _this = this;
  _this.$element = $(element);
	_this.model = model;
}
TableViewModel.prototype.bindMoveHandleMouseDown = function (handler) {
  this.$element.on("mousedown", ".js--moveHandle", _this.mouseDown)
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

  table.append("<h3>" + model.name + "</h3>")

  var ol = $("<ol>");
  cols.forEach(function(col){
    ol.append(col);
  })
  table.append(ol);

  return table;
}