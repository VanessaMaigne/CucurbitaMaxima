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
    this.lineNumber=0;
    this.header = null;
    this.headerId = null;

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    }
}


/****************************************************/
/** ******************** CREATE ****************** **/
/****************************************************/
CucurbitaMaximaVegetalSheet.prototype.create = function(){
    var self = this;
    self.initToolTip();
    self.createDataHeaders();

    if(params.ln)
        self.getContentAndfillForm(params.ln);

    // Buttons
    $("#saveForm").on("click", function(){
        self.saveForm();
    });
    $("#resetForm").on("click", function(){
        self.resetForm();
    });
};

/**
 * This method create the headers from the form (title & id) and from the file (if not empty) to replace the titles one.
 * If the file is empty, it fills with the header from the form
 */
CucurbitaMaximaVegetalSheet.prototype.createDataHeaders = function(){
    var self = this;
    var fields = $("#createForm input.form-control");
    self.header = new Array();
    self.headerId = new Array();
    $.each(fields, function(i, d){
        if(d.attributes.title && d.attributes.title.value) self.header.push(d.attributes.title.value);
        if(d.attributes.id && d.attributes.id.value) self.headerId.push(d.attributes.id.value);
    });
    self.setHeader();
};

/**
 * This method get the headers from the first line of the file.
 * If the file is empty, it fills it with the headers getted from the form
 */
CucurbitaMaximaVegetalSheet.prototype.setHeader = function(){
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
                    error: function(){ alert( "Erreur d'écriture. Veuillez vérifier le contenu et les droits du fichier." ); }
                } );
            } else self.header = headerFromFile;
        }
    } );
};

/**
 * This method save the form's fields in the file. The header is already saved in file.
 */
CucurbitaMaximaVegetalSheet.prototype.saveForm = function(){
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
 * This method reinit the form with empty fields and default values for selects
 */
CucurbitaMaximaVegetalSheet.prototype.resetForm = function(){
    $("#createForm")[0].reset();
};

/**
 * This method modifies a sheet by getting the fields's values from the file and filling the form.
 * @param lineNumber
 */
CucurbitaMaximaVegetalSheet.prototype.getContentAndfillForm = function(lineNumber){
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


/**
 * This method fills the form with values from the file line
 * @param dataLine
 */
CucurbitaMaximaVegetalSheet.prototype.fillForm = function(dataLine){
    var values = dataLine.replace("\n", "").split(",");
    $.each(this.headerId, function(i,d){
        $("#"+d).val(values[i]);
    });
};


/****************************************************/
/** ********************* LIST ******************* **/
/****************************************************/
CucurbitaMaximaVegetalSheet.prototype.list = function() {
    this.readFileAndDisplayContent();
};

/**
 * This method read the file and display the content
 */
CucurbitaMaximaVegetalSheet.prototype.readFileAndDisplayContent = function() {
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
CucurbitaMaximaVegetalSheet.prototype.displayDataHeader = function() {
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
CucurbitaMaximaVegetalSheet.prototype.displayDataTable = function(csv) {
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
CucurbitaMaximaVegetalSheet.prototype.removeElement = function(lineNumber){
    var self = this;
    lineNumber++;
    if(confirm("Confirmer la suppression de la fiche numéro "+lineNumber)){
        $.ajax( {
            url:'../phpScript/removeLine.php?fileNameProperties='+self.dataFileProperty+'&ln='+lineNumber,
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


