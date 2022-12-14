import React from 'react';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './Layout.css';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <div className="wrapper">
            <Navbar/>
            <main className="ContentLayout">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;