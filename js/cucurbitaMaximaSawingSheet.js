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
    this.isHeaderForSawingCreated = false;
    this.lineNumber=0;
    this.header = JSON.parse(jQuery.i18n.prop("sawingHeaderFile"));
    this.headerId = JSON.parse(jQuery.i18n.prop("sawingHeaderIdFile"));

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    }
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

    if(!self.isHeaderForSawingCreated)
        self.createDataHeader("sawingHeaderFile", "sawingHeaderIdFile");

    if(params.ln)
        self.getContentAndfillForm(params.ln);

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
    this.extractColumnFromFileAndCallback("../data/vegetalSheet.csv", "Regne", this.fillNameSelect);
};

/**
 * Callback for filling the name select after reading the vegetal sheets file
 * @param nameList
 */
CucurbitaMaximaSawingSheet.prototype.fillNameSelect = function(nameList){
    $.each( nameList, function( i, d )
    {
        $( "#nameSelect" ).append( "<option value='" + d + "'>" + d + "</option>" );
    } );
    $( "#nameSelect" ).select2();
};

/**
 * This method creates the calendars for moon period & plant date
 */
CucurbitaMaximaSawingSheet.prototype.createCalendars = function(){
    var self = this;
    $( "#plantDate" ).datepicker({
        dateFormat: dateFormat,
        setDate: new Date(),
        onSelect: function() {
            var pickerDate = $("#plantDate").datepicker('getDate');
            $("#plantDateWeek").html("(semaine : "+$.datepicker.iso8601Week(pickerDate) +")");
            self.calculateCrop();
            self.checkPlantDateWithMoon();
        }
    });

    $( "#moonBegin" ).datepicker({
        dateFormat: dateFormat,
        setDate: new Date(),
        onSelect: function() {
            var pickerDate = $("#moonBegin").datepicker('getDate');
            $( "#moonEnd" ).datepicker( "option", "minDate", pickerDate );
            self.checkPlantDateWithMoon();
        }
    });

    $( "#moonEnd" ).datepicker({
        dateFormat: dateFormat,
        setDate: new Date(),
        onSelect: function() {
            var pickerDate = $("#moonEnd").datepicker('getDate');
            $( "#moonBegin" ).datepicker( "option", "maxDate", pickerDate );
            self.checkPlantDateWithMoon();
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

/**
 * This method fills the form with values from the file line
 * @param dataLine
 */
CucurbitaMaximaSawingSheet.prototype.fillForm = function(dataLine){
    var values = dataLine.replace("\n", "").split(",");
    $.each(this.headerId, function(i,d){
        $("#"+d).val(values[i]);
    });
};


/****************************************************/
/** ********************* LIST ******************* **/
/****************************************************/
CucurbitaMaximaSawingSheet.prototype.list = function() {
    this.readFileAndDisplayContent();
};

/**
 * This method read the file and display the content
 */
CucurbitaMaximaSawingSheet.prototype.readFileAndDisplayContent = function() {
    var self = this;
    d3.csv(self.dataFile, function (error, csv) {
        // Header columns
        self.header = d3.keys(csv[0]);
        if(self.lineNumber == csv.length) alert("Erreur sur le fichier, veuillez vérifier les droits d'accès.");
        self.lineNumber = csv.length;

        $("#total-count").html(csv.length);
        self.displayDataHeader();
        self.displayDataTable(csv, self.header);
        self.initToolTip();

        // Data
//        self.data = crossfilter(csv);
//        var dimensionHeader = self.data.dimension(function(d) {
//            return d;
//        });
    });
};

/**
 * This method displays the header.
 */
CucurbitaMaximaSawingSheet.prototype.displayDataHeader = function() {
    var self = this;
    $("#headerData").empty();

    if(self.header && self.header.length > 0){
        $("#headerData").append("<th>Numéro</th>");

        $.each(self.header, function(i, d) {
            var thElement = $("<th></th>");
            thElement.html("<span>" + d + "</span>");
            $("#headerData").append(thElement);
        });
        var thElement = $("<th colspan='2'>Actions</th>");
        $("#headerData").append(thElement);
    }
};

/**
 * This method displays the file's content.
 * @param csv
 */
CucurbitaMaximaSawingSheet.prototype.displayDataTable = function(csv) {
    var self = this;
    $("#dataContent").empty();

    if(csv.length <= 0) $("#dataContent").html("<center>Aucune fiche enregistrée.</center>");

    $.each(csv, function(i, d) {
        var keys = d3.keys(d);
        var trElement = $("<tr></tr>");
        trElement.attr("class", "dc-table-group");

        // Line number
        trElement.append($('<td>'+(i+1)+'</td>'));

        keys.forEach(function(ff,ii) {
            var tdElement = $("<td></td>");
            tdElement.html("<span>" + d[keys[ii]] + "</span>");
            trElement.append(tdElement);
        });
        var modifyImage = $('<td><a href="../html/vegetalSheetCreate.php?ln='+(i+1)+'"><img src="../img/15.png" width="30px" class="toolTipData" title="Modifier la fiche"/></a></td>');
        trElement.append(modifyImage);
        var removeImage = $('<td><img src="../img/118.png" width="30px" class="toolTipData" title="Supprimer la fiche"/></td>');
        removeImage.on("click", function(){
            self.removeElement(i);
        });
        trElement.append(removeImage);

        $("#dataContent").append(trElement);
    })
};

/**
 * This method remove a sheet by its line number.
 * @param lineNumber
 */
CucurbitaMaximaSawingSheet.prototype.removeElement = function(lineNumber){
    var self = this;
    lineNumber++;
    if(confirm("Confirmer la suppression de la fiche numéro "+lineNumber)){
        $.ajax( {
            url:'../phpScript/removeLine.php?fileName=sheetFile&ln='+lineNumber,
            type:'GET',
            error: function()
            {
                alert( "Erreur : suppression non effectuée ! Veuillez vérifier les droits du fichier." );
            },
            success: function()
            {
                self.readFileAndDisplayContent();
            }
        } );
    }
};



