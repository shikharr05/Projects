import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Home from '../Components/Home/Home'

export function Layout(props) {
    

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
