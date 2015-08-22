/**
 * CucurbitaMaxima _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains general methods for CurcubitaMaxima project
 *
 */

jQuery.i18n.properties( {
    name:'cucurbitaMaxima',
    path:'/git/CucurbitaMaxima/',
    language:null,
    mode:'both'
} );

// URL parameters
var params={};
window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});

var cucurbitaDateFormat = "dd/mm/yy";
var cucurbitaDateFormatForD3 = d3.time.format('%d/%m/%Y');


function CucurbitaMaxima(){
    var localFormat = d3.time.format('%A %e %B %Y %Hh%M');
    this.dateValue = localFormat(new Date());

    this.init = function(){
        var season = getSeason();
        $("#dateValue").html(this.dateValue+", "+season);
        this.initToolTip();
    };

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    };
}

CucurbitaMaxima.prototype.booleanForHeaderCreation = new Object();
CucurbitaMaxima.prototype.booleanForHeaderCreation["sawing"] = false;
CucurbitaMaxima.prototype.booleanForHeaderCreation["vegetal"] = false;


/****************************************************/
/** *************** ACTIONS IN FILE ************** **/
/****************************************************/
/**
 * This method create the headers from the properties and from the file (if not empty) to replace the titles one.
 * If the file is empty, it fills with the header from the properties
 */
CucurbitaMaxima.prototype.createDataHeader = function(type){
    var self = this;

    $.ajax( {
        url:'../phpScript/getLineContent.php?fileNameProperties='+self.dataFileProperty+'&ln=0',
        type:'GET',
        error: function(){ alert( "Erreur. Veuillez vérifier le contenu et les droits du fichier." ); },
        success: function(data)
        {
            var headerFromFile = data.split(",");
            if(headerFromFile == ""){
                $.ajax( {
                    url:'../phpScript/writeContent.php?fileNameProperties='+self.dataFileProperty+'&content='+self.header,
                    type:'GET',
                    error: function(){ alert( "Erreur d'écriture. Veuillez vérifier le contenu et les droits du fichier." );},
                    success: function(){
                        self.booleanForHeaderCreation[type] = true;
                    }
                } );
            } else {
                self.header = headerFromFile;
                self.booleanForHeaderCreation[type] = true;
            }
        }
    });
};

/**
 * This method extract values from a given column and launch the callback function on these values
 * @param filePath
 * @param columnName
 * @param callback
 */
CucurbitaMaxima.prototype.extractColumnFromFileAndCallback = function(filePath, columnName, callback){
    d3.csv(filePath, function (error, csv) {
        var columnValues = new Array();

        var data = crossfilter(csv);
        data.dimension(function(d) {
            return d[columnName];
        }).filter(function(key) {
                if(key != "") columnValues.push(key);
            });

        if(callback)
            callback(columnValues);
    });
};


/****************************************************/
/** ******************** FORM ******************** **/
/****************************************************/

/**
 * This method init form with submit, reset and save events
 */
CucurbitaMaxima.prototype.initForm = function(){
    var self = this;

    // Buttons & events
    $("#createForm").on("submit", function(e){
        if (e.isDefaultPrevented()) {
            $("#actionMessage").html("<span class='warning'>Il reste des champs à corriger</span>");
        } else {
            e.preventDefault(); // Avoid to launch the event submit
            self.saveForm();
        }
    });

    $("#saveForm").on("click", function(){
        $("#createForm").submit();
    });
    $("#resetForm").on("click", function(){
        self.resetForm();
    });
};

/**
 * This method save the form's fields in the file. The header is already saved in file.
 */
CucurbitaMaxima.prototype.saveForm = function(){
    var content = "";
    $.each(this.headerId, function(i,d){
        content += $("#"+d).val()+",";
    });

    var url = '../phpScript/writeContent.php?fileNameProperties='+this.dataFileProperty+'&content='+content;
    if(params.ln)
        url += "&ln="+params.ln;

    // Write in file
    $.ajax( {
        url:url,
        type:'GET',
        error: function(){ alert( "Erreur : suppression non effectuée. Veuillez vérifier le contenu et les droits du fichier." ); },
        success: function()
        {
            if(params.ln) $("#actionMessage").html("Fiche modifiée !");
            else $("#actionMessage").html("Fiche créée !");
        }
    } );
};

/**
 * This method modifies a sheet by getting the fields's values from the file and filling the form.
 * @param lineNumber
 */
CucurbitaMaxima.prototype.getContentAndfillForm = function(lineNumber){
    var self = this;
    $.ajax( {
        url:'../phpScript/getLineContent.php?fileNameProperties='+self.dataFileProperty+'&ln='+lineNumber,
        type:'GET',
        error: function(){ alert( "Erreur : contenu non lisible. Veuillez vérifier le contenu et les droits du fichier." ); },
        success: function(data)
        {
            self.fillForm(data);
        }
    } );
};


