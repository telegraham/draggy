function TableController(){
	var _this = this;
	_this.tables = rehydrateTables() || [];

	//it puts the html on the screen

	//instantiate view model objects


	saveTables(_this.tables);
			
//	_this.$element.on("mousedown", ".js--moveHandle", _this.mouseDown)
}
TableController.prototype.rehydrateTables = function(){
	return localStorage.tables ? JSON.parse(localStorage.tables) : null;
}
TableController.prototype.saveTables = function(tables){
	localStorage.tables = JSON.stringify(tables);
}

/*TableController.prototype.mouseDown = function($mouseDownEvent){
	$(document).on("mousemove.tabledrag", function($mouseMoveEvent){
		_this.drag($mouseDownEvent, $mouseMoveEvent)
	}).on("mouseup", function($mouseUpEvent){
		_this.move
		$(document).off(".tabledrag")
	})
}
TableController.prototype.move = function($mouseDownEvent, $mouseUpEvent){
	var startX = $mouseDownEvent.clientX;
	var startY = $mouseDownEvent.clientY;

	var currentX = $mouseDownEvent.clientX;
	var currentY = $mouseDownEvent.clientY;

	_this.table.move(e)
}*/