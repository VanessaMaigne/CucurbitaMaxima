/**
 * Method used to extend prototype of object
 * @param child
 * @param parent
 */
var extendClass = function(child, parent) {
    var Surrogate = function() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
};


/**
 * Method extract the path for the properties file from the url
 * @param hostIndicator
 */
function getPropertiesFilePath(hostIndicator){
// Calcul path for properties file
    var pathName = window.location.pathname.toLocaleLowerCase();
    var urlArray = window.location.pathname.split("/");
    var index = pathName.split("/").indexOf(hostIndicator);

    var pathForProperties = "";
    for(var i=0; i<=index; i++){
        pathForProperties+=urlArray[i]+"/";
    }
    return pathForProperties;
}

/**
 * Method return the actual season
 */
function getSeason(){
    var today = new Date();
    var result = new Object();

    if(today >= $.datepicker.parseDate("dd/mm", "21/03") && today < $.datepicker.parseDate("dd/mm", "21/06")){
        result.name = "Printemps";
        result.period = "("+$.datepicker.formatDate("dd MM", $.datepicker.parseDate("dd/mm", "21/03"))+", "+$.datepicker.formatDate("dd MM", $.datepicker.parseDate("dd/mm", "21/06"))+")";
    }
    if(today >= $.datepicker.parseDate("dd/mm", "21/06") && today < $.datepicker.parseDate("dd/mm", "23/09")){
        result.name = "Eté";
        result.period = "("+$.datepicker.formatDate("dd MM", $.datepicker.parseDate("dd/mm", "21/06"))+", "+$.datepicker.formatDate("dd MM", $.datepicker.parseDate("dd/mm", "23/09"))+")";
    }
    if(today >= $.datepicker.parseDate("dd/mm", "23/09") && today < $.datepicker.parseDate("dd/mm", "22/12")){
        result.name = "Automne";
        result.period = "("+$.datepicker.formatDate("dd MM", $.datepicker.parseDate("dd/mm", "23/09"))+", "+$.datepicker.formatDate("dd MM", $.datepicker.parseDate("dd/mm", "22/12"))+")";
    }
    if(today >= $.datepicker.parseDate("dd/mm", "22/12") && today < $.datepicker.parseDate("dd/mm", "21/03")){
        result.name = "Hiver";
        result.period = "("+$.datepicker.formatDate("dd MM", $.datepicker.parseDate("dd/mm", "22/12"))+", "+$.datepicker.formatDate("dd MM", $.datepicker.parseDate("dd/mm", "21/03"))+")";
    }
    return result;
}

/**
 * Method remove accent from text
 * @param Texte
 */
function replaceSpec(Texte){
    var TabSpec = {"à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","è":"e","é":"e","ê":"e","ë":"e","ç":"c","ì":"i","í":"i","î":"i","ï":"i","ù":"u","ú":"u","û":"u","ü":"u","ÿ":"y","ñ":"n","-":" ","_":" "};
    var reg=/[àáâãäåòóôõöøèéêëçìíîïùúûüÿñ_-]/gi;
    return Texte.replace(reg,function(){ return TabSpec[arguments[0].toLowerCase()];}).toLowerCase();
}


/**
 * Method to get the year for the moon calculate
 * @param now
 */
function getFullYear(now) {
    var year = now.getYear();
    if (year==0) {year=2000};
    if (year<1900) {year=year+1900};
    return year;
}

function datestring(year,month,day) {
// provides a locale independent format - year:month:day
    var datestr = "";  datestr += year;
    datestr += ((month < 10) ? "/0" : "/") + month;
    datestr += ((day < 10) ? "/0" : "/") + day;
    return datestr;
}