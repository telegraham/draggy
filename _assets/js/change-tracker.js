function ChangeTracker() {

}
//https://github.com/gergob/jsProxy/blob/master/04-onchange-object.js
ChangeTracker.trackChange = function(obj, onChange) {
    const handler = {
        set: function (obj, prop, value) {
            const oldVal = obj[prop];
            Reflect.set(obj, prop, value);
            onChange(obj, prop, oldVal, value);
        },
        deleteProperty: function (obj, prop) {
            const oldVal = obj[prop];
            Reflect.deleteProperty(obj, prop);
            onChange(obj, prop, oldVal, undefined);
        }
    };
    return new Proxy(obj, handler);
}
//ChangeTracker.prototype.onChange =  function (obj, prop, oldVal, newVal) {
//  console.log(`myObj.${prop} changed from ${oldVal} to ${newVal}`);
// };