import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
    items: [],
    isLoaded: true 
  }
}

componentDidMount() {

  let cachedColors;

  if(localStorage.getItem('cached-colors'))
    cachedColors = JSON.parse(localStorage.getItem('cached-colors'));

  // setting cachedColors to null if it wasn't stored today
  if(cachedColors && new Date().toDateString() !== cachedColors.date)
    cachedColors = null;

  // if cachedColors still got value, it means we can use it as valid cache for today
  if(cachedColors)
      this.setState({
        isLoaded: true,
        items: cachedColors.value
      });
  else
    fetch("http://www.colr.org/json/colors/random/7")
    .then(res => res.json())
    .then(res => {
      this.setState({
        isLoaded: true,
        items: res.colors
      });

    })
  }
  


  render() {

  var itemName = this.state.items.map(item => item.id)
  var itemHex = this.state.items.map(item => item.hex)
  //var itemHex = items.map(item => <div key={item.id}>{item.hex}</div>)

    if (!(this.state.isLoaded)) {
      return (
        <div>
          <h1>Not Loaded!</h1>
        </div>
      )
    }
    else {
    return (
      <section style={{ backgroundColor: "#" + itemHex[0]}} className="App">
        <div className="boxHold">
          <h1>JR is giving you the random color ID: <h2 style={{color: "#" + itemHex[4]}}>{itemName[0]}.</h2></h1>
          <h1>also, the hex is: {"#" + itemHex[0]}</h1>
          <h4>here are some other colors that go w/ it</h4>
            <div className="rectHold">
              <h1 className="hexInfo1">{"#" + itemHex[1]}</h1>
              <div style={{backgroundColor: "#" + itemHex[1]}} className="rectangle1"></div>
              <h1 className="hexInfo2">{"#" + itemHex[2]}</h1>
              <div style={{backgroundColor: "#" + itemHex[2]}} className="rectangle2"></div>
              <h1 className="hexInfo3">{"#" + itemHex[3]}</h1>
              <div style={{backgroundColor: "#" + itemHex[3]}} className="rectangle3"></div>
            </div>
          <h3><a href="http://www.colr.org/api.html">data courtesy of the color API, colr.org</a></h3>
        </div>
      </section>
    );
  }
  }
}

export default App;
