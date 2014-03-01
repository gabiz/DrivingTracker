$(function() {
  $.getJSON('/logs/api/', function(data) {
    data.map(formatItem);
  });
});

function formatItem(item) {
  var data = {}

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

  row.push(moment(item.created_at, item.time_zone).format('YYYY-MM-DD H:MM A'));
  row.push(item.type);
  row.push(item.vehicle.display_name);
  row.push('<a href="https://www.google.com/maps/place/' + item.location.lat + ',' + item.location.lon + '">map</a>');
  row.push(JSON.stringify(data));

  $('<tr>')
    .append(row.map(function(cell) { return '<td>' + cell + '</td>'; }))
    .appendTo('#logs');
}