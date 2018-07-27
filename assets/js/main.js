// Vista splah 4 segundos
let second = () => {
  document.getElementById("firstSection").style.display = "none";
  document.getElementById("secondSection").style.display = "block";
};

window.onload = () => {
  setTimeout(second, 4000);
};

// zoom imagen 
//$("#zoom_01").elevateZoom();

// Se ejecuta el call back de api google maps
function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.4, lng: -70.6 },
    zoom: 15,
    mapTypeId: "roadmap",
    radius: "500"
  });
  let infoWindow = new google.maps.InfoWindow();

  // Create the search box and link it to the UI element.
  let input = document.getElementById("inputSearch");
  
  let searchBox = new google.maps.places.SearchBox(input);



  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function() {
    let places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        return;
      }

      // forma de comparar en una function
      // funcion en linea
      if (place.types.filter(x => x == "restaurant", "food").length == 0) {     
      alert("Por favor, solo introducir nombres de restaurant");
      }
      return;
      
      
      
      console.log(place);

      let icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Ubicación actual");
        infoWindow.open(map);
        map.setCenter(pos);
      },

      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
}
