var getCall = function(onSuccess, onError) {
    var url = "fred.json";
    var settings = {
        cache: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        type: "GET"
    }
    $.ajax(url,settings);
}

var addressGet = function (address, onSuccess, onError) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "+CA&key=AIzaSyDNwXQefIZFHE25kjvwHx2ilGuiKt8paQA";
    var settings = {
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        type: "GET"
    }
    $.ajax(url, settings);
}