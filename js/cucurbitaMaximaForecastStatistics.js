/**
 * CucurbitaMaximaHarvest _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains methods to display, ... the harvests
 *
 * https://dc-js.github.io/dc.js/docs/stock.html
 */

function CucurbitaMaximaStatistics(){
    this.dataFile = jQuery.i18n.prop("sawingSheetFilePath");
    this.harvestDataFile = jQuery.i18n.prop("harvestSheetFilePath");
    this.harvestSawingGroup=jQuery.i18n.prop("harvestSawingDataGroup");
    this.harvestSawingData=JSON.parse(jQuery.i18n.prop("harvestSawingData"));
    this.harvestSawingDataDate=jQuery.i18n.prop("harvestSawingDataDate");
    this.harvestSawingDataDayGap=parseInt(jQuery.i18n.prop("harvestSawingDataDayGap"));

    this.transition = 10;

//    this.dataFile = jQuery.i18n.prop(this.dataFileProperty);
//    this.isHeaderForSawingCreated = false;
//    this.lineNumber=0;
//    this.header = JSON.parse(jQuery.i18n.prop("sawingHeaderFile"));
//    this.headerId = JSON.parse(jQuery.i18n.prop("sawingHeaderIdFile"));

//    this.initToolTip = function() {
//        $(".basicButton, .toolTipData").tooltip({
//            placement: "top",
//            container:'body'});
//    }
}
extendClass(CucurbitaMaximaStatistics, CucurbitaMaxima);

