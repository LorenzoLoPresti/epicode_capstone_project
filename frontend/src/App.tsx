import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header.component";
import Router from "./components/Router/Router.component";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Header />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
