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


/*
******************
* CODE FROM MATT *
******************
*/

let map;

function initMap() {

  //Central Ohio location
  const centralOhio = {lat: 39.960770, lng: -82.999038};

   const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: centralOhio,

    //Move zoom controls to top left
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
    },

    //Enable/disable fullscreen button
    fullscreenControl: false //CURRENTLY CANNOT MOVE TO TOP LEFT
  });

  //Text for pop-up
  const contentString = '<h1 id = "firstHeading" class="firstHeading">Low Voltage Pole</h1>' 
                        + "<p><b>This is where we would put data for the power pole. yeeee.</p>" + "</div>" + "</div>";

  const infowindow = new google.maps.InfoWindow({
      content: contentString,
  });

  //Set icons for different kinds of power pole markers
  const icons = {
      lowVoltage: {
          icon: "images/pole_white.png",
      },
  };

  const features = [
    {
        position: {lat: 39.91868883204806, lng:-82.86456906501846},
        type: "lowVoltage",
    },

    {
        position: {lat: 39.94988474261101, lng:-83.17941221349473},
        type: "lowVoltage",
    },
  ];

  //Create markers
  for(let i = 0; i < features.length; i++){
    const marker = new google.maps.Marker({
    position: features[i].position,
    title: "Low Voltage Power Pole",
    icon: icons[features[i].type].icon,
    map: map,
     });

     marker.addListener("click", () => {
        //infowindow.open(map, marker);
         unhidePanel();
    });
  }
}
function unhidePanel() {
    var x = document.getElementById("info-panel");
    //load data
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://osuhackathondata.s3.us-east-2.amazonaws.com/000006-backleft-43a7932a-33b1-4ca6-af1a-fad37fbeecaa-76.json"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url)
        .then(response => response.text())
        .then(contents => console.log(contents))
        .catch(() => console.log("Can’t access " + url))
        var jsonobj = JSON.parse(contents);
        document.getElementById("voltage").innerHTML = jsonobj.image.fov;
    };


//document.getElementById("close_info").onclick() = function () {
//    x.style.display == "none"
//    } 
//}
document.getElementById("close_info").onclick = function () { hidePanel() };

function hidePanel() {
    document.getElementById("info-panel").style.display = "none";
}
