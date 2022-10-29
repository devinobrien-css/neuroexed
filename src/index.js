import ReactDOM from 'react-dom/client'
import React from "react"

import { RecoilRoot, useRecoilState } from "recoil";
import { pageState } from './atom';

import './index.css'
import Nav from './components/nav/nav'
import Landing from './pages/landing/landing'
import People from './pages/people/people'
import Projects from './pages/projects/projects'
import News from './pages/news/news'
import Books from './pages/books/books'
import Affiliations from './pages/affiliations/affiliations'
import Admin from './pages/admin/admin'
import Login from './components/login/login'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDAnsPneOYk5AhWsOMGTfYwhVwnIGVCI2U",
  authDomain: "neuroexed-acccess.firebaseapp.com",
  projectId: "neuroexed-acccess",
  storageBucket: "neuroexed-acccess.appspot.com",
  messagingSenderId: "61939101559",
  appId: "1:61939101559:web:77e099fcb3626e5c897b72",
  measurementId: "G-H9J772QNJX"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics.app.automaticDataCollectionEnabled)

const root = ReactDOM.createRoot(document.getElementById('root'));
const App = () => {
    const [page,] = useRecoilState(pageState)

    let currentPage = <Landing />

    if(page === '/'){
        currentPage = <Landing />
    }
    else if(page === '/people'){
        currentPage = <People />
    }
    else if(page === '/projects'){
        currentPage = <Projects />
    }
    else if(page === '/news'){
        currentPage = <News />
    }
    else if(page === '/affiliations'){
        currentPage = <Affiliations />
    }
    else if(page === '/publications'){
        currentPage = <Books />
    }
    else if(page === '/admin'){
        currentPage = <Admin />
    }

    window.scrollTo(0,0)

    return (
        <div className='max-w-[1500px] mx-auto'>
            <Nav />
            <div className=' w-full md:w-9/12 lg:w-10/12 p-4'>
                {currentPage} 
            </div>
            <Login />
        </div>
    )

}

root.render(
  <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
  </React.StrictMode>
);