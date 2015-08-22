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
 * http://www.sitepoint.com/forums/showthread.php?305954-Need-JavaScript-to-go-with-the-seasons-Background
 */
function getSeason(){
    var today = new Date();
    var month = today.getMonth();
    if (today.getDate() > 20) month++;
    var season = Math.floor(month/3);
    var seasons = ["Hiver", "Printemps", "Eté", "Automne"];
    return seasons[season];
//    switch (season) {
//        case 1: alert('fall'); break;
//        case 2: alert('winter'); break;
//        case 3: alert('spring'); break;
//        default: alert('summer'); break;
//    }
}