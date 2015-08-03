function CucurbitaMaximaHome(){

    this.dateValue = $.datepicker.formatDate('DD dd MM yy', new Date());

    this.init = function(){
        $("#dateValue").html(this.dateValue);
        this.initToolTip();
    };

    this.initToolTip = function() {
        $(".basicButton, .toolTipData").tooltip({
            placement: "top",
            container:'body'});
    };
}

//function Lapin(adjectif) {
//  this.adjectif = adjectif;
//  this.parler = function(tirade) {
//    alert("Le lapin "+ this.adjectif + " dit '" + tirade, "'");
//  };
//}
//
//
//var lapinTueur = new Lapin("tueur");
//
//Lapin.prototype.dents = "petites";
//alert(lapinTueur.dents);
//lapinTueur.dents = "longues, pointues et sanglantes";
//alert(lapinTueur.dents);
//alert(Lapin.prototype.dents);