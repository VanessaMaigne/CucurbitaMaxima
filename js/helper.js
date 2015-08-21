/**
 * Method used to extend prototype of object
 * @param child
 * @param parent
 */
var extendClass = function(child, parent) {
    var Surrogate = function() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
};
