var res, list, address, newClass;
var markers = [];

function startUp() {
    $(".dropdown-menu li").on("click", selectResource);
    $(".find").on("click", getResource);
    $(".resources").on("click", ".title", displayDesc);
    setTimeout(function() {
        initMap();
      }, 1000);
}

var displayDesc = function(descrip) {
    descrip = this.offsetParent;
    $(".description", descrip).toggleClass("desc");
}

var selectResource = function (item) {
    item = this.innerText;
    res = item;
    $(".resourceSearch").val(item);
}

var getResource = function () {
    if ($(".find").hasClass(res)) {
        $('html, body').animate({
            scrollTop: $("#map").offset().top
        }, 2000);
    } else {
        $(".find").addClass(res);
        getCall(onSuccess, onError);
        $('html, body').animate({
            scrollTop: $("#map").offset().top
        }, 2000);
    }
    
}

var cloneResource = function () {
    newClass = res.toLowerCase().replace(/\s+/g, '');
    return $($("#clonedResource").html()).clone().addClass(newClass);
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
            collRes.res = list.Resource;
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
    $(".orgPhone", setNewResource).attr('href', "tel:" + collRes.phone);
    $("#orgAdd", setNewResource).html(collRes.add);
    $(".resources").prepend(setNewResource);
}


var onAddress = function (results) {
    var result = results.results
    var icons = {
        homeless: {
            icon: "green-marker.png"
        },
        aplaceofworship: {
            icon: "red-marker.png"
        },
        clergycouncil: {
            icon: "purple-marker.png"
        },
        lapdvalleybureaucommunitypolicestations: {
            icon: "orange-marker.png"
        }, 
        women: {
            icon: "fuscia-marker.png"
        }
        
    };
    if (result && results.status == "OK") {
        for (var i = 0; i < result.length; i++) {
            var info = result[i].formatted_address;
            address = result[i].geometry.location;
            marker = new google.maps.Marker({
                position: address,
                map: map,
                icon: icons[newClass].icon,
                animation: google.maps.Animation.DROP
            });

            marker.addListener("click", function () {
                infoWindow.setContent(info);
                infoWindow.open(map, this);
            });

            markers.push(marker);
        }
        //need to loop through all markers and find closest markers to my position (pos)
        var bounds = new google.maps.LatLngBounds(null);
        for (var i = 0; i < 2; i++) {
            bounds.extend(markers[i].getPosition());
        }
        
        
        google.maps.event.addListener(map, 'idle', function (event) {
            var cnt = map.getCenter();
            cnt.e += 0.000001;
            map.panTo(cnt);
            cnt.e -= 0.000001;
            map.panTo(cnt);
        });
    } else {
        onError(status);
    }
    map.fitBounds(bounds);
    markers.splice(1);
}

var onError = function (error) {
    console.log(error);
}

$(document).ready(startUp);