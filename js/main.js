/*--------------- Restrict future date & time ---------------*/
$(function () {
    $('[id*=txtdateTime]').datetimepicker({
        inline: false,
        showsTime: true,
        format: 'Y/m/d H:i',
        formatTime: 'H:i',
        formatDate: 'Y/m/d',
        startDate: false,
        maxDate: 0,
        step: 1,
        closeOnDateSelect: false,
        closeOnTimeSelect: true
    });
});

/*--------------- Get Time & Date ---------------*/

var datetimepicker = document.getElementById("datetimepicker");
datetimepicker.value = new Date().toISOString().slice(0,16);

function getDatetime() {
  var str = datetimepicker.value;    
  var d = new Date(str);
  console.log('Current:\t', d.toLocaleString())
  document.getElementById("s5").innerHTML = d.toLocaleString();
  
  // Add 1 hour to datetime
  d.setMinutes(d.getMinutes() + 10);

    console.log('After:\t', d.toLocaleString())
}


/*--------------- Get ISS location API ---------------*/
fetch("https://api.wheretheiss.at/v1/satellites/25544")
.then((response) => response.json())
.then((data) => {
    document.getElementById("s1").innerHTML = data.latitude + '\xB0';
    document.getElementById("s2").innerHTML = data.longitude + '\xB0';
    
    fetch(
        `https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`
      )
        .then((response) => response.json())
        .then((data1) => {
          document.getElementById("s3").innerHTML = data1.timezone_id;
          document.getElementById("s4").innerHTML = `<a href=${data1.map_url} target="_blank">Explore Map</a>`;
        });
});

function reload() {
    window.location.reload(false);
}