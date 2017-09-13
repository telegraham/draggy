//= require change-tracker
//= require table-view-model
//= require column-view-model
//= require relation-view-model
//= require schema-view-model

function SchemaViewModelFactory(onChange, paper){
  this.onChange = onChange;
  this.paper = paper;
}
SchemaViewModelFactory.prototype.build = function(schema){
  
  var tableViewModels = SchemaViewModelFactory.buildTables(schema.tables, this.onChange);
  
  //now columns
  tableViewModels.forEach(function(tableViewModel){
    tableViewModel.columns = SchemaViewModelFactory.buildColumns(tableViewModel, this.onChange)
  })

  //gross
  var columnsById = tableViewModels.reduce(function(total, tableViewModel){
    return tableViewModel.columns.reduce(function(innerTotal, columnViewModel){
      innerTotal[columnViewModel.id] = columnViewModel;
      return innerTotal;
    }, total)
  }, {});

  var relationViewModels = SchemaViewModelFactory.buildRelations(schema.relations, columnsById, this.paper)

  return new SchemaViewModel(tableViewModels, relationViewModels)

}
SchemaViewModelFactory.buildTables = function(tables, onChange){
  var tableProxies = tables.map(function(tableModel){
    return ChangeTracker.trackChange(tableModel, onChange);
  });

  return tableProxies.map(function(tableProxy) {
    var $table = $(TableViewModel.toHtml(tableProxy));
    return new TableViewModel(tableProxy, $table);    
  })
}
SchemaViewModelFactory.buildColumns = function(tableViewModel, onChange) {
  var columnProxies = tableViewModel.model.columns.map(function(columnModel){
    return ChangeTracker.trackChange(columnModel, onChange);
  });

  return columnProxies.map(function(columnModelProxy){

    //TODO: ugh gross find
    var $column = tableViewModel.$element.find("#" + ColumnViewModel.htmlId(columnModelProxy.id));
    return new ColumnViewModel(columnModelProxy, $column)
  });
}
SchemaViewModelFactory.buildRelations = function(relations, columns, paper){

  var relationViewModels = relations.map(function(relation){
    //ugh
    var relationViewModel = new RelationViewModel({
      primaryKeyColumn: columns[relation.primaryKeyId],
      foreignKeyColumn: columns[relation.foreignKeyId]
    });
    relationViewModel.path = paper.path(relationViewModel.animationCalc());
    return relationViewModel;
  });

  //add relations to their columns;
  relationViewModels.forEach(function(relation){
    relation.destinationColumn.relations.push(relation)
    relation.sourceColumn.relations.push(relation)
  });

  return relationViewModels;

}