/****************************************************/
/** ******************** DISPLAY ***************** **/
/****************************************************/
CucurbitaMaximaStatistics.prototype.display = function(){
    var self = this;

//    this.gainOrLossChart = dc.pieChart('#gain-loss-chart');
//    this.fluctuationChart = dc.barChart('#fluctuation-chart');
//    this.quarterChart = dc.pieChart('#quarter-chart');
//    this.dayOfWeekChart = dc.rowChart('#day-of-week-chart');
//    this.moveChart = dc.lineChart('#monthly-move-chart');
//    this.volumeChart = dc.barChart('#monthly-volume-chart');
//    this.yearlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');
//    this.nasdaqCount = dc.dataCount('.dc-data-count');
//    this.nasdaqTable = dc.dataTable('.dc-data-table');


    this.dsv(this.dataFile, function (csv) {
//    d3.csv('../data/ndx.csv', function (data) {
        self.header = d3.keys(csv[0]);

        // Since its a csv file we need to format the data a bit.
//        var dateFormat = d3.time.format('%d/%m/%Y');
//        var numberFormat = d3.format('.2f');

//        data.forEach(function (d) {
//            d.dd = dateFormat.parse(d.date);
//            d.month = d3.time.month(d.dd); // pre-calculate month for better performance
//            d.close = +d.close; // coerce to number
//            d.open = +d.open;
//        });

//        Nom,Variete,Phase lunaire debut,Phase lunaire fin,Phase lunaire note,Sol,Type,Date de plantation,Cycle vegetatif,Date de recolte prevue,Distance sur les rangs,Distance entre les rangs,Exposition,Temperature
//        Pdt,Charlotte,,,,Humifère,Semis,20/08/2015,2,22/08/2015,1,2,soleil,30,


        var data = crossfilter(csv);

        // Data table
        var dimensionHeader = data.dimension(function(d) {
            return d;
        });

        // Dimension by date
        var cropDateDimension = data.dimension(function (d) {
            return cucurbitaDateFormatForD3.parse(d[self.harvestSawingDataDate]);
        });

        // Group by total movement within month
//        var monthlyMoveGroup = moveMonths.group().reduceSum(function (d) {
//            return Math.abs(d.close - d.open);
//            return d["Date de recolte prevue"];
//        });

        var cropDateGroup = cropDateDimension.group().reduceCount(function(d) {
            return cucurbitaDateFormatForD3.parse(d[self.harvestSawingDataDate]);
        });

//"date","open","high","low","close","volume","oi"
//11/01/1985,115.48,116.78,115.48,116.28,900900,0
//11/04/1985,116.28,117.07,115.82,116.04,753400,0


        // Group by total volume within move, and scale down result
        var volumeByMonthGroup = cropDateDimension.group();//.reduceSum(function (d) {
//            return d.volume / 500000;
//        });
        var indexAvgByMonthGroup = cropDateDimension.group().reduce(
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


        self.createDataTable("#data-count", "#data-table", "#headerData", data, data.groupAll(), dimensionHeader);
        self.createAreaChart("#monthly-move-chart", '#monthly-volume-chart', cropDateDimension, volumeByMonthGroup, cropDateGroup, indexAvgByMonthGroup);

        dc.renderAll();

    });
};

/****************************************************/
/** ***************** AREA & RANGE *************** **/
/****************************************************/
CucurbitaMaximaStatistics.prototype.createAreaChart = function(chartId, subChartId, dateDimension, dateGroup, monthlyMoveGroup, indexAvgByMonthGroup){
    var minDate = cucurbitaDateFormatForD3.parse(dateDimension.bottom(1)[0][this.harvestSawingDataDate]);
    var maxDate = cucurbitaDateFormatForD3.parse(dateDimension.top(1)[0][this.harvestSawingDataDate]);
    var newMinDate = new Date(minDate);
    var newMaxDate = new Date(maxDate);
    if(minDate) newMinDate.setDate(minDate.getDate() - this.harvestSawingDataDayGap);
    if(maxDate) newMaxDate.setDate(maxDate.getDate() + this.harvestSawingDataDayGap);

    var width = 990;

    var subChart = dc.barChart(subChartId)
        .width(width)
        .height(50)
        .margins({top: 10, right: 50, bottom: 20, left: 40})
        .dimension(dateDimension)
        .group(dateGroup)
        .transitionDuration(this.transition)
        .elasticY(true)
        .centerBar(true)
        .gap(1)
        .renderHorizontalGridLines(true)
        .x(d3.time.scale().domain([newMinDate, newMaxDate]))
        .xUnits(d3.time.days);


    dc.lineChart(chartId)
        .width(width)
        .height(150)
        .transitionDuration(this.transition)
        .margins({top: 30, right: 50, bottom: 30, left: 40})
        .dimension(dateDimension)
        .group(dateGroup)
//        .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
//            return d.value;
//        })
        .mouseZoomable(true)
        .rangeChart(subChart)
        .transitionDuration(500)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
                    .brushOn(false)
        .title(function (d) {
            return d;
//            alert(d);
//            var value = d.value.avg ? d.value.avg : d.value;
//            if (isNaN(value)) {
//                value = 0;
//            }
//            return dateFormat(d.key) + '\n' + value;
        })
        .x(d3.time.scale().domain([newMinDate, newMaxDate]))
        .xUnits(d3.time.days)
//        .elasticX(true)
//        .xAxis();
    ;
    //        .round(d3.time.month.round)
//         .xUnits(d3.time.days)
//            .brushOn(false)
//        .group(indexAvgByMonthGroup, 'Monthly Index Average')
//        .valueAccessor(function (d) {
//            return d.value.avg;
//        })
//        .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
//            return d.value;
//        })
    //        .group(monthlyMoveGroup, 'Monthly Index Average')
    //        .valueAccessor(function (d) {
    //            return d.value.avg;
    //        })


//    this.moveChart /* dc.lineChart('#monthly-move-chart', 'chartGroup') */
    /*    dc.lineChart(chartId)
     .renderArea(true)
     .width(990)
     .height(200)
     .transitionDuration(1000)
     .margins({top: 30, right: 50, bottom: 25, left: 40})
     .dimension(moveMonths)
     //        .mouseZoomable(true)
     // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
     //        .rangeChart(volumeChart)
     //        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
     .x(d3.time.scale().domain([new Date(2015, 0, 1), new Date(2015, 11, 31)]))
     //        .round(d3.time.month.round)
     //        .xUnits(d3.time.days)
     .elasticY(true)
     .renderHorizontalGridLines(true)
     //##### Legend

     // Position the legend relative to the chart origin and specify items' height and separation.
     .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
     //        .brushOn(false)
     // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
     // legend.
     // The `.valueAccessor` will be used for the base layer
     .group(indexAvgByMonthGroup, 'Monthly Index Average')
     .valueAccessor(function (d) {
     return d.value.avg;
     })
     // Stack additional layers with `.stack`. The first paramenter is a new group.
     // The second parameter is the series name. The third is a value accessor.
     .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
     return d.value;
     })
     //        .group(monthlyMoveGroup, 'Monthly Index Average')
     //        .valueAccessor(function (d) {
     //            return d.value.avg;
     //        })

     // Title can be called by any stack layer.
     .title(function (d) {
     var value = d.value.avg ? d.value.avg : d.value;
     if (isNaN(value)) {
     value = 0;
     }
     return dateFormat(d.key) + '\n' + value;
     });

     */
};


CucurbitaMaximaStatistics.prototype.createRangeChart = function(){
    this.volumeChart.width(990) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(40)
        .margins({top: 0, right: 50, bottom: 20, left: 40})
        .dimension(moveMonths)
        .group(volumeByMonthGroup)
        .centerBar(true)
        .gap(1)
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
        .round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.months);
};


