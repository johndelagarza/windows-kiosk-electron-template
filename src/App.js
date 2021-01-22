import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import './App.css';
const ipcRenderer = window.require('electron').ipcRenderer;

function App(props) {

  return (
    <div>
        <Router>
            <Switch>
              <Route exact path="/" component={()=> (
                <div>
                  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
                </div>
              )} />
            </Switch>
          </Router>
    </div> 
  )
};

export default App;