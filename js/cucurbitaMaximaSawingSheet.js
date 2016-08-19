/**
 * CucurbitaMaximaSawingSheet _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains methods to create, display, remove, etc... the sawings
 *
 */

function CucurbitaMaximaSawingSheet(){
    this.dataFileProperty = "sawingSheetFilePath";
    this.dataFile = jQuery.i18n.prop(this.dataFileProperty);
    this.createFileName=jQuery.i18n.prop("sawingCreateFilePath");
    this.lineNumber=0;
    this.header = JSON.parse(jQuery.i18n.prop("sawingHeaderFile"));
    this.headerId = JSON.parse(jQuery.i18n.prop("sawingHeaderIdFile"));
    this.headerToDisplay = JSON.parse(jQuery.i18n.prop("sawingHeaderFileToDisplay"));

    this.vegetalFilePath = "../data/vegetalSheet.csv";
    this.vegetalHeaderForSawingSelect=jQuery.i18n.prop("vegetalHeaderForSawingSelect");
}

extendClass(CucurbitaMaximaSawingSheet, CucurbitaMaxima);


/****************************************************/
/** ******************** CREATE ****************** **/
/****************************************************/
CucurbitaMaximaSawingSheet.prototype.create = function(){
    var self = this;
    self.initToolTip();
    self.createSelects();
    self.createCalendars();
    self.resetForm();

    if(!self.booleanForHeaderCreation["sawing"])
        self.createDataHeader("sawing");

    if(params.ln)
        self.getContentAndfillForm(params.ln);

    // Events on #createForm form
    self.initForm();

    $("#cycle").on("keyup", function(){
        self.calculateCrop();
    })
};

/**
 * This method creates and displays the select for ground and type
 * Values from cucurbitaMaxima.properties
 */
CucurbitaMaximaSawingSheet.prototype.createSelects = function(){
    // Ground select
    this.groundList = JSON.parse( jQuery.i18n.prop( "groundArray" ));
    $.each( this.groundList, function( i, d )
    {
        $( "#groundSelect" ).append( "<option value='" + d + "'>" + d + "</option>" );
    } );
    $( "#groundSelect" ).select2();

    // Type select
    this.typeList = JSON.parse( jQuery.i18n.prop( "typeArray" ));
    $.each( this.typeList, function( i, d )
    {
        $( "#typeSelect" ).append( "<option value='" + d + "'>" + d + "</option>" );
    } );
    $( "#typeSelect" ).select2();

    // Name select
    this.extractColumnFromFileAndCallback(this.vegetalFilePath, this.vegetalHeaderForSawingSelect, this.fillNameSelect);
};

/**
 * Callback for filling the name select after reading the vegetal sheets file
 * @param nameList
 */
CucurbitaMaximaSawingSheet.prototype.fillNameSelect = function(nameList){
    $( "#nameSelect" ).append( "<option value=''></option>" );
    $.each( nameList, function( i, d )
    {
        $( "#nameSelect" ).append( "<option value='" + d + "'>" + d + "</option>" );
    } );
    $( "#nameSelect" ).select2({
        placeholder: "Yo pépé, pioche un nom binomial !",
        allowClear: true
    });
};

/**
 * This method creates the calendars for moon period & plant date
 */
CucurbitaMaximaSawingSheet.prototype.createCalendars = function(){
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

    $( "#moonBegin" ).datepicker({
        dateFormat: cucurbitaDateFormat,
        setDate: new Date(),
        onSelect: function() {
            var pickerDate = $("#moonBegin").datepicker('getDate');
            $( "#moonEnd" ).datepicker( "option", "minDate", pickerDate );
            self.checkPlantDateWithMoon();
        },
        beforeShow: function (textbox, instance) {
            instance.dpDiv.css({
                    marginTop: (-textbox.offsetHeight-220) + 'px'
            });
        }
    });

    $( "#moonEnd" ).datepicker({
        dateFormat: cucurbitaDateFormat,
        setDate: new Date(),
        onSelect: function() {
            var pickerDate = $("#moonEnd").datepicker('getDate');
            $( "#moonBegin" ).datepicker( "option", "maxDate", pickerDate );
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
CucurbitaMaximaSawingSheet.prototype.calculateCrop = function(){
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
CucurbitaMaximaSawingSheet.prototype.checkPlantDateWithMoon = function(){
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
CucurbitaMaximaSawingSheet.prototype.resetForm = function(){
    $("#createForm")[0].reset();
    // Selects
    $( "#groundSelect" ).select2( "val", this.groundList[0] );
    $( "#typeSelect" ).select2( "val", this.typeList[0] );
    //Calendar & crop
    $('#plantDate').datepicker().datepicker("setDate", new Date());
    var pickerDate = $("#plantDate").datepicker('getDate');
    $("#plantDateWeek").html("(semaine : "+$.datepicker.iso8601Week(pickerDate) +")");
    this.calculateCrop();
};
