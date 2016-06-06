$(document).ready(function () {
    gridcontent = $(".resp-tabs-container");
    var sizer = gridcontent.find(".item-box");
    
    gridcontent.shuffle({
        sizer: sizer,
        speed: 500,
        easing:'ease-out'
    })



})