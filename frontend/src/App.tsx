import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import Header from "./components/Header/Header.component";
import Router from "./components/Router/Router.component";
import Layout from "./Layout/Layout.component";

// const port = import.meta.env.VITE_PORT;

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
