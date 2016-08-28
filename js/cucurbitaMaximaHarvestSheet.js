/**
 * CucurbitaMaximaSawingSheet _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains methods to create, display, remove, etc... the sawings
 *
 */

function CucurbitaMaximaHarvestSheet(){
    this.dataFileProperty = "harvestSheetFilePath";
    this.dataFile = jQuery.i18n.prop(this.dataFileProperty);
    this.createFileName=jQuery.i18n.prop("harvestCreateFilePath");
    this.lineNumber=0;
    this.header = JSON.parse(jQuery.i18n.prop("harvestHeaderFile"));
    this.headerId = JSON.parse(jQuery.i18n.prop("harvestHeaderIdFile"));
    this.headerToDisplay = JSON.parse(jQuery.i18n.prop("harvestHeaderFileToDisplay"));

    this.vegetalFilePath = "../data/vegetalSheet.csv";
    this.vegetalHeaderForHarvestSelect=jQuery.i18n.prop("vegetalHeaderForHarvestSelect");
    this.vegetalHeaderForHarvestSubSelect=jQuery.i18n.prop("vegetalHeaderForHarvestSubSelect");

    this.varietySelectedValue = false;
}


extendClass(CucurbitaMaximaHarvestSheet, CucurbitaMaxima);


/****************************************************/
/** ******************** CREATE ****************** **/
/****************************************************/
CucurbitaMaximaHarvestSheet.prototype.create = function(){
    var self = this;
    self.initForAllChildren();
    self.initToolTip();
    self.createSelects();
    self.createCalendars();
    self.resetForm();

    if(!self.booleanForHeaderCreation["harvest"])
        self.createDataHeader("harvest");

    if(params.ln)
        self.getContentAndfillForm(params.ln, this.fillVarietySelectWithSelectedValue);

    // Events on #createForm form
    self.initForm();
};

/**
 * This method creates and displays the select for ground and type
 * Values from cucurbitaMaxima.properties
 */
CucurbitaMaximaHarvestSheet.prototype.createSelects = function(){
    // Name select
    this.extractColumnFromFileAndCallback(this.vegetalFilePath, this.vegetalHeaderForHarvestSelect, this.fillNameSelect);

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
CucurbitaMaximaHarvestSheet.prototype.fillNameSelect = function(nameList, context){
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


CucurbitaMaximaHarvestSheet.prototype.fillVarietySelect = function(data, context){
    var varietyList = new Array();
    data.dimension(function(d) {
        var result = new Object();
        result.nv = d[this.vegetalHeaderForHarvestSelect];
        result.variety = d[this.vegetalHeaderForHarvestSubSelect];
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

CucurbitaMaximaHarvestSheet.prototype.fillVarietySelectWithSelectedValue = function(data, context){
    context.selectedVarietyValue = data[context.headerId.indexOf("varietySelect")];
    context.extractColumnFromFileAndCallback(context.vegetalFilePath, false, context.fillVarietySelect);
};

/**
 * This method creates the calendars for moon period & plant date
 */
CucurbitaMaximaHarvestSheet.prototype.createCalendars = function(){
    var self = this;
    $( "#harvestDate" ).datepicker({
        dateFormat: cucurbitaDateFormat,
        setDate: new Date(),
        onSelect: function() {
            var pickerDate = $("#harvestDate").datepicker('getDate');
            $("#harvestDateWeek").html("(semaine : "+$.datepicker.iso8601Week(pickerDate) +")");
            self.calculateCrop();
            self.checkHarvestDateWithMoon();
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
 * cropDate = harvestDate + cycle
 */
CucurbitaMaximaHarvestSheet.prototype.calculateCrop = function(){
    var cycleValue = "" != $( "#cycle" ).val() ? parseInt($("#cycle").val()) : 0;
    var pickerDate = $("#harvestDate").datepicker('getDate');
    var cropDate = new Date(pickerDate);
    cropDate.setDate(pickerDate.getDate() + cycleValue);
    $("#cropDate").val($.datepicker.formatDate("dd/mm/yy", cropDate));
    $("#cropDate").html($.datepicker.formatDate("dd/mm/yy", cropDate) +" (semaine : "+$.datepicker.iso8601Week(new Date(cropDate)) +", année : "+cropDate.getFullYear()+")");
};

/**
 * This method checks if the plant date is between the begin and the end of the moon period
 */
CucurbitaMaximaHarvestSheet.prototype.checkHarvestDateWithMoon = function(){
    var pickerHarvestDate = $("#harvestDate").datepicker('getDate');
    var pickerMoonBeginDate = $("#moonBegin").datepicker('getDate');
    var pickerMoonEndDate = $("#moonEnd").datepicker('getDate');
    if(null != pickerHarvestDate && (null == pickerMoonBeginDate || pickerMoonBeginDate <= pickerHarvestDate) && (null == pickerMoonEndDate || pickerHarvestDate <= pickerMoonEndDate))
        $("#harvestDateWarning").html("");
    else $("#harvestDateWarning").html("<img src='../img/25.png' width='25px'/>  Attention : date non conforme à la phase lunaire");
};

/**
 * This method reinit the form with empty fields and default values for selects
 */
CucurbitaMaximaHarvestSheet.prototype.resetForm = function(){
    $("#createForm")[0].reset();
    // Selects
    $( "#nameSelect" ).select2( "val", "" );
    $( "#varietySelect" ).select2( "val", "" );
    //Calendar & crop
    $('#harvestDate').datepicker().datepicker("setDate", new Date());
    var pickerDate = $("#harvestDate").datepicker('getDate');
    $("#harvestDateWeek").html("(semaine : "+$.datepicker.iso8601Week(pickerDate) +")");
    this.calculateCrop();
};


/****************************************************/
/** ******************** LIST ******************** **/
/****************************************************/
CucurbitaMaximaHarvestSheet.prototype.list = function() {
    this.valuesToSumForListObject =  { Poids : 0, Quantite : 0 };
    this.readFileAndDisplayContent();
};