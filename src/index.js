import ReactDOM from 'react-dom/client'
import React, { useState } from "react"

import { RecoilRoot, useRecoilState } from "recoil";
import { pageState } from './atom';

import './index.css'
import Nav from './components/nav/nav'
import Landing from './pages/landing'
import People from './pages/people'
import Projects from './pages/projects'
import News from './pages/news/news'
import Books from './pages/books'
import Affiliations from './pages/affiliations/affiliations'
import Admin from './pages/admin/admin'
import Login from './components/login/login'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { fetchData, putData } from './access/dba';
import { sort_order } from './schema/object_schema';

window.Buffer = window.Buffer || require("buffer").Buffer;


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


async function updateOders(){
    const people = await fetchData('people');
    const projects = await fetchData('projects');
    const blogs = await fetchData('blogs');
    const orders = await fetchData('sort_orders');


    const personOrder = orders.Items.filter(item => item.type.S==="people")[0].sort.L;
    const projectOrder = orders.Items.filter(item => item.type.S==="projects")[0].sort.L;
    const blogOrder = orders.Items.filter(item => item.type.S==="blogs")[0].sort.L;

    console.log(personOrder)

    if(people.Items.length !== personOrder.length){
        people.Items.forEach(person => {
            if(personOrder.filter(order => order.S === person.email.S).length === 0){
                console.log(person.email.S)
                personOrder.push(person.email)
            }
        });

        await putData(
            'sort_orders',
            {},
            sort_order(
                'people',
                personOrder
            )
        )
    }

    if(projects.Items.length !== projectOrder.length){
        projects.Items.forEach(project => {
            if(projectOrder.filter(order => order.S === project.title.S).length === 0){
                console.log(project.title.S)
                projectOrder.push(project.title)
            }
        });

        await putData(
            'sort_orders',
            {},
            sort_order(
                'projects',
                projectOrder
            )
        )
    }

    if(blogs.Items.length !== blogOrder.length){
        blogs.Items.forEach(blog => {
            if(blogOrder.filter(order => order.S === blog.title.S).length === 0){
                console.log(blog.title.S)
                blogOrder.push(blog.title)
            }
        });

        const output = await putData(
            'sort_orders',
            {},
            sort_order(
                'blogs',
                blogOrder
            )
        )
    }

}

updateOders()

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