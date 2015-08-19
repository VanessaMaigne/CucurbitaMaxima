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


/**
 * This method extract values from a given column and launch the callback function on these values
 * @param filePath
 * @param columnName
 * @param callback
 */
function extractColumnFromFileAndCallback(filePath, columnName, callback){
    d3.csv(filePath, function (error, csv) {
        var columnValues = new Array();

        var data = crossfilter(csv);
        data.dimension(function(d) {
            return d[columnName];
        }).filter(function(key) {
                if(key != "") columnValues.push(key);
            });

        if(callback)
            callback(columnValues);
    });
}
