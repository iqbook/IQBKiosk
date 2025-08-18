import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css';
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './components/app/store.js'

import { GoogleOAuthProvider } from '@react-oauth/google'
const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENTID} >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
