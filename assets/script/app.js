

  var map = L.map('map',{
    minZoom:10,
  })

  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Powered by <a href="http://geominds.in/">Geominds</a>'}).addTo(map);
  map.setView([11.4588,75.7804],10)
  L.control.scale().addTo(map);
  

  /***********************************************************
                      Icon
  ************************************************************/
  var policeIcon =  L.icon({
      iconUrl: './assets/images/Police.png',
      iconSize:     [20, 20],
  });

  var fireIcon =  L.icon({
      iconUrl: './assets/images/Fire.png',
      iconSize:     [20, 20],
  });

  var blindIcon =  L.icon({
      iconUrl: './assets/images/blindspot.png',
      iconSize:     [20, 20],
  });

  var cameraIcon =  L.icon({
      iconUrl: './assets/images/camera.png',
      iconSize:     [20, 20],
  });

  var rtoIcon =  L.icon({
      iconUrl: './assets/images/RTO_off.png',
      iconSize:     [20, 20],
  });
  var evIcon =  L.icon({
      iconUrl: './assets/images/EV_Charging.png',
      iconSize:     [30, 20],
  });

  /***********************************************************
                      Blind Spot
  ************************************************************/
    var blackSpotMap = L.geoJSON(blackSpot,{

      pointToLayer: function(geoJsonPoint,latlng){
        return L.marker(latlng,{icon: blindIcon});
      },
      onEachFeature: function(feature,layer){
        layer.bindPopup("<p>"+
          "<div class='text-center'><strong>Black Spot<br> Name: </strong>"+feature.properties.Location + " "+'<br>'+
          "<strong>Code:</strong>"+feature.properties.RTOCode +' </div><br>'+
          'Latitude: '+feature.properties.Latitude+'<br>'+
          'Longitude: '+feature.properties.Longitude+
          "</p>")
        
      },
    }).addTo(map)

  /***********************************************************
                      Ev charging
  ************************************************************/
    var evChargingMap = L.geoJSON(evCharging,{

      pointToLayer: function(geoJsonPoint,latlng){
        return L.marker(latlng,{icon: evIcon});
      },
      onEachFeature: function(feature,layer){
        layer.bindPopup("<p>"+
        "<div class='text-center'><strong> Ev Charging Spot<br>"+feature.properties.Location + "</strong>"+'<br>'+
          "("+feature.properties.Land +')</div><br>'+
          'Type: '+feature.properties.Type+'<br>'+
          "</p>")
      },
    }).addTo(map)

  /***********************************************************
                      Speed Camera
  ************************************************************/


  var speedCameraMap = L.geoJSON(speedCamera,{
    pointToLayer: function(geoJsonPoint,latlng){
      return L.marker(latlng,{icon: cameraIcon});
    },
    onEachFeature: function(feature,layer){

      layer.bindPopup("<p>"+
      "<div class='text-center'><strong>Speed Camera<br>"+feature.properties["Speed Camera location"] +"</strong>"+'<br>'+
          "("+feature.properties.RTOCode +')</div><br>'+
          'Latitude: '+feature.properties.Latitude+'<br>'+
          'Longitude: '+feature.properties.Longitude+
      "</p>")
    }
  }).addTo(map)

  /***********************************************************
                      Police
  ************************************************************/


  var policeStationMap = L.geoJSON(policeStation,{
    style:{
      color:'#5f4c24'
    },
    pointToLayer: function(geoJsonPoint,latlng){
      return L.marker(latlng,{icon: policeIcon});
    },
    onEachFeature: function(feature,layer){
      layer.bindPopup("<p>"+
          "<div class='text-center'><strong>Police Station<br>Name:</strong>"+feature.properties["Police Station"]+" </div>"+'<br>'+
          'Latitude: '+feature.properties.Latitude+'<br>'+
          'Longitude: '+feature.properties.Longitude+
      "</p>")
    }
  }).addTo(map)

  /***********************************************************
                      Fire
  ************************************************************/


  var fireStationMap = L.geoJSON(fireStation,{
    style:{
      color:'#f00',
        fill:false      
    },
    pointToLayer: function(geoJsonPoint,latlng){
      return L.marker(latlng,{icon: fireIcon});
    },
    onEachFeature: function(feature,layer){
      layer.bindPopup("<p>"+
          "<div class='text-center'><strong>Fire Station<br>Name:</strong>"+feature.properties["Fire station"]  +'<br><br >'+
          'Latitude: '+feature.properties.Latitude+'<br>'+
          'Longitude: '+feature.properties.Longitude+
      "</p>")
    },
  }).addTo(map)
  


  /***********************************************************
                      local Authorities
  ************************************************************/
    var localAuthoritiesMap = L.geoJSON(localAuthorities,{
      style:{
        color:'#f00',
        weight:2,
        fill:false,
        dashArray:"10,10",
        dashOffset:'10' 
      },
      onEachFeature: function(feature,layer){
        layer.bindPopup(
          "<p>"+
          "<div class='text-center'><strong>"+feature.properties.LSGI+" LSGI</strong>" + "<br>"+
          "("+feature.properties.LSGI_CODE+")</div><br>"+
          "</p>")
      },
    }).addTo(map)

  /***********************************************************
                      Village
  ************************************************************/                      
  var villagesMap = L.geoJSON(villages,{
    style:{
      color:'#00f',
      weight:2,
      fill:true,
      fillOpacity: 0.0,
      dashArray:"10,10",
      dashOffset:'10'
    },
    onEachFeature: function(feature,layer){
      
      layer.bindPopup(
        "<p>"+
        "<div class='text-center'><strong>"+feature.properties.VILLAGE+" Village</strong>" +"<br>"+ 
        feature.properties.TALUK+"</div><br>"+
        'Area: '+feature.properties["AREA(SQKM)"]+" km<sup>2</sup>"+
        "</p>"
      )
      
      
    },
  }).addTo(map)

    /***********************************************************
                      RTO regions
  ************************************************************/
    var rtoRegionMap = L.geoJSON(rtoRegions,{
      style:{
        color:'#0f0',
        fill:false
      },
      onEachFeature: function(feature,layer){
        layer.on({
          mouseover:  highlightFeature,
          mouseout: resetHighlight,
        });

        layer.bindTooltip(function (layer) {
          return feature.properties["RTO/SubRTO"];
        },{
          permanent:true,
          direction:'center',
        }),
        
        layer.bindPopup(
          "<p style='text-align:center'>"+
          "<strong>"+feature.properties["RTO/SubRTO"]+"</strong>" +"<br>"+ 
          feature.properties.DISTRICT+"<br>"+
          "("+feature.properties.RTO_CODE+")<br><br>"+
          'Area: '+feature.properties["AREA(SQKM)"]+" km<sup>2</sup>"+
          "</p>"
        )
      },
    }).addTo(map)

  /***********************************************************
                      RTO offices
  ************************************************************/
    var rtoOfficeMap = L.geoJSON(rtoOffice,{
      style:{
        color:'#0f0',
      },
      pointToLayer: function(geoJsonPoint,latlng){
        return L.marker(latlng,{icon: rtoIcon});
      },
      onEachFeature: function(feature,layer){
        layer.bindPopup(
          "<p style='text-align:center'>"+
          "<strong> RTO Office<br> Name:</strong>"+feature.properties.Location+"" +"<br>"+ 
          "<strong>Code:</strong>"+feature.properties.RTOCode+"<br><br>"+
          'Latitude: '+feature.properties.Latitude+'<br>'+
          'Longitude: '+feature.properties.Longitude+
          "</p>"
        )
      },
    }).addTo(map)

 

  /***********************************************************
                      Legend
  ************************************************************/
    var legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          iconImg=['./assets/images/blindspot.png','./assets/images/EV_Charging.png','./assets/images/camera.png','./assets/images/Police.png','./assets/images/Fire.png','./assets/images/RTO_off.png'],
          iconName=['Black Spot','EV Charging Station','Speed Cameras','Police Station','Fire Station','RTO/SubRTO Office']

          grades = ['RTO/SubRTO Boundary','Local Authorities Boundary','Revenue Village Boundary'],
          color= ['green','red','blue'],
      
      div.innerHTML += '<h2>Legend</h2>'

      for (var i = 0; i < iconName.length; i++) {
        div.innerHTML += '<img src="'+iconImg[i]+'" class="legend-img" width="20px">'+' '+iconName[i]+'<br>'
    }
    

      for (var i = 0; i < grades.length; i++) {
          div.innerHTML += '<div class="square '+color[i]+'"></div>'+
          ' '+grades[i]+'<br>'
      }
  
      return div;
  };
  
  legend.addTo(map);
   

  /***********************************************************
                      Layer
  ************************************************************/
  var zoomHome = L.Control.zoomHome({position: 'topleft'});
  
  zoomHome.addTo(map);


  var baseLayers = {
    
  };

