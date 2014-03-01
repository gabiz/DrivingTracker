var map = L.mapbox.map('map', 'automatic.h5kpm228', {maxZoom: 16}).setView([37.9, -122.5], 10)
  , geocoder = L.mapbox.geocoder('automatic.h5kpm228')
  , markers = []
  , events = {
      'ignition:on': 'Ignition On'
    , 'ignition:off': 'Ignition Off'
    , 'trip:finished': 'Trip Summary'
    , 'notification:speeding': 'Speed Exceeded Threshold'
    , 'notification:hard_brake': 'Hard Brake'
    , 'notification:hard_accel': 'Hard Acceleration'
    , 'region:changed': 'Region Changed'
    , 'parking:changed': 'Parking Location Changed'
    , 'mil:on': 'MIL (check engine light) On'
    , 'mil:off': 'MIL (check engine light) Cleared'
  };

/* Web socket connection */
var ws = new WebSocket('ws://' + window.document.location.host);
ws.onopen = function () {
  $('#alert')
    .html("<b>Connected:</b> Waiting for events")
    .removeClass()
    .addClass('alert alert-info');
}
ws.onmessage = function (msg) {
  var data = JSON.parse(msg.data)
    , date = new Date(parseInt(data.created_at))
    , title = events[data.type] || 'Unknown'
    , description = [ moment(date).format('YYYY-MM-DD h:mm a') ];

  console.log(data)

  if (data.vehicle) {
    description.push(data.vehicle.display_name + ': ' + data.vehicle.year + ' ' + data.vehicle.make  + ' ' + data.vehicle.model);
  }


  if (data.location) {
    if(data.location.accuracy_m) {
      description.push('Accuracy: ' + data.location.accuracy_m.toFixed(0) + 'm');
    }

    if (data.type == 'notification:speeding') {
      description.push('Speed: ' + data.speed_mph + ' mph');
    } else if (data.type == 'notification.hard_accel') {
      description.push('Acceleration: ' + data.g_force + 'g');
    } else if (data.type == 'notification.hard_brake') {
      description.push('Deceleration: ' + data.g_force + 'g');
    } else if (data.type == 'region:changed') {
      description.push(data.region.status + ' ' + data.region.name + ' (' + data.region.tag + ')');
    } else if (data.type == 'mil:on' || data.type == 'mil:off') {
      if(data.dtcs) {
        data.dtcs.forEach(function(dtc) { description.push(dtc.code + ': ' + dtc.description); });
      }
    }

    updateAlert(title, '');
    addMarker(data.location.lat, data.location.lon, title, description.join('<br>'));

    geocoder.reverseQuery([data.location.lon, data.location.lat], function(e, response) {
      var location = buildLocation(response);
      logMessage(title, date, location);
      updateAlert(title, location);
    });
  }

  if(data.type == 'trip:summary' && data.trip.path) {
    var polyline = L.Polyline.fromEncoded(data.trip.path, {color: '#08b1d5', opacity: 0.9});

    map.fitBounds(polyline.getBounds());

    polyline.addTo(map);
  }
};

setInterval(function() {
  ws.send('ping');
}, 15000);


function addMarker(lat, lon, title, description) {
  L.mapbox.markerLayer({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [lon, lat]
    },
    properties: {
        title: title,
        description: description,
        'marker-size': 'small',
        'marker-color': '#38BE43',
        'marker-symbol': 'circle'
    }
  }).addTo(map);
  markers.push([lat, lon]);
  map.fitBounds(markers);
  map.panTo([lat, lon]);
}

function updateAlert(type, message) {
  $('#alert')
    .html("<b>" + type + ":</b> " + message)
    .removeClass()
    .addClass('alert alert-success');
}

function logMessage(type, date, location) {
  $('<div>')
    .html('<b>' + type + '</b><span class="location">' + location + '</span><br><em><small>' + moment(date).format('YYYY-MM-DD h:mm a') + '</small></em>')
    .prependTo('#log');
}

function buildLocation(response) {
  var location = ''
  try {
    location += response.results[0][0].name;

    if (response.results[0][1].type != 'country') {
      location += ', ' + response.results[0][1].name;
    }
  } catch(e) { }
  return location;
}
