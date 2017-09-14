function SchemaViewModel(tableViewModels, relationViewModels){
  this.tableViewModels = tableViewModels;
  this.relationViewModels = relationViewModels;
}
SchemaViewModel.prototype.firstDraw = function($container, paper){
  this.tableViewModels.forEach(function(tableViewModel){
    //stick tables in the DOM
    tableViewModel.$element.appendTo($container);
  });
  this.relationViewModels.forEach(function(relationViewModel){
    relationViewModel.path = paper.path(relationViewModel.animationCalc());
  });
}