//= require schema-factory
//= require schema-view-model-factory
//= require randy

//todo remove randy from this

function Controller(persistence, schemaFactory){
  var _this = this;

  this.persistence = persistence;

  var storedSchema = this.persistence.retrieve();

  if (storedSchema) {
    this.schema = SchemaFactory.build(storedSchema)

    var onChange = this.saveSchema.bind(this);

    $(function(){ //this, when combined with the containing if, will break adding a table big time
      var paper = Raphael("svgWrapper", "100%", "100%");
      var schemaViewModelFactory = new SchemaViewModelFactory(onChange, paper);
      _this.schemaViewModel = schemaViewModelFactory.build(_this.schema)
      _this.schemaViewModel.firstDraw($(".wrapper"));
    });
    
  }
  
}

Controller.prototype.saveSchema = function(){
  this.persistence.save(this.schema);
}



Controller.prototype.sample = function(){
  this.schema = SchemaFactory.build({ tables: [
    {
      name: "Table Title",
      _left: 200,
      _top: 200,
      columns: [
        {
          key: "pk",
          name: "id"
        },
        {
          name: "name"
        },
        {
          key: "fk",
          name: "foreign_id"
        },
        {
          name: "other"
        },
        {
          name: "thing"
        }
      ],
    },
    {
      name: "Other table",
      _left: 10,
      _top: 20,
      columns: [
        {
          key: "pk",
          name: "id"
        },
        {
          name: "name"
        },
        {
          key: "fk",
          name: "foreign_id"
        },
        {
          name: "other"
        },
        {
          name: "thing"
        }
      ]
    }
  ]});
  this.schema.tables.forEach(function(table){
    table.id = table.id || Randy.generate();
    table.columns.forEach(function(column){
      column.id = column.id || Randy.generate();
    })
  })
  this.schema.relations = [{ primaryKeyId: this.schema.tables[0].columns[0], foreignKeyId: this.schema.tables[1].columns[2]}] //gross -- this has to match relation exactly but I don't wanna import.
  this.saveSchema();
}
