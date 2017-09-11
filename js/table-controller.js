function TableController(){
	var _this = this;
	_this.tables = _this.rehydrateTables(_this.retrieveTableData() || []);

	var tableProxies = _this.tables.map(function(tableModel){
		return TableController.trackChange(tableModel, _this.saveTableData.bind(_this));
	});

	$(function(){

		var $wrapper = $(".wrapper")

		//instantiate view model objects
		_this.tableViewModels = tableProxies.map(function(tableProxy) {
			var $table = $(TableViewModel.toHtml(tableProxy));
			return new TableViewModel(tableProxy, $table);		
		})

		_this.tableViewModels.forEach(function(tableViewModel){

			//stick tables in the DOM
			tableViewModel.$element.appendTo($wrapper);

			//now columns
			var columnProxies = tableViewModel.model.columns.map(function(columnModel){
				return TableController.trackChange(columnModel, _this.saveTableData.bind(_this));
			});

			columnProxies.map(function(columnModelProxy){
			    var $column = tableViewModel.$element.find("#" + ColumnViewModel.htmlId(columnModelProxy.id));
			    return new ColumnViewModel(columnModelProxy, $column)
		   	});

		})

	})
	//todo
	
	//saveTableData(_this.tables);
			
//	_this.$element.on("mousedown", ".js--moveHandle", _this.mouseDown)
}

TableController.trackChange = function(obj, onChange) {
    const handler = {
        set (obj, prop, value) {
            const oldVal = obj[prop];
            Reflect.set(obj, prop, value);
            onChange(obj, prop, oldVal, value);
        },
        deleteProperty (obj, prop) {
            const oldVal = obj[prop];
            Reflect.deleteProperty(obj, prop);
            onChange(obj, prop, oldVal, undefined);
        }
    };
    return new Proxy(obj, handler);
}
// TableController.prototype.onChange =  function (obj, prop, oldVal, newVal) {
// 	console.log(`myObj.${prop} changed from ${oldVal} to ${newVal}`);
// };


TableController.prototype.retrieveTableData = function(){
	return localStorage.tables ? JSON.parse(localStorage.tables) : null;
}
TableController.prototype.saveTableData = function(){
	localStorage.tables = JSON.stringify(this.tables);
}
TableController.prototype.rehydrateTables = function(tableData){
	return tableData.map(function(table){
		var columns = table.columns.map(function(column){
			return new Column(column);
		})
		return new Table(table, columns);
	})
}

TableController.prototype.sample = function(){
	this.tables = this.rehydrateTables([
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
			]
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
	]);
	this.tables.forEach(function(table){
		table.id = table.id || Randy.generate();
		table.columns.forEach(function(column){
			column.id = column.id || Randy.generate();
		})
	})
	this.saveTableData(this.tables)
}


tc = new TableController();