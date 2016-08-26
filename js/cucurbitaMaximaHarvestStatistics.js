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

        var vernacularNameDimension = data.dimension(function(d) {
            return d["Nom vernaculaire"];
        });
        self.createPie("#vernacularName-pie-chart", 200, 200, vernacularNameDimension, vernacularNameDimension.group());

        var varietyDimension = data.dimension(function(d) {
            return d["Variete"];
        });
        self.createBar("#variety-bar-chart", 400, 200, varietyDimension, varietyDimension.group());


        var dimensionHeader = data.dimension(function(d) {
            return d;
        });
        self.createDataTable("#data-count", "#data-table", "#headerData", self.harvestHeaderFileToDisplay, data, data.groupAll(), dimensionHeader, "Nom vernaculaire");

        dc.renderAll();

        $("#variety-bar-chart .axis.x text").attr( "transform", "translate(-10,20)rotate(315)" );
    });
};



