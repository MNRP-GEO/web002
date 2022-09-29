    // Map initialization 
    var map = L.map('map',{
        measureControl: true,
    }
    ).setView([9.9252, 78.1198], 10.4);

    //osm layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href=""></a> '
    });
    osm.addTo(map);

    // google street 
        googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    // googleStreets.addTo(map);

    // google satellite
        googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    // googleSat.addTo(map)


    // Marker
    var myIcon = L.icon({
        iconUrl: 'img/red_marker.png',
        iconSize: [40, 40],
    });
    var singleMarker = L.marker([9.9252, 78.1198], { icon: myIcon, draggable: true });
    var popup = singleMarker.bindPopup('Madurai City.').openPopup()
        popup.addTo(map);

    console.log(singleMarker.toGeoJSON())

    // GEOJSON
    var Madurai_Road = L.geoJSON(Madurai_RoadJson, {
        onEachFeatur: function(feature,layer) {
            layer.bindPopup(`<b>Name: </b)` + feature.properties.name)
        },
        style: {
            fillcolor:'red',
            fillcolor: 2,
            color: '#f2f701',
        }
    }).addTo(map);

    var geojsonMarkerOptions = {
        redius: 8,
        fillcolor: "#ff7800",
        color: "#000",
        weight : 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    var markers = L.markerClusterGroup();

    var Madurai_Road_Intersect = L.geoJSON(Madurai_Road_IntersectJson,{
        pointToLayer: function(feature,latlng) {
            return markers.addLayer(L.circleMarker(latlng, geojsonMarkerOptions))
        }
    }).addTo(map);

    var Madurai_Taluk = L.geoJSON(Madurai_TalukJson, {
        onEachFeatur: function(feature,layer) {
            layer.bindPopup(`<b>Name: </b)` + feature.properties.name)
        },
        style: {
            fillcolor:'red',
            fillcolor: 2,
            color: 'red',
        }
    }).addTo(map);


    var Madurai_District = L.geoJSON(Madurai_DistrictJson).addTo(map)
    var MMadurai_District = L.geoJSON(Madurai_DistrictJson, {
        onEachFeatur: function(feature,layer) {
            layer.bindPopup(`<b>Name: </b)` + feature.properties.name)
        },
        style: {
            fillcolor:'red',
            fillcolor: 2,
            color: '#c0c0c0',
            outerWidth: 10,
        }
    }).addTo(map);


    // Layer controller
    var baseMaps = {
        "OSM": osm,
        'Google Street': googleStreets,
        "Google Satellite": googleSat
    };

    var overlayMaps = {
        "Marker": singleMarker,
        'Madurai_Road': Madurai_Road,
        'Madurai_Road_Intersect': Madurai_Road_Intersect,
        'Madurai_Taluk': Madurai_Taluk,
        'Madurai_District': Madurai_District

    };

    map.removeLayer(singleMarker)
    map.removeLayer(Madurai_Road)
    map.removeLayer(Madurai_Road_Intersect)
    map.removeLayer(Madurai_Taluk)
    map.removeLayer(MMadurai_District)

    L.control.layers(baseMaps, overlayMaps, { collapsed: true}).addTo(map);

    // Map coodinate display

    map.on('mouseover', function () {
        console.log('your mouse is over the map')
    })

    map.on('mousemove', function (e) {
        document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + 'lng: ' + e.latlng.lng;
        console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
    })

    // add map scale
    L.control.scale().addTo(map)

    // Full screen map view
    var mapId = document.getElementById('map');
    function fullScreenview() {
        mapId.requestFullscreen();
    }


    // start : Length and Area Measurement Control

    var lengthButton = document.createElement('button');
    lengthButton.innerHTML = '<img src="resources/images/measure-length.png" alt="" style="width:17px;height:17px;filter:brightness(0) invert(1);vertical-align:middle"></img>';
    lengthButton.className = 'myButton';
    lengthButton.id = 'lengthButton';

    var lengthElement = document.createElement('div');
    lengthElement.className = 'lengthButtonDiv';
    lengthElement.appendChild(lengthButton);

    var lengthControl = new ol.control.Control({
        element: lengthElement
    })

    map.addControl(lengthControl);
