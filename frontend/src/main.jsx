import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
//import AthContext
import { AuthProvider } from './Context/AuthContext.jsx';

import { Helmet } from "react-helmet";
import "./assets/assets/js/jquery.js";
import "./assets/assets/js/bootstrap.min.js";
import "./assets/assets/js/bootstrap-select.min.js";
import "./assets/assets/js/jquery.fancybox.js";
import "./assets/assets/js/owl.js";
import "./assets/assets/js/appear.js";
import "./assets/assets/js/scrollbar.js";
import "./assets/assets/js/TweenMax.min.js";
import "./assets/assets/js/swiper.min.js";
import "./assets/assets/js/jquery.polyglot.language.switcher.js";
import "./assets/assets/js/jquery.ajaxchimp.min.js";
import "./assets/assets/js/parallax-scroll.js";
import "./assets/assets/js/script.js";

import "./assets/assets/css/bootstrap.css";
import "./assets/assets/css/style.css";
import "./assets/assets/css/responsive.css";
import "./assets/assets/css/color.css";




createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  // </StrictMode>,
)
