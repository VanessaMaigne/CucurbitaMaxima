/**
 * CucurbitaMaximaHome _ version 1.0
 * ##################################################
 *   Created by vmaigne@gmail.com _ august 2015
 * ##################################################
 * This file contains general methods for CurcubitaMaxima project
 *
 */

jQuery.i18n.properties( {
    name:'cucurbitaMaxima',
    path:'../',
    language:null,
    mode:'both'
} );

// URL parameters
var params={};
window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});

var dateFormat = "dd/mm/yy";

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
