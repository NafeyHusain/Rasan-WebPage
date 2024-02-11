import React from "react";
import Header from "../../components/Header";
import MenuHeader from "../../components/MenuHeader";

export const HomePage = (props) => {
    return (
        <div>
            <Header />
            <MenuHeader />
            <h1>Home</h1>
        </div>
    );
};

export default HomePage;
