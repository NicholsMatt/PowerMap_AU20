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
var base_URL = 'http://187e5f2f3ea8.ngrok.io/';
async function initMap() {

  //Central Ohio location
  const centralOhio = {lat: 39.960770, lng: -82.999038};

   const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
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
          icon: "images/lowVoltage.png",
      },
  };
    /*
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
  
  const polesURL = base_URL + 'poles';
 fetch(polesURL)
        .then(res => res.json())
        .then((out) => {
            loc_json = out;
        }).catch(err => console.error(err));
*/
    var loc_json;
    const polesURL = base_URL + 'poles';
   
    
     await fetch(polesURL).then( async function (response) {
        // response.json() returns a promise, use the same .then syntax to work with the results
         await response.json().then(async function (poledata) {
            // users is now our actual variable parsed from the json, so we can use it
            //poledata.forEach(function (data) {
            //    console.log(user.name)
            //});

            //document.getElementById("voltage").innerHTML = poledata.image.fov;
            console.log(poledata);
            loc_json = poledata;
            await console.log(loc_json);
        });
        //.then(response => response.text())
        //.then(contents => console.log(contents))
    }).catch(() => console.log("Can't access " + url))
    /*
getCoords()
        .then(data => loc_json)
    console.log(loc_json)
    */
   // await request();
  //Create markers
    console.log('test1');
    for (let i = 0; i < loc_json.length; i++){
        
        var b = loc_json[i].pole_data.coordinates[0];
        loc_json[i].pole_data.coordinates[0] = loc_json[i].pole_data.coordinates[1];
        loc_json[i].pole_data.coordinates[1] = b;
        console.log(loc_json[i].pole_data.coordinates)
        positionA = { lat: loc_json[i].pole_data.coordinates[0], lng: loc_json[i].pole_data.coordinates[1] }
        
    const marker = new google.maps.Marker({
        position: positionA,
        title: "Low Voltage Power Pole",
        icon: icons["lowVoltage"].icon,
        store_id: i+1,
        map: map,
     });
     
     marker.addListener("click", () => {
        //infowindow.open(map, marker);
         id = marker.get('store_id');
         console.log(id)
        

         unhidePanel(id);
    });
  }
}


async function getCoords() {
    const polesURL = base_URL + 'poles';
    let response = await fetch(polesURL);
    let data = await response.json()
    return data;
}
const request = async () => {
    const polesURL = base_URL + 'poles';
    const response = await fetch(polesURL);
    const json = await response.json();
    console.log(json);
    return json;

}

function unhidePanel( id) {
    var x = document.getElementById("info-panel");
    //load data
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://osuhackathondata.s3.us-east-2.amazonaws.com/000006-backleft-43a7932a-33b1-4ca6-af1a-fad37fbeecaa-76.json"; // site that doesn�t send Access-Control-*

    fetch(proxyurl + url).then(function (response) {
        // response.json() returns a promise, use the same .then syntax to work with the results
        response.json().then(function (poledata) {
            // users is now our actual variable parsed from the json, so we can use it
            //poledata.forEach(function (data) {
            //    console.log(user.name)
            //});

            //set overall data for pole

            document.getElementById("pole_id").innerHTML = id;
            document.getElementById("numCrossarms").innerHTML = esri_data.assets.crossarm;
            document.getElementById("numInsulators").innerHTML = poledata.image.insulator;
            document.getElementById("maintReason").innerHTML = poledata.image.maintReason;
            document.getElementById("maintDate").innerHTML = last_maintenance_date;
            document.getElementById("pole_coord").innerHTML = { lat: loc_json[i].pole_data.coordinates[0], lng: loc_json[i].pole_data.coordinates[1] };
            console.log(poledata)
        });
        //.then(response => response.text())
        //.then(contents => console.log(contents))
        }).catch(() => console.log("Can't access " + url))
      

       
    };


//onclick set specific pole data



//document.getElementById("close_info").onclick() = function () {
//    x.style.display == "none"
//    } 
//}
document.getElementById("close_info").onclick = function () { hidePanel() };

function hidePanel() {
    document.getElementById("info-panel").style.display = "none";
}
