/**
 * CucurbitaMaximaHarvest _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains methods to display, ... the harvests
 *
 * https://dc-js.github.io/dc.js/docs/stock.html
 */

function CucurbitaMaximaHarvestStatistics(){
    this.dataFile = jQuery.i18n.prop("sawingSheetFilePath");
    this.harvestDataFile = jQuery.i18n.prop("harvestSheetFilePath");
    this.harvestSawingGroup = "Nom";
    this.harvestHeaderFileToDisplay = JSON.parse(jQuery.i18n.prop("harvestHeaderFileToDisplay"));
//    this.harvestSawingDataDate = "Date de recolte prevue";
//    this.harvestSawingDataDayGap = 3;

//    this.colors = this.getColors();
    var colorArray=["#555555", "#009900", "#723E64", "#ff8c00", "#ff0000", "#a52a2a", "#cb6868", "#FFDF00", "#efe28a", "#66cdaa", "#77B5FE", "#4682b4", "#006400", "#32cd32"];
//    this.colors = d3.scale.ordinal().domain(["Coeur de boeuf", "Charlotte"]).range(colorArray);
    this.colors = this.getColors();
    this.transition = this.getTransition();
    this.barChartMargin = this.getBarChartMargin();

    this.initToolTip();
}

extendClass(CucurbitaMaximaHarvestStatistics, CucurbitaMaximaStatistics);


/****************************************************/
/** ******************** DISPLAY ***************** **/
/****************************************************/
CucurbitaMaximaHarvestStatistics.prototype.display = function(){
    var self = this;

    this.dsv(this.harvestDataFile, function (csv) {
        self.header = d3.keys(csv[0]);
        var data = crossfilter(csv);

        // Pie
        var vernacularNameDimension = data.dimension(function(d) {
            return d["Nom vernaculaire"];
        });
        self.createPie("#vernacularName-pie-chart", 200, 200, vernacularNameDimension, vernacularNameDimension.group());

        // Quantity & weight barcharts
        var varietyDimension = data.dimension(function(d) {
            return d["Variete"];
        });
        var varietyQuantityGroup = varietyDimension.group().reduceSum(
            function(d){ return d["Quantite"]; }
        );
        self.createBar("#variety-quantity-bar-chart", 400, 300, varietyDimension, varietyQuantityGroup, {top: 20, right: 0, bottom: 75, left: 50});

        var varietyWeightGroup = varietyDimension.group().reduceSum(
            function(d){ return d["Poids"]; }
        );
        self.createBar("#variety-weight-bar-chart", 400, 300, varietyDimension, varietyWeightGroup, {top: 20, right: 0, bottom: 75, left: 50});

        // Harvest time chart
//        var vernacularNameDateGroup = vernacularNameDimension.group().reduceCount();
//        function(d){
//            return d["CreationDate"];
//        });
        var harvestDateDimension = data.dimension(function (d) {
//            return d3.time.format('%e/%d/%Y_%H:%M').parse(d["Date de recolte"]);
            return cucurbitaDateFormatForD3.parse(d["Date de recolte"]);
        });
        var volumeByMonthGroup = harvestDateDimension.group();//.reduceSum(function (d) {
        var cropDateGroup = harvestDateDimension.group().reduceCount(function(d) {
            return cucurbitaDateFormatForD3.parse(d["Date de recolte"]);
        });

        var indexAvgByMonthGroup = harvestDateDimension.group().reduce(
            function (p, v) {
                ++p.days;
                ++p.total;
                p.avg = Math.round(p.total / p.days);
                return p;
            },
            function (p, v) {
                --p.days;
                --p.total;
                p.avg = p.days ? Math.round(p.total / p.days) : 0;
                return p;
            },
            function () {
                return {days: 0, total: 0, avg: 0};
            }
        );

        var minDate = cucurbitaDateFormatForD3.parse(harvestDateDimension.bottom(1)[0]["Date de recolte"]);
        var maxDate = cucurbitaDateFormatForD3.parse(harvestDateDimension.top(1)[0]["Date de recolte"]);
        var newMinDate = new Date(minDate);
        var newMaxDate = new Date(maxDate);
        if(minDate) newMinDate.setDate(minDate.getDate() - 3);
        if(maxDate) newMaxDate.setDate(maxDate.getDate() + 3);


//        self.createAreaChart("#harvest-time-chart", "#harvest-volume-chart", 400, 300, vernacularNameDimension, vernacularNameDateGroup, {top: 20, right: 0, bottom: 75, left: 50});
        self.createAreaChart("#harvest-time-chart", "#harvest-volume-chart", harvestDateDimension, volumeByMonthGroup, cropDateGroup, indexAvgByMonthGroup, newMinDate, newMaxDate);


        // Table chart
        var dimensionHeader = data.dimension(function(d) {
            return d;
        });
        self.createDataTable("#data-count", "#data-table", "#headerData", self.harvestHeaderFileToDisplay, data, data.groupAll(), dimensionHeader, "Nom vernaculaire");

        dc.renderAll();
        self.updateToolTip();

        // Update charts
        $("#variety-bar-chart-quantity .axis.x text, #variety-bar-chart-weight .axis.x text").attr( "transform", "translate(-10,20)rotate(315)" );

        // Reset button
        $("#resetButton").on("click", function() {
            self.reset();
        });
    });
};


CucurbitaMaximaHarvestStatistics.prototype.reset = function(){
    dc.filterAll();
    dc.redrawAll();
}

