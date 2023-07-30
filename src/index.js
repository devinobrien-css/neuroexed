import ReactDOM from 'react-dom/client'
import React, { useEffect } from "react"

import { RecoilRoot, useRecoilState } from "recoil";
import { pageState } from './atom';

import './index.css'
import Login from './components/login/login'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { fetchData, putData } from './access/dba';
import { sort_order } from './schema/object_schema';
import { tabs } from './manifest';

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

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));


async function updateOders(){
    const people = await fetchData('people');
    const projects = await fetchData('projects');
    const blogs = await fetchData('blogs');
    const orders = await fetchData('sort-orders');


    const personOrder = orders.Items.filter(item => item.type.S==="people")[0].sort.L;
    const projectOrder = orders.Items.filter(item => item.type.S==="projects")[0].sort.L;
    const blogOrder = orders.Items.filter(item => item.type.S==="blogs")[0].sort.L;

    if(people.Items.length !== personOrder.length){
        people.Items.forEach(person => {
            if(personOrder.filter(order => order.S === person.email.S).length === 0){
                personOrder.push(person.email)
            }
        });

        await putData(
            'sort-orders',
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
                projectOrder.push(project.title)
            }
        });

        await putData(
            'sort-orders',
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
                blogOrder.push(blog.title)
            }
        });

        await putData(
            'sort-orders',
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
    const Page = tabs.filter(tab => tab.name===page)[0].page

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[page])

    return (
        <div className='w-full flex relative'>
            <div className='w-full max-w-[1800px] mx-auto md:h-screen md:overflow-y-scroll p-4'>
                <Page />
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