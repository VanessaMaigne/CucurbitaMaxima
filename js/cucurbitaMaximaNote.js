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
    this.header;
    this.data = "pof";
    this.dataFile = jQuery.i18n.prop("dataFile");

    this.init = function(){
        this.initToolTip();
        this.readFile(this.dataFile);
    };

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    };
};

CucurbitaMaximaNoteList.prototype.readFile = function(fileName) {
    var self = this;
    d3.csv(fileName, function (error, csv) {
        // Header columns
        self.header = d3.keys(csv[0]);
        self.createDataHeader();

        // Data
        self.data = crossfilter(csv);
        var dimensionHeader = self.data.dimension(function(d) {
            return d;
        });

        self.createDataTable("#data-count", "#data-table", self.data, self.data.groupAll(), dimensionHeader);
    });
};

CucurbitaMaximaNoteList.prototype.createDataHeader = function() {
    var self = this;
    $.each(self.header, function(i, d) {
        var thElement = $("<th></th>");
        thElement.html("<span>" + d + "</span>");
        $("#headerData").append(thElement);
    })
};

CucurbitaMaximaNoteList.prototype.createDataTable = function(countId, tableId, allD, allG, tableD) {
    var self = this;
    dc.dataCount(countId)
        .dimension(allD)
        .group(allG);

    dc.dataTable(tableId)
        .dimension(tableD)
        .group(function(d) {
            var result = new Array();
            $.each(self.header, function(i, dd) {
                result.push(d[dd]);
            });
            return result;
        })
        .size(allG.value())
        .columns([false])
        .setHeader(self.header)
        .renderlet(function (table) {
            table.selectAll(".dc-table-group").classed("info", false);
        });

    dc.renderAll();
};

//function Lapin(adjectif) {
//  this.adjectif = adjectif;
//  this.parler = function(tirade) {
//    alert("Le lapin "+ this.adjectif + " dit '" + tirade, "'");
//  };
//}
//
//
//var lapinTueur = new Lapin("tueur");
//
//Lapin.prototype.dents = "petites";
//alert(lapinTueur.dents);
//lapinTueur.dents = "longues, pointues et sanglantes";
//alert(lapinTueur.dents);
//alert(Lapin.prototype.dents);