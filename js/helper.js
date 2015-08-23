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