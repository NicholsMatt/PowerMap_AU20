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
var base_URL = 'http://98b3fb4a38a3.ngrok.io/';
var img_names
var num_imgs
async function initMap() {
    hidePanel()
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
      highVoltage: {
          icon: "images/highVoltage.png",
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
         id = marker.get('store_id') -1;
         //console.log('id')
         //console.log(id)
         //console.log(loc_json)
         //console.log(loc_json[id].pole_data)
         num_imgs = loc_json[id].pole_data.pole_names.length;
         img_names = loc_json[id].pole_data.pole_names; 
         console.log(img_names)
         showSlides(1);
         console.log(loc_json[id].pole_data.coordinates[0])
         ////////////////////////////////////////////////



            //use this area for getting data on a per pole basis




            ////////////////////////////////////////////////
         document.getElementById("pole_id").innerHTML = id + 1;
         document.getElementById("voltage").innerHTML = loc_json[id].pole_data.voltage + ' voltage';
         document.getElementById("numInsulator").innerHTML = loc_json[id].pole_data.insulator ;
         document.getElementById("numCrossarms").innerHTML = loc_json[id].pole_data.crossarm;
         document.getElementById("pole_coord").innerHTML = trunct(loc_json[id].pole_data.coordinates[0]) + '' + trunct(loc_json[id].pole_data.coordinates[1]) + '';
         unhidePanel(id);
    });
  }
}
function trunct(coord) {
    var num = coord
    var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]
    return with2Decimals
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



var slideIndex = 1
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);

}

// Thumbnail image controls
//function currentSlide(n) {
//    showSlides(slideIndex = n);
//}

function showSlides(n) {
    slideIndex = n;
    //console.log('img');
    //console.log(num_imgs);
    //console.log(img_names);
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    
    if (n > num_imgs) { slideIndex = 1 }
    if (n < 1) { slideIndex = num_imgs }
    //console.log(slideIndex);
    document.getElementById("image_slide").src = 'https://osuhackathondata.s3.us-east-2.amazonaws.com/' + img_names[slideIndex-1] + '.jpg';
    //for (i = 0; i < dots.length; i++) {
    //    dots[i].className = dots[i].className.replace(" active", "");
    //}

    //dots[slideIndex - 1].className += " active";
    //captionText.innerHTML = dots[slideIndex - 1].alt;


   /*
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    url = 'https://osuhackathondata.s3.us-east-2.amazonaws.com/' + img_names[slideIndex - 1] + '.json';

    fetch(proxyurl + url).then(function (response) {
        // response.json() returns a promise, use the same .then syntax to work with the results
        response.json().then(function (poledata) {
            

            ////////////////////////////////////////////////



            //use this area for getting data on a per image basis




            ////////////////////////////////////////////////

           
            
        });
        //.then(response => response.text())
        //.then(contents => console.log(contents))
    }).catch(() => console.log("Can't access " + url))
    */


}