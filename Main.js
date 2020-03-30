import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//load navbar
import Navbar from "./component/Navbar";
import Modal from "./component/Modal";
import Toast from "./component/Toast";
//load halaman
import Products from "./page/Products";
import Produk from "./client/Produk";
import User from "./page/User";
import Cart from "./client/Cart";
import Profil from "./client/Profil";
import Login from "./page/Login";
import Register from "./client/Register";
import Order from "./page/Order";


class Main extends Component {
    render = () => {
        return(
           <Switch>
               {/* load component tiap halaman */}

               <Route path="/Products">
                 <Navbar />
                 <Products />
                 </Route>

                 <Route path="/Produk">
                 <Navbar />
                 <Produk />
                 </Route>

                 <Route path="/user">
                 <Navbar />
                 <User />
                 </Route>

                 <Route path="/cart">
                 <Navbar />
                 <Cart />
                 </Route>

                 <Route path="/profil">
                 <Navbar />
                 <Profil />
                 </Route>

                 <Route path="/login">
                 <Navbar />
                 <Login />
                 </Route>

                 <Route path="/register">
                 <Navbar />
                 <Register />
                 </Route>

                 <Route path="/order">
                 <Navbar />
                 <Order />
                 </Route>

               </Switch>
        );
    }
}
export default Main;
