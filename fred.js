var res, list, address;
var markers = [];

function startUp() {
    $(".dropdown-menu li").on("click", selectResource);
    $(".find").on("click", getResource);
}

var selectResource = function (item) {
    item = this.innerText;
    res = item;
    $(".resourceSearch").val(item);
}

var getResource = function () {
    getCall(onSuccess, onError);
    //$("#map").css('display', 'block');
    $('html, body').animate({
        scrollTop: $("#map").offset().top
    }, 2000);
}

var cloneResource = function () {
    return $($("#clonedResource").html()).clone();
}

var onSuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
        if (res == data[i].Resource) {
            list = data[i]
            var collRes = {};
            collRes.organization = list.Organization;
            collRes.area = list.Area;
            collRes.phone = list.Phone;
            collRes.add = list.Address;
            setResource(collRes);
            if (list.Address) {
                addressGet(list.Address, onAddress, onError);
            }
        }
    }
    //$(location).attr('href', 'resources.html');
    //var newList = list;  
}

var setResource = function (collRes) {
    var setNewResource = cloneResource();
    $(".orgTitle", setNewResource).html(collRes.organization);
    $(".orgArea", setNewResource).html(collRes.area);
    $("#orgPhone", setNewResource).html(collRes.phone);
    $("#orgAdd", setNewResource).html(collRes.add);
    $(".resources").append(setNewResource);
}


var onAddress = function (results) {
    var result = results.results
    var image = {
        url: "http://www.clker.com/cliparts/y/b/j/m/C/x/map-marker-md.png",
        scaledSize: new google.maps.Size(28, 40),
    };
    if (result && results.status == "OK") {
        for (var i = 0; i < result.length; i++) {
            var info = result[i].formatted_address;
            address = result[i].geometry.location;
            marker = new google.maps.Marker({
                position: address,
                map: map,
                icon: image,
                animation: google.maps.Animation.DROP
            });

            marker.addListener("click", function () {
                infoWindow.setContent(info);
                infoWindow.open(map, this);
            });

            markers.push(marker);
        }

        var bounds = new google.maps.LatLngBounds(null);
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }
        map.fitBounds(bounds)
        google.maps.event.addListener(map, 'idle', function(event) {
            var cnt = map.getCenter();
            cnt.e+=0.000001;
            map.panTo(cnt);
            cnt.e-=0.000001;
            map.panTo(cnt);
        });
    } else {
        onError(status);
    }
}

var onError = function (error) {
    console.log(error);
}

$(document).ready(startUp);