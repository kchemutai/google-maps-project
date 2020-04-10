const YOUR_API_KEY='AIzaSyCcwazb-T7zvceyA4VLWVB-eXvwj-XEUIA'
let storesList = document.querySelector('.stores-list')
let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

const searchIcon = document.querySelector('.fa-search')
searchIcon.addEventListener('click', searchStores)
const searchInput = document.querySelector('#zip-code-input')

var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap()
{
  var la = {lat: 34.063380, lng: -118.358080};
  map = new google.maps.Map(document.getElementById('map'), {
    center: la,
    zoom: 11,
    mapTypeId: 'roadmap',
  });
  clearLocations()
  infoWindow = new google.maps.InfoWindow();
  searchStores()
}

function clearLocations(){
  infoWindow.close()
  for(var i=0;i<markers.length;i++){
    markers[i]=setMap(null)
  }
  markers.length=0
}


function displayStores(stores){
  storesHtml = ''
  storeNum = 0
  stores.forEach(store=>{
    storesHtml += 
    `
                <div class="store-container">
                  <div class='store-container-background'>
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${store.name}</span>
                            <span>${store.address.streetAddressLine1}</span>
                        </div>
                        <div class="store-phone-number">
                            ${store.phoneNumber}
                        </div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">
                            ${++storeNum}
                        </div>
                    </div>
                  </div>  
                </div>    
    `
  })
  storesList.innerHTML = storesHtml
}

function showStoreMarkers(stores){
  let index=0;
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(store=>{
    let name = store.name
    let address = store.address.streetAddressLine1
    let openStatus = store.openStatusText
    let phone = store.phoneNumber
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude);
      bounds.extend(latlng);
    createMarker(latlng, name, address, openStatus, phone, ++index)
  })
  map.fitBounds(bounds);
}

let onClickStoreElement = ()=>{
  let storeItems = document.querySelectorAll('.store-container')
  storeItems.forEach((item, index)=>{
    item.addEventListener('click', ()=>{
      new google.maps.event.trigger(markers[index], 'click');
    })
  })

}
function createMarker(latlng, name, address,openStatus,phone, index){
  var html = `
              <div class='store-info-container'>
                <div class='store-info'>
                    <div class='store-name'>
                      <span>${name}</span>
                    </div>
                    <div class='status'>
                      <i class="fas fa-clock"></i>
                      <span>${openStatus}</span>
                    </div>
                </div>
                <div class='store-info-address-container'>
                  <div class='store-info-address-icon'><i class="fas fa-location-arrow"></i></div>
                  <div class='store-info-address'>${address}</div>
                </div>  
                <div class='store-info-number-container'>
                  <div class='store-info-number-icon'><i class="fas fa-phone-alt"></i></div>
                  <div class='store-info-number'>${phone}-90</div>
                </div>  
              </div>
              `
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    icon: iconBase + 'library_maps.png',  
    label: index.toString()
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}



function searchStores(){
  let zipCode = searchInput.value
  let foundStores = []
  if(zipCode){
    stores.forEach(store =>{
      const postalCode = store.address.postalCode
      const zipCodeData = postalCode.substring(0,5)
      if(zipCode==zipCodeData){
        foundStores.push(store)
      }
    })
  }
  else{
    foundStores = stores
  }
  displayStores(foundStores)
  showStoreMarkers(foundStores)
  onClickStoreElement()
}


//assignment

//1.
 // info window
  /* name # bold and bigger text
  open until 6pm
  <border bottom>
  <i icon> address
  <i icon> phoneNumber */

//2.  change style the map marker
//3. style google maps
//4. open info window when you click on the store that directly corolates with that store
//5. add styling to a store on mouse over
//6. link the address to google maps
