function ColumnViewModel(model, element){
  this.$element = $(element);
	this.model = model;

  this.$element.find(".key").on("click", this.toggleKeyType.bind(this));

}
ColumnViewModel.prototype.toggleKeyType = function() {
  this.model.key = Column.nextKeyType(this.model.key);
  this.$element.removeClass(Column.KEY_TYPES.join(" "))
  this.$element.addClass(this.model.key);
}
ColumnViewModel.htmlId = function(modelId){
  return "column--" + modelId;
}
ColumnViewModel.toHtml = function(model){
  var li = $("<li>");
  li.addClass(model.key);
  li.attr("id", ColumnViewModel.htmlId(model.id));
  li.append("<span class='key'></span>")
  li.append("<span class='name' contentEditable='true'>" + model.name + "</span>")
  var select = $("<select class='dataType'>");
  ["string", "int", "bit"].forEach(function(dt){
    select.append("<option value='" + dt + "'>" + dt + "</option>");
  });
  li.append(select);
  li.append("<span class='sort'></span>")
  return li;
}