//= require animation-helper

function RelationViewModel(relation){
  this.destinationColumn = relation.primaryKeyColumn;
  this.sourceColumn = relation.foreignKeyColumn;

  this.animationHelper = new AnimationHelper(this.animationCalc.bind(this), 
                                              this.animationRender.bind(this));
}
RelationViewModel.prototype.notifyDrag = function(){
  this.animationHelper.nudge();
}
RelationViewModel.prototype.notifyDragStart = function(){
  this.animationHelper.start();
}
RelationViewModel.prototype.animationCalc = function(){
  return RelationViewModel.path(this.sourceColumn, this.destinationColumn);
}
RelationViewModel.prototype.animationRender = function(path){
  this.path.attr("path", path);
}
RelationViewModel.path = function(columnOne, columnTwo){
  var columnOneCoords = columnOne.relationTargetCoordinates();
  var columnTwoCoords = columnTwo.relationTargetCoordinates();
  return [
    'M', columnOneCoords.x, columnOneCoords.y,
    'T', columnTwoCoords.x, columnTwoCoords.y
  ];
}

	// return [
 //    'M', startX, startY,
 //    'C', (startX - bezDelt), startY, (endX + bezDelt), endY,
 //    endX, endY
 //  ];

