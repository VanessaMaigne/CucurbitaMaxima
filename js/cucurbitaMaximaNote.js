jQuery.i18n.properties( {
    name:'cucurbitaMaxima',
    path:'../',
    language:null,
    mode:'both'
} );

function CucurbitaMaximaNoteCreate(){

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    }
}

function CucurbitaMaximaNoteList(){
//    this.header;
//    this.data;
    var dataFile = jQuery.i18n.prop("dataFile");

    this.init = function(){
        this.initToolTip();
        this.readFileAndDisplayContent(dataFile);
    };

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    };
};

CucurbitaMaximaNoteList.prototype.readFileAndDisplayContent = function(fileName) {
    var self = this;
    d3.csv(fileName, function (error, csv) {
        // Header columns
        self.header = d3.keys(csv[0]);
        self.displayNumber(csv.length);
        self.displayDataHeader();
        self.displayDataTable(csv, self.header);

        // Data
//        self.data = crossfilter(csv);
//        var dimensionHeader = self.data.dimension(function(d) {
//            return d;
//        });
    });
};

CucurbitaMaximaNoteList.prototype.displayNumber = function(number) {
    $("#total-count").html(number);
};

CucurbitaMaximaNoteList.prototype.displayDataHeader = function() {
    var self = this;
    $.each(self.header, function(i, d) {
        var thElement = $("<th></th>");
        thElement.html("<span>" + d + "</span>");
        $("#headerData").append(thElement);
    });
    var thElement = $("<th colspan='2'>Actions</th>");
    $("#headerData").append(thElement);
};

CucurbitaMaximaNoteList.prototype.displayDataTable = function(csv) {
    var self = this;
    $.each(csv, function(i, d) {
        var keys = d3.keys(d);
        var trElement = $("<tr></tr>");
        trElement.attr("class", "dc-table-group");

        keys.forEach(function(ff,ii) {
            var tdElement = $("<td></td>");
            tdElement.html("<span>" + d[keys[ii]] + "</span>");
            trElement.append(tdElement);
        });
        var modifyImage = $('<td><img src="../img/15.png" width="30px"/></td>');
        modifyImage.on("click", function(){
            self.modifyElement(i);
        });
        trElement.append(modifyImage);
        var removeImage = $('<td><img src="../img/118.png" width="30px"/></td>');
        removeImage.on("click", function(){
            self.removeElement(i);
        });
        trElement.append(removeImage);

        $("#data-table").append(trElement);
    })
};

CucurbitaMaximaNoteList.prototype.modifyElement = function(element){
    alert("modify "+element);
};

CucurbitaMaximaNoteList.prototype.removeElement = function(element){
    alert("remove "+element);
};