/****************************************************/
/** ****************** DATA TABLE **************** **/
/****************************************************/
CucurbitaMaximaStatistics.prototype.createDataTable = function(countId, tableId, tableHeaderId, allD, allG, tableD) {
    var self = this;
    var dataColumns = new Array();
    $.each(this.harvestSawingData, function(i,d){
        dataColumns.push(function(e){return e[d]});
    });

    this.createDataTableHeader(tableHeaderId);

    dc.dataCount(countId)
        .dimension(allD)
        .group(allG);

    dc.dataTable(tableId)
        .dimension(tableD)
        .group(function(d) { return d[self.harvestSawingGroup]; })
        .size(allG.value())
        .columns(dataColumns)
        .renderlet(function (table) {
            table.selectAll(".dc-table-group").classed("info", true);
        });

};

CucurbitaMaximaStatistics.prototype.createDataTableHeader = function(tableHeaderId) {
    $.each(this.harvestSawingData, function(i,d){
        $(tableHeaderId).append('<th class="dc-table-head" data-col="'+i+'">'+d+'</th>');
    });
};



/****************************************************/
/** ****************** PIE **************** **/
/****************************************************/

CucurbitaMaximaStatistics.prototype.createPie = function(chartId, dimension, group) {
    dc.pieChart(chartId)
        .width(180)
        .height(180)
        .radius(80)
        .dimension(dimension)
        // Set group
        .group(group)
//        .label(function (d) {
//            if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
//                return d.key + '(0%)';
//            }
//            var label = d.key;
//            if (all.value()) {
//                label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
//            }
//            return label;
//        })
        /*
         // (_optional_) whether chart should render labels, `default = true`
         .renderLabel(true)
         // (_optional_) if inner radius is used then a donut chart will be generated instead of pie chart
         .innerRadius(40)
         // (_optional_) define chart transition duration, `default = 350`
         .transitionDuration(500)
         // (_optional_) define color array for slices
         .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
         // (_optional_) define color domain to match your data domain if you want to bind data or color
         .colorDomain([-1750, 1644])
         // (_optional_) define color value accessor
         .colorAccessor(function(d, i){return d.value;})
         */;
};

CucurbitaMaximaStatistics.prototype.createPie2 = function(){

    this.quarterChart /* dc.pieChart('#quarter-chart', 'chartGroup') */
        .width(180)
        .height(180)
        .radius(80)
        .innerRadius(30)
        .dimension(quarter)
        .group(quarterGroup);

};

CucurbitaMaximaStatistics.prototype.createRow = function(){
    this.dayOfWeekChart /* dc.rowChart('#day-of-week-chart', 'chartGroup') */
        .width(180)
        .height(180)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(dayOfWeekGroup)
        .dimension(dayOfWeek)
        // Assign colors to each value in the x scale domain
        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        .label(function (d) {
            return d.key.split('.')[1];
        })
        // Title sets the row text
        .title(function (d) {
            return d.value;
        })
        .elasticX(true)
        .xAxis().ticks(4);

};

CucurbitaMaximaStatistics.prototype.createBar = function(){
    this.fluctuationChart /* dc.barChart('#volume-month-chart', 'chartGroup') */
        .width(420)
        .height(180)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(fluctuation)
        .group(fluctuationGroup)
        .elasticY(true)
        // (_optional_) whether bar should be center to its x value. Not needed for ordinal chart, `default=false`
        .centerBar(true)
        // (_optional_) set gap between bars manually in px, `default=2`
        .gap(1)
        // (_optional_) set filter brush rounding
        .round(dc.round.floor)
        .alwaysUseRounding(true)
        .x(d3.scale.linear().domain([-25, 25]))
        .renderHorizontalGridLines(true)
        // Customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], s = '';
            s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
            return s;
        });

