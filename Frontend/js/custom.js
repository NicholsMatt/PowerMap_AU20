$(function() {
    "use strict";

    $(".preloader").fadeOut();
    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").on('click', function() {
        $("#main-wrapper").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
    });
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function() {
        $(".app-search").toggle(200);
        $(".app-search input").focus();
    });

    // ==============================================================
    // Resize all elements
    // ==============================================================
    $("body, .page-wrapper").trigger("resize");
    $(".page-wrapper").delay(20).show();

    //****************************
    /* This is for the mini-sidebar if width is less then 1170*/
    //****************************
    var setsidebartype = function() {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        if (width < 1170) {
            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
        } else {
            $("#main-wrapper").attr("data-sidebartype", "full");
        }
    };
    $(window).ready(setsidebartype);
    $(window).on("resize", setsidebartype);

});

let map;

function initMap() {

  //Central Ohio location
  const centralOhio = {lat: 39.960770, lng: -82.999038};

   const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: centralOhio,
  });

  //Marker for power pole
  //const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  const image = "images/pole_white.png";

  const poleMarker = new google.maps.Marker({
    position: {lat: 39.91868883204806, lng:-82.86456906501846},
    map,
    icon: image,
  });
}
