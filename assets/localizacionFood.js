function initMap() {
  // Ubicacion de Chile
    let chileWorld = { lat: -33.47269, lng: -70.64724 };
  // El Mapa centra en  Chile
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: chileWorld
  });
  // Aqui marca la posicion
  let marker = new google.maps.Marker({ position: chileWorld, map: map });
}



 // var myLatLng = { lat: -25.363, lng: 131.044 };

  // Create a map object and specify the DOM element
  // for display.
//  var map = new google.maps.Map(document.getElementById("map"), {
 //   center: myLatLng,
//    zoom: 4
//  });

  // Create a marker and set its position.
//  var marker = new google.maps.Marker({
//    map: map,
 //   position: myLatLng,
//    title: "Hello World!"
//  });
//}