function AnimationHelper(calculate, render, timeout){
  this.calculate = calculate;
  this.render = render;

  this.timeout = timeout || 1000;

  this.lastChanged = performance.now();
}
AnimationHelper.prototype.start = function() {
  this.request();
}
AnimationHelper.prototype.request = function(){
  this.animationFrame = requestAnimationFrame(this.doFrame.bind(this));
}
AnimationHelper.prototype.doFrame = function(){
  var newCss = this.calculate();
  if (this.changed(this.oldCss, newCss)){
    this.lastChanged = performance.now();
    this.render(newCss)
    this.oldCss = newCss;
  }
  if (this.lastChanged >= performance.now() - this.timeout) {
    this.request();
  } else {
    this.animationFrame = null;
  }
}
AnimationHelper.prototype.changed = function(obj, otherObj) {
  //https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
  return JSON.stringify(obj) !== JSON.stringify(otherObj) 
}
AnimationHelper.prototype.nudge = function() {
  if (!this.animationFrame) {
    this.start();
  }
}