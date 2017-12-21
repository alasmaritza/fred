var getResourcesCall = function(onSuccess, onError) {
    var url = "https://5a3ab32bde64a00012627764.mockapi.io/resource";
    var settings = {
        cache: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        type: "GET"
    }
    $.ajax(url, settings);
}

var getOrgsCall = function(id, onSuccess, onError) {
    var url = "https://5a3ab32bde64a00012627764.mockapi.io/resource/" + id + "/location";
    var settings = {
        cache: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        data: id,
        success: onSuccess,
        error: onError,
        type: "GET"
    }
    $.ajax(url, settings)
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