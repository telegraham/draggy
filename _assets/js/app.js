//= require controller
//= require local-storage-persistence

tc = null;

(function(){

  var persistence = new LocalStoragePersistence("schema");
  tc = new Controller(persistence)

})();
