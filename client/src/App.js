import Footer from "./components/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import ScrollToTopButton from "./components/ArrowUp";
import { useLocation } from "react-router-dom";
import Main from "./pages/Main";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.querySelector("body").style.opacity = "1";
    }, []);

    useEffect(() => {
        check()
            .then((data) => {
                user.setUser(data);
                user.setIsAuth(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation="grow" variant="info" className="spin" />;
    }

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route>
                    <Header />
                    <NavBar />
                    <AppRouter />
                    <ScrollToTopButton />
                    <Footer />
                </Route>
            </Switch>
        </BrowserRouter>
    );
});

export default App;
