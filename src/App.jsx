import { useState } from "react";
import "./styles/app.scss";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Guidance from "./components/Guidance";

function App() {
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    return (
        <>
            <Nav setIsGuideOpen={setIsGuideOpen} />
            <main></main>
            <Footer />
            <Guidance isOpen={isGuideOpen} setIsGuideOpen={setIsGuideOpen} />
        </>
    );
}

export default App;
