import "./init"
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Client from './technologies/Client_WebRTC'
import * as serviceWorker from './technologies/components-WebRTC/serviceWorker';

ReactDOM.createRoot(document.getElementById('root')).render( <Client /> )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();