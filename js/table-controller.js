function TableController(){
	var _this = this;
	_this.tables = _this.rehydrateTables(_this.retrieveTableData() || []);

$(function(){

	var $wrapper = $(".wrapper")
	//instantiate view model objects
	_this.tableViewModels = _this.tables.map(function (item) {
		$table = $(TableViewModel.toHtml(item)).appendTo($wrapper);
		return new TableViewModel(item, $table);		
	})

})
	//todo
	
	//saveTableData(_this.tables);
			
//	_this.$element.on("mousedown", ".js--moveHandle", _this.mouseDown)
}
TableController.prototype.retrieveTableData = function(){
	return localStorage.tables ? JSON.parse(localStorage.tables) : null;
}
TableController.prototype.saveTableData = function(tables){
	localStorage.tables = JSON.stringify(tables);
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