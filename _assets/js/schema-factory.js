//= require table
//= require column
//= require relation
//= require schema

function SchemaFactory(){

}
SchemaFactory.build = function(schemaData) {
  var tableModels = SchemaFactory.rehydrateTables(schemaData.tables);
  var relationModels = SchemaFactory.rehydrateRelations(schemaData.relations, tableModels);

  return new Schema(tableModels, relationModels);
}


SchemaFactory.rehydrateTables = function(tableData){
  return tableData.map(function(table){
    var columns = table.columns.map(function(column){
      return new Column(column);
    })
    return new Table(table, columns);
  })
}
SchemaFactory.rehydrateRelations = function(relationData){
  return relationData.map(function(relation){
    return new Relation(relation)
  })
}