var overlays = {
    "osm":osm,
    "Black Spot":blackSpotMap,
    "Ev Charging ":evChargingMap,
    "Speed Cameras":speedCameraMap,
    "Police Station":policeStationMap,
    "Fire Station":fireStationMap,
    "RTO/SubRTO Office":rtoOfficeMap,
    "RTO/SubRTO Boundary":rtoRegionMap,
    "Local Authorities Boundary":localAuthoritiesMap,
    "Revenue Village Boundary":villagesMap,
};

L.control.layers(baseLayers, overlays).addTo(map);

var copyDate = document.getElementById("date");
copyDate.innerHTML += new Date().getFullYear();


  function highlightFeature(e) {
    var layer = e.target;

    layer.openPopup();
    layer.unbindTooltip()

    layer.setStyle({
        weight: 3,
        color: '#0f0',
        dashArray: '',
        fill:true,
        fillOpacity: 0.3
        
    });

   

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
  }
  
  function resetHighlight(e) {
    var layer = e.target;
    layer.closePopup();
    layer.bindTooltip(function (layer) {
      return e.sourceTarget.feature.properties["RTO/SubRTO"];
    },{
      permanent:true,
      direction:'center',
    }),

    layer.setStyle({
      color:'#0f0',
      fill:false,
      fillOpacity: 0.0,
  });
}

L.easyPrint({
  title: 'My awesome print button',
  position: 'bottomright',
  sizeModes: ['A4Portrait', 'A4Landscape']
}).addTo(map);

console.log("Hey There%c dev \n%cA short note about me I am %cRithin Jose %c\nI am a MERN developer who loves to make Websites.\nFor any form of colaborations ping me at %crithinja@gmail.com",'color:red','color:none','font-weight:700','font-weight:500','font-weight:700');


const colapseLegend = document.querySelectorAll("div.info.legend.leaflet-control");

// colapseLegend.addEventListener("click", ()=);

