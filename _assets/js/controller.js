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

    var schemaViewModelFactory = new SchemaViewModelFactory(onChange);
    _this.schemaViewModel = schemaViewModelFactory.build(_this.schema)

    $(function(){
      this.paper = Raphael("svgWrapper", "100%", "100%");
      this.wrapper = $(".wrapper")
      _this.schemaViewModel.firstDraw(this.wrapper, this.paper);
    });

  }

}

Controller.prototype.saveSchema = function(){
  this.persistence.save(this.schema);
}



Controller.prototype.sample = function(){
  this.schema = SchemaFactory.build({
    relations: [],
    tables: [
    {
      name: "Table won",
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
      name: "Table tú",
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
  this.schema.relations = [{ primaryKeyId: this.schema.tables[0].columns[0].id, foreignKeyId: this.schema.tables[1].columns[2].id}] //gross -- this has to match relation exactly but I don't wanna import.
  this.saveSchema();
}
