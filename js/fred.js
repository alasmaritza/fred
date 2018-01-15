var res, list, address, newClass;
var infoContent = null;
var markers = [];

function startUp() {
    displayResources();
    $("#enterZip").on("focusout", setNewCenter);
    $(".dropdown-menu").on("click", "li", selectResource);
    $(".find").on("click", getResource);
    $("#resourceSearch").on("focus", removeCards);
    $(".resources").on("click", ".title", displayDesc);
    setTimeout(function () {
        initMap();
    }, 1000);
}

var setNewCenter = function (e, data) {
    if (marker) {
        marker.setMap(null);
    }
    markers.shift();
    data = this.value;
    addressGet(data, onZipSuccess, onError);
}

var onZipSuccess = function (data) {
    var center = data.results[0].geometry.location;
    var image = {
        url: "img/yellow-marker.png"
    }
    marker = new google.maps.Marker({
        position: center,
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP
    });
    markers.push(marker);
    map.setCenter(center);
}

var displayResources = function () {
    getResourcesCall(onDisplaySuccess, onError);
}

var onDisplaySuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#resources-list").append("<li id='" + data[i].id + "'>" + data[i].name + "</li>");
    }
}

var displayDesc = function (descrip) {
    descrip = this.offsetParent;
    $(".description", descrip).toggleClass("desc");
}

var selectResource = function (event) {
    item = event.target.id;
    res = item;
    $(".resourceSearch").val(event.target.innerText);
}

var getResource = function () {
    getOrgsCall(item, onSuccess, onError);
    $('html, body').animate({
        scrollTop: $("#map").offset().top
    }, 2000);
}

var cloneResource = function () {
    newClass = res.toLowerCase().replace(/\s+/g, '');
    return $($("#clonedResource").html()).clone().addClass(newClass);
}

var onSuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
       var orgs = data[i];
        var collRes = {};
        collRes.organization = orgs.name;
        collRes.phone = orgs.phone;
        collRes.add = orgs.address;
        collRes.add2 = orgs.addressLine2;
        collRes.site = orgs.websiteURL;
        setResource(collRes);
        if (orgs.address) {
            addressGet(orgs.address + orgs.addressLine2, onAddress, onError);
            infoContent = '<span><strong>' + orgs.name + '</strong><br>' + orgs.address + '<br>' + orgs.addressLine2 + '</span>';
        };
    }
}

var setResource = function (collRes) {
    var setNewResource = cloneResource();
    $(".orgTitle", setNewResource).html(collRes.organization);
    $(".orgArea", setNewResource).html(collRes.area);
    $("#orgPhone", setNewResource).html(collRes.phone);
    $(".orgPhone", setNewResource).attr('href', "tel:" + collRes.phone);
    $("#orgSite", setNewResource).html(collRes.site);
    $(".orgSite", setNewResource).attr('href', collRes.site);
    $("#orgAdd", setNewResource).html(collRes.add);
    $("#orgAdd2", setNewResource).html(collRes.add2);
    $(".resources").prepend(setNewResource);
}

var onAddress = function (results, status) {
    var result = results.results;
    if ("OK" == google.maps.GeocoderStatus.OK) {
        var geometry = result[0].geometry;
        address = geometry.location;
        marker = new google.maps.Marker({
            position: address,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: "img/green-marker.png"
        });

        markers.push(marker);

        var bounds = new google.maps.LatLngBounds(null);
        for (var i = 0; i < markers.length; i++) {
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
    // var infoContent = '<span><strong>' + orgs.name + '</strong><br>' + orgs.address + '<br>' + orgs.addressLine2 + '</span>';
    addInfoWindow(marker, infoContent);
}

var addInfoWindow = function(marker, info) {
    var infowindow = new google.maps.InfoWindow({
        content: info
      });

      marker.addListener('click', function() {
        infowindow.open(map, this);
      });
 }

var onError = function (error) {
    console.log(error);
}

var removeCards = function () {
    $(".cloneRes").remove();
}

$(document).ready(startUp);