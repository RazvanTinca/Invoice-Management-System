import {BrowserRouter as Router, Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";
import {ToastContainer} from "react-toastify";
import RequireAuth from "./components/util/RequireAuth.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Test from "./pages/Test.tsx";

function App() {


    return (
        <div className={"flex min-h-screen w-full bg-gray-900"}>
            <Router>
                <Routes>
                    <Route element={<RequireAuth/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/test" element={<Test/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
            <ToastContainer position={"bottom-right"} theme={"dark"} />
            <ReactQueryDevtools/>
        </div>

    )
}

export default App
