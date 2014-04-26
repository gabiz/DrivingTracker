$(function() {
  $.getJSON('/logs/api/', function(data) {
    data.map(formatItem);
  });
});

function formatItem(item) {
  var data = {id: item.id}

  if(item.trip) {
    data.trip = item.trip;
  }
  if(item.speed_mph) {
    data.speed_mph = item.speed_mph;
  }
  if(item.g_force) {
    data.g_force = item.g_force;
  }
  if(item.region) {
    data.region = item.region;
  }
  if(item.dtcs) {
    data.dtcs = item.dtcs;
  }
  if(item.user_cleared) {
    data.user_cleared = item.user_cleared;
  }

  var row = []

  row.push(moment(item.created_at).format('YYYY-MM-DD H:MM A'));
  row.push(item.type);
  row.push(item.vehicle.display_name);
  if (item.end_location) {
    row.push('<a href="https://www.google.com/maps/place/' + item.end_location.lat + ',' + item.end_location.lon + '" target="_blank">map</a>');
  } else {
    row.push('');
  }
  row.push(JSON.stringify(data, null, " "));

  $('<tr>')
    .append(row.map(function(cell) { return '<td>' + cell + '</td>'; }))
    .appendTo('#logs');
}