import React from "react";
import Header from "../../components/Header";
import MenuHeader from "../../components/MenuHeader";

export const HomePage = (props) => {
    console.log(props);
    return (
        <div>
            <Header />
            <MenuHeader />
        </div>
    );
};

export default HomePage;