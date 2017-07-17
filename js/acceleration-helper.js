function AccelerationHelper(){
  this.resetPositions();
}

AccelerationHelper.prototype.resetPositions = function(){
  this.positions = [];
}
AccelerationHelper.prototype.recordPosition = function(x, y){
  this.positions.push({ 
    t: performance.now(),
    x: x,
    y: y
  })
}
AccelerationHelper.prototype.cleanUpPositions = function(timeAgo){
  var cutoff = performance.now() - timeAgo;
  this.positions = this.positions.filter(function(pos){
    return pos.t >= cutoff;
  });
}
AccelerationHelper.prototype.velocityAt = function(time) {
  var beforeAfter = this.positions.reduce(function(result, current){
    if (current.t < time && (!result.before || current.t > result.before.t)) {
      result.before = current;
    }
    else if (current.t > time && (!result.after || current.t < result.after.t)) {
      result.after = current;
    }
    return result;
  }, {before: null, after: null});
  return this.velocity(beforeAfter.before, beforeAfter.after, time)
}
AccelerationHelper.prototype.velocity = function(sample0, sample1, defaultT){

  //HACK
  if (!sample0 || !sample1)
    return {t: defaultT, x: 0, y: 0}

  var deltaX = sample1.x - sample0.x;
  var deltaY = sample1.y - sample0.y;
  var deltaT = sample1.t - sample0.t;

  return {
    t: (sample1.t - sample0.t) / 2 + sample0.t,
    x: deltaX / deltaT,
    y: deltaY / deltaT
  }
}
AccelerationHelper.prototype.lastVelocity = function() {
  var penultimatePosition = this.positions[this.positions.length - 2];
  var lastPosition = this.positions[this.positions.length - 1];
  return this.velocity(penultimatePosition, lastPosition)
}

AccelerationHelper.prototype.calculateAcceleration = function(since){
  var v0 = this.velocityAt(performance.now() - since);
  var v1 = this.lastVelocity()

  var deltaVx = v1.x - v0.x;
  var deltaVy = v1.y - v0.y;
  var deltaT = v1.t - v0.t;

  return {
    x : deltaVx / deltaT,
    y : deltaVy / deltaT
  }
}