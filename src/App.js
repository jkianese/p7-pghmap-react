import React, { Component } from 'react';
import './App.css';
import MyMap from './components/MyMap'

class App extends Component {
  render () {
    return (
      <main>
        <div id="map">
          <MyMap />
        </div>
      </main>  
    )
  }
}

export default App