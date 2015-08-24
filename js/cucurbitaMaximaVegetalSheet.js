/**
 * CucurbitaMaximaVegetalSheet _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains methods to create, display, remove, etc... the vegetal sheets
 *
 */

function CucurbitaMaximaVegetalSheet(){
    this.dataFileProperty = "vegetalSheetFilePath";
    this.dataFile = jQuery.i18n.prop(this.dataFileProperty);
    this.createFileName=jQuery.i18n.prop("vegetalCreateFilePath");
    this.lineNumber=0;
    this.header = JSON.parse(jQuery.i18n.prop("vegetalHeaderFile"));
    this.headerId = JSON.parse(jQuery.i18n.prop("vegetalHeaderIdFile"));
    this.headerToDisplay = JSON.parse(jQuery.i18n.prop("vegetalHeaderFile"));
}

extendClass(CucurbitaMaximaVegetalSheet, CucurbitaMaxima);


/****************************************************/
/** ******************** CREATE ****************** **/
/****************************************************/
CucurbitaMaximaVegetalSheet.prototype.create = function(){
    var self = this;

    var dateValue = $.datepicker.formatDate('DD dd MM yy', new Date());
    $("#smallDateValue").html(dateValue);
    $("#reign").focus();

    self.initToolTip();

    if(!self.booleanForHeaderCreation["vegetal"])
        self.createDataHeader("vegetal");

    if(params.ln)
        self.getContentAndfillForm(params.ln);

    // Events on #createForm form
    self.initForm();
};

/**
 * This method reinit the form with empty fields and default values for selects
 */
CucurbitaMaximaVegetalSheet.prototype.resetForm = function(){
    $("#createForm")[0].reset();
};



