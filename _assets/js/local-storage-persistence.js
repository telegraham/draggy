function LocalStoragePersistence(key) {
  this.key = key;
}
LocalStoragePersistence.prototype.save = function(dataToSave){
  localStorage[this.key] = JSON.stringify(dataToSave);
}
LocalStoragePersistence.prototype.retrieve = function() {
  return localStorage[this.key] ? JSON.parse(localStorage[this.key]) : null;
}