/**
 * CucurbitaMaximaSawingSheet _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains methods to create, display, remove, etc... the sawings
 *
 */

function CucurbitaMaximaForecastSheet(){
    this.dataFileProperty = "forecastSheetFilePath";
    this.dataFile = jQuery.i18n.prop(this.dataFileProperty);
    this.createFileName=jQuery.i18n.prop("forecastCreateFilePath");
    this.lineNumber=0;
    this.header = JSON.parse(jQuery.i18n.prop("forecastHeaderFile"));
    this.headerId = JSON.parse(jQuery.i18n.prop("forecastHeaderIdFile"));
    this.headerToDisplay = JSON.parse(jQuery.i18n.prop("forecastHeaderFileToDisplay"));

    this.vegetalFilePath = "../data/vegetalSheet.csv";
    this.vegetalHeaderForForecastSelect=jQuery.i18n.prop("vegetalHeaderForForecastSelect");
    this.vegetalHeaderForForecastSubSelect=jQuery.i18n.prop("vegetalHeaderForForecastSubSelect");

    this.varietySelectedValue = false;
}


extendClass(CucurbitaMaximaForecastSheet, CucurbitaMaxima);


/****************************************************/
/** ******************** CREATE ****************** **/
/****************************************************/
CucurbitaMaximaForecastSheet.prototype.create = function(){
    var self = this;
    self.initForAllChildren();
    self.initToolTip();
    self.createSelects();
    self.createCalendars();
    self.resetForm();

    if(!self.booleanForHeaderCreation["forecast"])
        self.createDataHeader("forecast");

    if(params.ln){
        self.getContentAndfillForm(params.ln, this.fillVarietySelectWithSelectedValue);
    }

    // Events on #createForm form
    self.initForm();
};

/**
 * This method creates and displays the select for ground and type
 * Values from cucurbitaMaxima.properties
 */
CucurbitaMaximaForecastSheet.prototype.createSelects = function(){
    // Name select
    this.extractColumnFromFileAndCallback(this.vegetalFilePath, this.vegetalHeaderForForecastSelect, this.fillNameSelect);

    // Variety select
    $( "#varietySelect" ).append( "<option value=''></option>" );
    $( "#varietySelect" ).select2({
        placeholder: "No variety",
        allowClear: true
    });
};

/**
 * Callback for filling the name select after reading the vegetal sheets file
 * @param nameList
 */
CucurbitaMaximaForecastSheet.prototype.fillNameSelect = function(nameList, context){
    $.unique(nameList);
    $( "#nameSelect" ).append( "<option value=''></option>" );
    $.each( nameList, function( i, d )
    {
        if(d!= undefined && "" != d)
            $( "#nameSelect" ).append( "<option value='" + d + "'>" + d + "</option>" );
    } );
    $( "#nameSelect" ).select2({
        placeholder: "Yo pépé, pioche un nom vernaculaire !",
        allowClear: true
    })
            .on("change", function(){
                context.extractColumnFromFileAndCallback(context.vegetalFilePath, false, context.fillVarietySelect);
            });
};


CucurbitaMaximaForecastSheet.prototype.fillVarietySelect = function(data, context){
    var varietyList = new Array();
    data.dimension(function(d) {
        var result = new Object();
        result.nv = d[this.vegetalHeaderForForecastSelect];
        result.variety = d[this.vegetalHeaderForForecastSubSelect];
        return result;
    }).filter(function(elements) {
                if(elements.nv == $("#nameSelect").val())
                    varietyList.push(elements.variety);
                return elements;
            });

    $.unique(varietyList);
    if(varietyList[0] != undefined){
        $( "#varietySelect" ).empty();
        $.each( varietyList, function( i, d )
        {
            if(d!= undefined && "" != d)
                $( "#varietySelect" ).append( "<option value='" + d + "'>" + d + "</option>" );
        } );
        if(context && context.selectedVarietyValue)
            $( "#varietySelect" ).select2("val", context.selectedVarietyValue);
        else
            $( "#varietySelect" ).select2("val", varietyList[0]);
    }
    else {
        $( "#varietySelect" ).empty();
        $( "#varietySelect" ).append( "<option value=''></option>" );
        $( "#varietySelect" ).select2({
            placeholder: "No variety",
            allowClear: true
        });
    }
};

CucurbitaMaximaForecastSheet.prototype.fillVarietySelectWithSelectedValue = function(data, context){
    context.selectedVarietyValue = data[context.headerId.indexOf("varietySelect")];
    context.extractColumnFromFileAndCallback(context.vegetalFilePath, false, context.fillVarietySelect);
};

/**
 * This method creates the calendars for moon period & plant date
 */
CucurbitaMaximaForecastSheet.prototype.createCalendars = function(){
    var self = this;
    $( "#plantDate" ).datepicker({
        dateFormat: cucurbitaDateFormat,
        setDate: new Date(),
        onSelect: function() {
            var pickerDate = $("#plantDate").datepicker('getDate');
            $("#plantDateWeek").html("(semaine : "+$.datepicker.iso8601Week(pickerDate) +")");
            self.calculateCrop();
            self.checkPlantDateWithMoon();
        },
        beforeShow: function (textbox, instance) {
            instance.dpDiv.css({
                marginTop: (-textbox.offsetHeight-220) + 'px'
            });
        }
    });
};

/**
 * This method calculate the crop date by adding plant date and cycle
 * cropDate = plantDate + cycle
 */
CucurbitaMaximaForecastSheet.prototype.calculateCrop = function(){
    var cycleValue = $("#cycle").val() != "" ? parseInt($("#cycle").val()) : 0;
    var pickerDate = $("#plantDate").datepicker('getDate');
    var cropDate = new Date(pickerDate);
    cropDate.setDate(pickerDate.getDate() + cycleValue);
    $("#cropDate").val($.datepicker.formatDate("dd/mm/yy", cropDate));
    $("#cropDate").html($.datepicker.formatDate("dd/mm/yy", cropDate) +" (semaine : "+$.datepicker.iso8601Week(new Date(cropDate)) +", année : "+cropDate.getFullYear()+")");
};

/**
 * This method checks if the plant date is between the begin and the end of the moon period
 */
CucurbitaMaximaForecastSheet.prototype.checkPlantDateWithMoon = function(){
    var pickerPlantDate = $("#plantDate").datepicker('getDate');
    var pickerMoonBeginDate = $("#moonBegin").datepicker('getDate');
    var pickerMoonEndDate = $("#moonEnd").datepicker('getDate');
    if(pickerPlantDate != null && (pickerMoonBeginDate == null || pickerMoonBeginDate <= pickerPlantDate)
            && (pickerMoonEndDate == null || pickerPlantDate <= pickerMoonEndDate))
        $("#plantDateWarning").html("");
    else $("#plantDateWarning").html("<img src='../img/25.png' width='25px'/>  Attention : date non conforme à la phase lunaire");
};

/**
 * This method reinit the form with empty fields and default values for selects
 */
CucurbitaMaximaForecastSheet.prototype.resetForm = function(){
    $("#createForm")[0].reset();
    // Selects
    $( "#nameSelect" ).select2( "val", "" );
    $( "#varietySelect" ).select2( "val", "" );
    //Calendar & crop
    $('#plantDate').datepicker().datepicker("setDate", new Date());
    var pickerDate = $("#plantDate").datepicker('getDate');
    $("#plantDateWeek").html("(semaine : "+$.datepicker.iso8601Week(pickerDate) +")");
    this.calculateCrop();
};
