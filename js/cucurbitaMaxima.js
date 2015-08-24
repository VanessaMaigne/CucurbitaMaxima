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
    var localFormat = d3.time.format('%A %e %B %Y&nbsp;&nbsp;%Hh%M');
    this.dateValue = localFormat(new Date());
    this.moonArray =JSON.parse(jQuery.i18n.prop("moonArray"));
    this.moonArrayNameImg =JSON.parse(jQuery.i18n.prop("moonArrayNameImg"));

    this.init = function(){
        var season = getSeason();
        $("#season").attr("src","img/"+replaceSpec(season.name)+".png");
        $("#season").attr("title", season.name+" "+season.period);
        $("#dateValue").html(this.dateValue);

        // Animate zones climatiques image
//        var small={width:"150px",height:"150px"};
//        var large={width:"400px",height:"400"};
//        var count=1;
//        $("#climateZones").css(small).on('click',function () {
//            $(this).animate((count==1)?large:small);
//            count = 1-count;
//        });

        this.calculateMoon();
        this.initToolTip();
    };
}

// Prototype variables
CucurbitaMaxima.prototype.booleanForHeaderCreation = new Object();
CucurbitaMaxima.prototype.booleanForHeaderCreation["sawing"] = false;
CucurbitaMaxima.prototype.booleanForHeaderCreation["vegetal"] = false;
CucurbitaMaxima.prototype.separator = "|";
CucurbitaMaxima.prototype.dsv = d3.dsv(CucurbitaMaxima.prototype.separator, "text/plain");

CucurbitaMaxima.prototype.initToolTip = function() {
    $(".basicButton, .toolTipData, #banner img").tooltip({
        placement: "bottom",
        container:'body'});
};


/****************************************************/
/** ********************* HOME ******************* **/
/****************************************************/
/**
 * https://github.com/mourner/suncalc
 * http://www.aphayes.pwp.blueyonder.co.uk/sun_moon.html
 * https://stardate.org/nightsky/moon
 */
CucurbitaMaxima.prototype.calculateMoon = function() {
    var self = this;
    var now=new Date();
    var Year=getFullYear(now);
    var JDE=MoonQuarters(Year,now.getMonth()+1,now.getDate());

    var title="";
    var quarter = new Object();
    $.each(JDE, function(i,d){
        var JDEc=jdtocd(d);
        var quarterDate = $.datepicker.parseDate("dd/mm", JDEc[2]+"/"+JDEc[1]);
        if(now > quarterDate) {
            quarter.name = self.moonArray[i];
            quarter.image = self.moonArrayNameImg[i];
        }
        title += self.moonArray[i]+" : "+datestring(JDEc[0],JDEc[1],JDEc[2])+", ";
    });
    $("#moon").attr("title", title);
    $("#moon").attr("src", "img/"+quarter.image);
};


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
                var content = self.header.join(self.separator);
                $.ajax( {
                    url:'../phpScript/writeContent.php?fileNameProperties='+self.dataFileProperty+'&content='+content,
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

/**
 * This method remove a line from a file by its line number
 * @param lineNumber
 */
CucurbitaMaxima.prototype.removeElement = function(lineNumber){
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


/****************************************************/
/** ******************** FORM ******************** **/
/****************************************************/

/**
 * This method init form with submit, reset and save events
 */
CucurbitaMaxima.prototype.initForm = function(){
    var self = this;

    // Buttons & events
    $("#createForm input").on("blur", function(d){
        var value = $(this).val();
        $(this).val(value.charAt(0).toUpperCase()+value.substring(1));
    });

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
    var self=this;
    $.each(this.headerId, function(i,d){
        content += $("#"+d).val()+self.separator;
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

/**
 * This method fills the form with values from the file line
 * @param dataLine
 */
CucurbitaMaxima.prototype.fillForm = function(dataLine){
    var values = dataLine.replace("\n", "").split(this.separator);
    $.each(this.headerId, function(i,d){
        $("#"+d).val(values[i]);
    });
};


/****************************************************/
/** ******************** LIST ******************** **/
/****************************************************/
/**
 * This method list the content of the data file
 */
CucurbitaMaxima.prototype.list = function() {
    this.readFileAndDisplayContent();
};

/**
 * This method read the file and display the content
 */
CucurbitaMaxima.prototype.readFileAndDisplayContent = function() {
    var self = this;
    this.dsv(self.dataFile, function (error, csv) {
        $("#total-count").html(csv.length);
        self.displayDataHeader();
        self.displayDataTable(csv);
        self.initToolTip();
    });
};

/**
 * This method displays the header.
 */
CucurbitaMaxima.prototype.displayDataHeader = function() {
    var self = this;
    $("#headerData").empty();

    if(self.headerToDisplay && self.headerToDisplay.length > 0){
        $("#headerData").append("<th>N°</th>");
        $.each(self.headerToDisplay, function(i, d) {
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
CucurbitaMaxima.prototype.displayDataTable = function(csv) {
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
            if(-1 != jQuery.inArray(ff, self.headerToDisplay)){
                var tdElement = $("<td></td>");
                tdElement.html("<span>" + d[keys[ii]] + "</span>");
                trElement.append(tdElement);
            }
        });

        var modifyImage = $('<td><a href="'+self.createFileName+'?ln='+(i+1)+'"><img src="../img/15.png" width="30px" class="toolTipData" title="Modifier la fiche"/></a></td>');
        trElement.append(modifyImage);
        var removeImage = $('<td><img src="../img/118.png" width="30px" class="toolTipData" title="Supprimer la fiche"/></td>');
        removeImage.on("click", function(){
            self.removeElement(i);
        });
        trElement.append(removeImage);

        $("#dataContent").append(trElement);
    })
};

