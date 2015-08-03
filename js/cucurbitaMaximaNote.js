jQuery.i18n.properties( {
    name:'cucurbitaMaxima',
    path:'../',
    language:null,
    mode:'both'
} );

function CucurbitaMaximaNoteCreate(){

    this.init = function(){
        this.initToolTip();
    };

    this.initToolTip = function() {
        $(".basicButton").tooltip({
            placement: "top",
            container:'body'});
    }
}

function CucurbitaMaximaNoteList(){
//    this.header;
//    this.data;
    this.dataFile = jQuery.i18n.prop("dataFile");
    this.lineNumber=0;

    this.init = function(){
        this.readFileAndDisplayContent();
    };

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    };
}

CucurbitaMaximaNoteList.prototype.readFileAndDisplayContent = function() {
    var self = this;
    d3.csv(self.dataFile, function (error, csv) {
        // Header columns
        self.header = d3.keys(csv[0]);
        if(self.lineNumber == csv.length) alert("Erreur sur le fichier, veuillez vérifier les droits d'accès.");
        self.lineNumber = csv.length;

        self.displayNumber(csv.length);
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

CucurbitaMaximaNoteList.prototype.displayNumber = function(number) {
    $("#total-count").html(number);
};

CucurbitaMaximaNoteList.prototype.displayDataHeader = function() {
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

CucurbitaMaximaNoteList.prototype.displayDataTable = function(csv) {
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
        var modifyImage = $('<td><a href="../html/noteCreate.php?ln='+(i+1)+'"><img src="../img/15.png" width="30px" class="toolTipData" title="Modifier la fiche"/></a></td>');
        modifyImage.on("click", function(){
            self.modifyElement(i);
        });
        trElement.append(modifyImage);
        var removeImage = $('<td><img src="../img/118.png" width="30px" class="toolTipData" title="Supprimer la fiche"/></td>');
        removeImage.on("click", function(){
            self.removeElement(i);
        });
        trElement.append(removeImage);

        $("#dataContent").append(trElement);
    })
};

CucurbitaMaximaNoteList.prototype.modifyElement = function(element){
};

CucurbitaMaximaNoteList.prototype.removeElement = function(lineNumber){
    var self = this;
    lineNumber++;
    if(confirm("Confirmer la suppression de la fiche numéro "+lineNumber)){
        $.ajax( {
            url:'../phpScript/removeLine.php?ln='+lineNumber,
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



