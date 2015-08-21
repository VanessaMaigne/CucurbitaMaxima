/**
 * CucurbitaMaximaForecast _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains methods to display, ... the forecasts
 *
 * https://dc-js.github.io/dc.js/docs/stock.html
 */

function CucurbitaMaximaForecast(){
    this.dataFile = jQuery.i18n.prop("sawingSheetFilePath");
    this.forecastNameColumn = jQuery.i18n.prop("sawingForecastDate");

    this.forecastSawingGroup=jQuery.i18n.prop("forecastSawingDataGroup");
    this.forecastSawingData=JSON.parse(jQuery.i18n.prop("forecastSawingData"));
//    this.dataFile = jQuery.i18n.prop(this.dataFileProperty);
//    this.isHeaderForSawingCreated = false;
//    this.lineNumber=0;
//    this.header = JSON.parse(jQuery.i18n.prop("sawingHeaderFile"));
//    this.headerId = JSON.parse(jQuery.i18n.prop("sawingHeaderIdFile"));

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    }
}
extendClass(CucurbitaMaximaForecast, CucurbitaMaxima);

/****************************************************/
/** ******************** DISPLAY ***************** **/
/****************************************************/
CucurbitaMaximaForecast.prototype.display = function(){
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



    d3.csv(this.dataFile, function (data) {
//    d3.csv('../data/ndx.csv', function (data) {
//        var columnValues = new Array();

//        var ndx = crossfilter(csv);
//        var bob = data.dimension(function(d) {
//            return d[self.forecastNameColumn];
//        }).filter(function(key) {
//                if(key != "") columnValues.push(key);
//            });

        self.header = d3.keys(data[0]);

        // Since its a csv file we need to format the data a bit.
        var dateFormat = d3.time.format('%m/%d/%Y');
        var numberFormat = d3.format('.2f');

//        data.forEach(function (d) {
//            d.dd = dateFormat.parse(d.date);
//            d.month = d3.time.month(d.dd); // pre-calculate month for better performance
//            d.close = +d.close; // coerce to number
//            d.open = +d.open;
//        });

        var ndx = crossfilter(data);
        var all = ndx.groupAll();

        // Dimension by year
//        var yearlyDimension = ndx.dimension(function (d) {
//            return d3.time.year(d.dd).getFullYear();
//        });
        // Maintain running tallies by year as filters are applied or removed
//        var yearlyPerformanceGroup = yearlyDimension.group().reduce(
        /* callback for when data is added to the current filter results */
//            function (p, v) {
//                ++p.count;
//                p.absGain += v.close - v.open;
//                p.fluctuation += Math.abs(v.close - v.open);
//                p.sumIndex += (v.open + v.close) / 2;
//                p.avgIndex = p.sumIndex / p.count;
//                p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
//                p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
//                return p;
//            },
        /* callback for when data is removed from the current filter results */
//            function (p, v) {
//                --p.count;
//                p.absGain -= v.close - v.open;
//                p.fluctuation -= Math.abs(v.close - v.open);
//                p.sumIndex -= (v.open + v.close) / 2;
//                p.avgIndex = p.count ? p.sumIndex / p.count : 0;
//                p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
//                p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
//                return p;
//            },
        /* initialize p */
//            function () {
//                return {
//                    count: 0,
//                    absGain: 0,
//                    fluctuation: 0,
//                    fluctuationPercentage: 0,
//                    sumIndex: 0,
//                    avgIndex: 0,
//                    percentageGain: 0
//                };
//            }
//        );

        // Dimension by full date
//        var dateDimension = ndx.dimension(function (d) {
//            return d.dd;
//        });

        // Dimension by month
//        var moveMonths = ndx.dimension(function (d) {
//            return d.month;
//        });
        // Group by total movement within month
//        var monthlyMoveGroup = moveMonths.group().reduceSum(function (d) {
//            return Math.abs(d.close - d.open);
//        });
        // Group by total volume within move, and scale down result
//        var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
//            return d.volume / 500000;
//        });
//        var indexAvgByMonthGroup = moveMonths.group().reduce(
//            function (p, v) {
//                ++p.days;
//                p.total += (v.open + v.close) / 2;
//                p.avg = Math.round(p.total / p.days);
//                return p;
//            },
//            function (p, v) {
//                --p.days;
//                p.total -= (v.open + v.close) / 2;
//                p.avg = p.days ? Math.round(p.total / p.days) : 0;
//                return p;
//            },
//            function () {
//                return {days: 0, total: 0, avg: 0};
//            }
//        );

        // Create categorical dimension
//        var gainOrLoss = ndx.dimension(function (d) {
//            return d.open > d.close ? 'Loss' : 'Gain';
//        });
        // Produce counts records in the dimension
//        var gainOrLossGroup = gainOrLoss.group();

        // Determine a histogram of percent changes
//        var fluctuation = ndx.dimension(function (d) {
//            return Math.round((d.close - d.open) / d.open * 100);
//        });
//        var fluctuationGroup = fluctuation.group();

        // Summarize volume by quarter
//        var quarter = ndx.dimension(function (d) {
//            var month = d.dd.getMonth();
//            if (month <= 2) {
//                return 'Q1';
//            } else if (month > 2 && month <= 5) {
//                return 'Q2';
//            } else if (month > 5 && month <= 8) {
//                return 'Q3';
//            } else {
//                return 'Q4';
//            }
//        });
//        var quarterGroup = quarter.group().reduceSum(function (d) {
//            return d.volume;
//        });

        // Counts per weekday
//        var dayOfWeek = ndx.dimension(function (d) {
//            var day = d.dd.getDay();
//            var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//            return day + '.' + name[day];
//        });
//        var dayOfWeekGroup = dayOfWeek.group();


//        data = crossfilter(csv);
        var dimensionHeader = ndx.dimension(function(d) {
            return d;
        });

        self.createDataTable("#data-count", "#data-table", "#headerData", ndx, ndx.groupAll(), dimensionHeader);

        dc.renderAll();

    });
};

