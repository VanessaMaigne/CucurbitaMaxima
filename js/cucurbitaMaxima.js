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
