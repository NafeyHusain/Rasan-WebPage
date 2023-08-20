import "./App.css";
import HomePage from "./containers/HomePage";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:slug" element={<ProductListPage />} />
            </Routes>
        </div>
    );
}

export default App;