/****************************************************/
/** ****************** DATA TABLE **************** **/
/****************************************************/
CucurbitaMaximaForecast.prototype.createDataTable = function(countId, tableId, tableHeaderId, allD, allG, tableD) {
    var self = this;
    this.createDataTableHeader(tableHeaderId);

    dc.dataCount(countId)
        .dimension(allD)
        .group(allG);

    dc.dataTable(tableId)
        .dimension(tableD)
        .group(function(d) { return d[self.forecastSawingGroup]; })
        .size(allG.value())
//        .columns([ function(d){return d["Variete"]},function(d){return d["Sol"]}, function(d){return d["Type"]}, function(d){return d["Date de plantation"]}])
//        .columns(function(d){
//            var bob = new Array();
//            bob.push(d["Variete"]);
//            return bob;
//        })
        .columns(function(){
    return function(d){return d["Variete"]},function(d){return d["Sol"]}, function(d){return d["Type"]}, function(d){return d["Date de plantation"]}];
//    return pif;
})
    .renderlet(function (table) {
        table.selectAll(".dc-table-group").classed("info", true);
    });

};

CucurbitaMaximaForecast.prototype.createDataTableHeader = function(tableHeaderId) {
    $.each(this.forecastSawingData, function(i,d){
        $(tableHeaderId).append('<th class="dc-table-head" data-col="'+i+'">'+d+'</th>');
    });
};


CucurbitaMaximaForecast.prototype.createPie = function(){
    this.gainOrLossChart /* dc.pieChart('#gain-loss-chart', 'chartGroup') */
        // (_optional_) define chart width, `default = 200`
        .width(180)
        // (optional) define chart height, `default = 200`
        .height(180)
        // Define pie radius
        .radius(80)
        // Set dimension
        .dimension(gainOrLoss)
        // Set group
        .group(gainOrLossGroup)
        // (_optional_) by default pie chart will use `group.key` as its label but you can overwrite it with a closure.
        .label(function (d) {
            if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
                return d.key + '(0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
            }
            return label;
        })
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

CucurbitaMaximaForecast.prototype.createPie2 = function(){

    this.quarterChart /* dc.pieChart('#quarter-chart', 'chartGroup') */
        .width(180)
        .height(180)
        .radius(80)
        .innerRadius(30)
        .dimension(quarter)
        .group(quarterGroup);

};

CucurbitaMaximaForecast.prototype.createRow = function(){
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

CucurbitaMaximaForecast.prototype.createBar = function(){
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

CucurbitaMaximaForecast.prototype.createAreaChart = function(){
    this.moveChart /* dc.lineChart('#monthly-move-chart', 'chartGroup') */
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


CucurbitaMaximaForecast.prototype.createRangeChart = function(){
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




CucurbitaMaximaForecast.prototype.createBubble = function()
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




