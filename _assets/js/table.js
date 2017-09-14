function Table(props, columns){
  this._top = props._top
  this._left = props._left
  this._width = props._width // TODO get rid of this and put it in the view model

  this.id = props.id;
  this.name = props.name;

  this.columns = columns;
}
Table.prototype.top = function(param){
	if (param) this._top = param;
	return this._top
}
Table.prototype.left = function(param){
	if (param) this._left = param;
	return this._left
}
Table.prototype.right = function(param){
	if (param) this._left = param - this._width;
	return this._left + this._width;
}

Table.prototype.move = function(deltaX, deltaY){
  this._left += deltaX;
  this._top += deltaY;
}