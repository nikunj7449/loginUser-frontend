import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import {store} from "./store/ReduxStore.js"
import { Provider } from "react-redux"
createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </Provider>
)
