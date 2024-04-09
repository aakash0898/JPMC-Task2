import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean; // Step 1: Add showGraph property
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false, // Step 2: Initialize showGraph to false
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // Step 3: Render the graph conditionally based on showGraph
    return this.state.showGraph ? <Graph data={this.state.data} /> : null;
    //return (<Graph data={this.state.data}/>)
  }

  /**
   * Get new data from server and update the state with the new data
   */
  /*getDataFromServer() {
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
      this.setState({ data: [...this.state.data, ...serverResponds] });
    });
  }*/
  getDataFromServer() {
    // Step 4: Update getDataFromServer to continuously fetch data
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true, // Once data is received, show the graph
        });
      });
    }, 100); // Fetch data every 100ms

    // Stop fetching data if unmounted
    return () => clearInterval(interval);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer();}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
