import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import axios from 'axios'

class MyMap extends Component {
  constructor(props) {
    super(props);
      this.state  ={ 
        venues: []
      }
  }     

  componentDidMount() {
    this.getVenues()
    window.initMap = this.initMap
  }
  // Load Google Maps API Key
  loadScript = () => { 
   scriptSrc()
  }
  // get data from FourSquare with Axios
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "",
      client_secret: "",
      query: "food",
      near: "Pittsburgh, PA",
      // ll: 40.448506 -80.00250,
      limit: 10,
      v: "20181008"
    }
    // Run: npm install axios
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.loadScript())
      })
      .catch(error => {
        console.log("Error: " + error)
      })
  }

  initMap = () => {

   const google = window.google
 
   // create a map 
   const map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: 40.448506, lng: -80.00250},
     zoom: 12
   })
     
   let infowindow = new google.maps.InfoWindow()
   
   // display dynamic markers
   this.state.venues.map(myVenue => {
 
   let contentString = `${myVenue.venue.name}` 
 
   const marker = new google.maps.Marker({
     position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
     map: map,
     title: myVenue.venue.name,
     animation: google.maps.Animation.DROP,
   });

    // click on a marker
    marker.addListener('click', function() {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null);}, 1000);
      
      // Change the Content
      infowindow.setContent(contentString)
      
      // Open an InfoWindow
      infowindow.open(map, marker)
    });
    
  });
  
}      
  
  render() { 
    return (
      <main>
        <div id="map"></div>
     </main>
    )
  }
}

function scriptSrc() {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = 'https://maps.googleapis.com/maps/api/js?key=&callback=initMap'
  script.async = true
  script.defer = true
  script.onerror = function() {
      document.write("Error: Google Maps can't be loaded");
  }
  index.parentNode.insertBefore(script, index)
} 

export default MyMap
