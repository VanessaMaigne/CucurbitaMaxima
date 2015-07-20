function initToolTip() {
//    var toolTip = d3.tip()
//        .attr('class', 'd3-tip')
//        .offset([-10,0])
//        .html(function (d) {
//            alert("icisss");
//            return "<span class='d3-tipTitle'>" + d.data.key + " : </span>" + d.data.value;
//        });

    $(".basicButton, .toolTipData").tooltip({
        placement: "top",
        container:'body'});
}
