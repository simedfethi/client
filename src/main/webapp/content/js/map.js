function loadMap(lat, long, customer) {
  var map = L.map('map').setView([lat, long], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var marker = L.marker([lat, long]).addTo(map);
  marker.bindPopup(customer).openPopup();


}
function addMarker(lat,long)
{
  var marker = L.marker([lat, long]).addTo(map);
  marker.bindPopup(customer).openPopup();

}


function MapLib(lat, long, customer) {
  var map = L.map('map').setView([lat, long], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var marker = L.marker([lat, long],{id:customer}).addTo(map);
  marker.bindPopup(customer).openPopup();

  this.addMarker =function(lat,long,title,titleL)
  {

    var marker = L.marker([lat, long]).addTo(map);
    const popup = L.popup().setContent(title);
     marker.on('popupopen', () => {
       const popupContentDiv = popup.getElement();
      popupContentDiv.addEventListener('click',function () {
    handleclick(titleL);
        popupContentDiv.removeEventListener('click', handleclick);
      }, { once: true } );
    });

    marker.bindPopup(popup).openPopup();


  }
  function handleclick(titleL){
    const div = document.createElement('div');
    div.innerHTML = titleL;
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    div.style.zIndex = '999';

    // Create close button element
    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.zIndex = '1000';

    // Add event listener to close button
    closeButton.addEventListener('click', function() {
      div.remove();
    });

    // Append close button to div
    div.appendChild(closeButton);

    document.getElementById('map').appendChild(div);


  }

  this.addMarkerTap =function(lat,long,title,onClickFunction)
  {

    var marker = L.marker([lat, long]).addTo(map);
    const popup = L.popup().setContent(title);
    marker.on('popupopen', () => {
      const popupContentDiv = popup.getElement();
      popupContentDiv.addEventListener('click', onClickFunction);
    });

    marker.bindPopup(popup).openPopup();

  }
  function alertb(){
    alert('ggggggggggg');
  }

  this.setview= function (lat,long){
    map.setView([lat, long], 13);
    var markerst ;
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker && layer.getLatLng().equals([lat,long])) {
        markerst = layer;
      }
    });
    markerst.openPopup();
  }
}

