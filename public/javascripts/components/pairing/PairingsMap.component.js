function PairingsMap(props) {
  /* For more information please visit: https://developers.google.com/maps/documentation
  Here some resource helped me to make api works;
  DirectionsServices: https://developers.google.com/maps/documentation/javascript/directions
  Drawing Marker: https://developers.google.com/maps/documentation/javascript/examples/icon-complex
  Drawing Marker:https://developers.google.com/chart/infographics/docs/dynamic_icons?csw=1#plain_pin
  Code samples: https://developers.google.com/maps/documentation/javascript/examples
  Map styling: https://mapstyle.withgoogle.com/
  */
  var map = new google.maps.Map(document.getElementById("map-canvas"), {
    zoom: 12,
    center: { lat: 51.497309, lng: -0.147165 },
    fullscreenControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
  });
  var icons = {
    start: new google.maps.MarkerImage(),
    end: new google.maps.MarkerImage(),
  };

  var colorHexPalet = ["769b17", "519cc9", "dfd974", "cb4b99", "ff9d78"];
  var colorStringPalet = ["green", "	blue", "yellow", "pink", "orange"];

  props.pairs.forEach((pair, i) => {
    var startMarker = (position, icon, title) => {
      new google.maps.Marker({
        map: map,
        position: position,
        icon: {
          url: `http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=car|${
            colorHexPalet[i % colorHexPalet.length]
          }`,
          labelOrigin: new google.maps.Point(10, -4),
        },
        label: {
          text: title,
          color: colorStringPalet[i % colorStringPalet.length],
          fontWeight: "bold",
        },
      });
    };

    var endMarker = (position, icon, title) => {
      new google.maps.Marker({
        map: map,
        position: position,
        icon: {
          url: `http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=home|${
            colorHexPalet[i % colorHexPalet.length]
          }`,
          labelOrigin: new google.maps.Point(10, -4),
        },
        label: {
          text: title,
          color: colorStringPalet[i % colorStringPalet.length],
          fontWeight: "bold",
        },
      });
    };

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: colorStringPalet[i % colorStringPalet.length],
      },
      suppressMarkers: true,
    });
    directionsRenderer.setMap(map);

    var request = {
      origin: pair.route.routes[0].legs[0].start_location,
      destination: pair.route.routes[0].legs[0].end_location,
      travelMode: "DRIVING",
    };
    directionsService.route(request, function (response, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
        startMarker(
          pair.route.routes[0].legs[0].end_location,
          icons.start,
          pair.driver
        );

        endMarker(
          pair.route.routes[0].legs[0].start_location,
          icons.end,
          pair.guest
        );
      } else {
        window.alert("Directions request failed due to " + status);
      }
    });
  });

  return null;
}
