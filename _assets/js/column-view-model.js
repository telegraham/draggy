//= require binding

function ColumnViewModel(model, element){
  var _this = this;

  this.$element = $(element);
	this.model = model;

  this.relations = [];

  this.id = model.id; //for the view model factory

  //manual binding
  this.$element.find(".key").on("click", this.toggleKeyType.bind(this));

  //fancy
  this.bindings = [
      {
        selector: ".name",
        propName: "name"
      },
      {
        selector: ".dataType",
        propName: "dataType"
      }
  ].map(function(mapping){
    var element = _this.$element.find(mapping.selector);

    var setFn = function(newValue){
      _this.model[mapping.propName] = newValue;
    };
    var getFn = function(){ return _this.model[mapping.propName]; }

    return new Binding(element, setFn, getFn);
  })

}
ColumnViewModel.prototype.relationTargetCoordinates = function(){
  var offs = this.$element.offset();
  var height = this.$element.outerHeight();
  return {
    x: offs.left,
    y: offs.top + height / 2
  };
}
ColumnViewModel.prototype.toggleKeyType = function() {
  this.model.key = Column.nextKeyType(this.model.key);
  this.$element.removeClass(Column.KEY_TYPES.join(" "))
  this.$element.addClass(this.model.key);
}
ColumnViewModel.prototype.notifyDrag = function(){
  this.relations.forEach(function(relation){
    relation.notifyDrag();
  });
}
ColumnViewModel.prototype.notifyDragStart = function(){
  this.relations.forEach(function(relation){
    relation.notifyDragStart();
  });
}
ColumnViewModel.htmlId = function(modelId){
  return "column--" + modelId;
}
ColumnViewModel.toHtml = function(model){
  var li = $("<li>");
  li.addClass(model.key);
  li.attr("id", ColumnViewModel.htmlId(model.id));
  li.append("<span class='key'></span>")
  li.append("<input class='name' type='text' value='" + model.name + "'></input>")
  var select = $("<select class='dataType'>");
  ["string", "int", "bit"].forEach(function(dt){
    select.append("<option value='" + dt + "'>" + dt + "</option>");
  });
  li.append(select);
  li.append("<span class='sort'></span>")
  return li;
}