var rec;
var list;
var myRec;
function startUp() {
    $(".dropdown-menu li").on("click", selectResource);
    $(".find").on("click", getResource);
}

var selectResource = function (item) {
    item = this.innerText;
    rec = item;
    $(".resourceSearch").val(item);
}

var getResource = function () {
    getCall(onSuccess, onError);
    initMap();
    $("#map").css('display', 'block');
    $('html, body').animate({
        scrollTop: $("#map").offset().top
    }, 2000);
}

var onSuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
        if (rec == data[i].Resource) {
            list = data[i];
            console.log(list);
        }
    }
     //$(location).attr('href', 'resources.html');
    //var newList = list;  
}

var onError = function (error) {
    console.log(error);
}

$(document).ready(startUp);