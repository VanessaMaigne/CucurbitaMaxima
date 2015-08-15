function extractColumnFromFileAndCallback(filePath, columnName, callback){
    d3.csv(filePath, function (error, csv) {
        var columnValues = new Array();

        var data = crossfilter(csv);
        var dimensionColumn = data.dimension(function(d) {
            return d[columnName];
        }).filter(function(key) {
                if(key != "") columnValues.push(key);
            });

        if(callback)
            callback(columnValues);
    });
}