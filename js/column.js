function Column(props){
  var _this = this;

  _this.id = props.id
  _this.key = props.key
  _this.name = props.name
}
Column.KEY_TYPES = ["pk", "fk", null];
Column.nextKeyType = function(oldValue) {
  var indexOfOldValue = Column.KEY_TYPES.indexOf(oldValue);
  var indexOfNewValue = (indexOfOldValue + 1) % Column.KEY_TYPES.length;
  return Column.KEY_TYPES[indexOfNewValue];
}