// Customize axes
    this.fluctuationChart.xAxis().tickFormat(
        function (v) { return v + '%'; });
    this.fluctuationChart.yAxis().ticks(5);
};
/*

 CucurbitaMaximaHarvest.prototype.createAreaChart = function(){
 this.moveChart
 .renderArea(true)
 .width(990)
 .height(200)
 .transitionDuration(1000)
 .margins({top: 30, right: 50, bottom: 25, left: 40})
 .dimension(moveMonths)
 .mouseZoomable(true)
 // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
 .rangeChart(volumeChart)
 .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
 .round(d3.time.month.round)
 .xUnits(d3.time.months)
 .elasticY(true)
 .renderHorizontalGridLines(true)
 //##### Legend

 // Position the legend relative to the chart origin and specify items' height and separation.
 .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
 .brushOn(false)
 // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
 // legend.
 // The `.valueAccessor` will be used for the base layer
 .group(indexAvgByMonthGroup, 'Monthly Index Average')
 .valueAccessor(function (d) {
 return d.value.avg;
 })
 // Stack additional layers with `.stack`. The first paramenter is a new group.
 // The second parameter is the series name. The third is a value accessor.
 .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
 return d.value;
 })
 // Title can be called by any stack layer.
 .title(function (d) {
 var value = d.value.avg ? d.value.avg : d.value;
 if (isNaN(value)) {
 value = 0;
 }
 return dateFormat(d.key) + '\n' + numberFormat(value);
 });
 };


 CucurbitaMaximaHarvest.prototype.createRangeChart = function(){
 this.volumeChart.width(990)
 .height(40)
 .margins({top: 0, right: 50, bottom: 20, left: 40})
 .dimension(moveMonths)
 .group(volumeByMonthGroup)
 .centerBar(true)
 .gap(1)
 .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
 .round(d3.time.month.round)
 .alwaysUseRounding(true)
 .xUnits(d3.time.months);
 };

 */


CucurbitaMaximaStatistics.prototype.createBubble = function()
{
    this.yearlyBubbleChart /* dc.bubbleChart('#yearly-bubble-chart', 'chartGroup') */
        // (_optional_) define chart width, `default = 200`
        .width(990)
        // (_optional_) define chart height, `default = 200`
        .height(250)
        // (_optional_) define chart transition duration, `default = 750`
        .transitionDuration(1500)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(yearlyDimension)
        //The bubble chart expects the groups are reduced to multiple values which are used
        //to generate x, y, and radius for each key (bubble) in the group
        .group(yearlyPerformanceGroup)
        // (_optional_) define color function or array for bubbles: [ColorBrewer](http://colorbrewer2.org/)
//            .colors(colorbrewer.RdYlGn[9])
        //(optional) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-500, 500])
        //##### Accessors

        //Accessor functions are applied to each value returned by the grouping

        // `.colorAccessor` - the returned value will be passed to the `.colors()` scale to determine a fill color
        .colorAccessor(function (d) {
            return d.value.absGain;
        })
        // `.keyAccessor` - the `X` value will be passed to the `.x()` scale to determine pixel location
        .keyAccessor(function (p) {
            return p.value.absGain;
        })
        // `.valueAccessor` - the `Y` value will be passed to the `.y()` scale to determine pixel location
        .valueAccessor(function (p) {
            return p.value.percentageGain;
        })
        // `.radiusValueAccessor` - the value will be passed to the `.r()` scale to determine radius size;
        //   by default this maps linearly to [0,100]
        .radiusValueAccessor(function (p) {
            return p.value.fluctuationPercentage;
        })
        .maxBubbleRelativeSize(0.3)
        .x(d3.scale.linear().domain([-2500, 2500]))
        .y(d3.scale.linear().domain([-100, 100]))
        .r(d3.scale.linear().domain([0, 4000]))
        //##### Elastic Scaling

        //`.elasticY` and `.elasticX` determine whether the chart should rescale each axis to fit the data.
        .elasticY(true)
        .elasticX(true)
        //`.yAxisPadding` and `.xAxisPadding` add padding to data above and below their max values in the same unit
        //domains as the Accessors.
        .yAxisPadding(100)
        .xAxisPadding(500)
        // (_optional_) render horizontal grid lines, `default=false`
        .renderHorizontalGridLines(true)
        // (_optional_) render vertical grid lines, `default=false`
        .renderVerticalGridLines(true)
        // (_optional_) render an axis label below the x axis
        .xAxisLabel('Index Gain')
        // (_optional_) render a vertical axis lable left of the y axis
        .yAxisLabel('Index Gain %')
        //##### Labels and  Titles

        //Labels are displayed on the chart for each bubble. Titles displayed on mouseover.
        // (_optional_) whether chart should render labels, `default = true`
        .renderLabel(true)
        .label(function (p) {
            return p.key;
        })
        // (_optional_) whether chart should render titles, `default = false`
        .renderTitle(true)
        .title(function (p) {
            return [
                p.key,
                'Index Gain: ' + numberFormat(p.value.absGain),
                'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
                'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%'
            ].join('\n');
        })
        //#### Customize Axes

        // Set a custom tick format. Both `.yAxis()` and `.xAxis()` return an axis object,
        // so any additional method chaining applies to the axis, not the chart.
        .yAxis().tickFormat(function (v) {
            return v + '%';
        });

};




