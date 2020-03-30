import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slide1 from "../image/lipstik.jpg";
import Slide2 from "../image/sepatu.jpg";
import ProductItem from "./ProductItem";

export default class Products extends Component
{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            find: "",
            filter:""

        }

        if(!localStorage.getItem("Token")){
          // direct ke halaman login
          window.location = "/login";
        }
    }



    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    GetProducts = () => {
        let url = "http://localhost/toko_online/public/products"
        axios.get(url)
        .then(res => {
            this.setState({products: res.data.products})
        })
        .catch(error => {
            console.log(error)
        })
    }

    Search = (e) => {
        if (e.keyCode === 13) {
            let url = "http://localhost/toko_online/public/products"
            let form = new FormData()
            form.append("find", this.state.find)
            axios.post(url, form)
            .then(res => {
                this.setState({products: res.data.produk})
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    componentDidMount() {
        this.GetProducts()
    }

    render() {
        const renderData = this.state.products.map((item, id)=>{
            return (
            <ProductItem item={item} key={id}/>
            )
        })
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="my-4"> Shopping</h1>
                        <input type="text" className="form-control" name="find"
                         value={this.state.find} onChange={this.bind} onKeyUp={this.Search}
                         required placeholder="Pencarian..." />
                         <hr></hr>
                         <h4>Kategori</h4>
                         <form onSubmit={this.Filter}>
                             <div className="form-group">
                                 <select className="form-control" name="filter" value={this.state.value}
                                  onChange={this.bind}>
                                      <option value="">Choose...</option>
                                      <option value="sepatu">Sepatu</option>
                                      <option value="topi">Topi</option>
                                      <option value="kaos">Kaos</option>
                                  </select>
                             </div>
                             <button type="submit" className="btn btn-info pull-right m-2">
                                 Filter
                             </button>

                         </form>
                         <br/>
                         <Link to="/checkout">
                             <button className="btn btn-dark float-right">
                                 <span className="fa fa-check"></span> Checkout
                             </button>
                         </Link>
                         <Link to="/cart">
                             <button className="btn btn-primary float-right"
                              style={{ marginRight: "10px" }}>
                                  <span className="fa fa-cart-plus"></span> View Cart
                              </button>
                         </Link>
                    </div>
                    <div className="col-lg-9">
                        <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#slideshow" data-slide-to="0" className="active"></li>
                                <li data-target="#slideshow" data-slide-to="1"></li>
                            </ol>
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active">
                                    <img className="d-block img-fluid" src={Slide1} alt="First slide"
                                     width="900px" height="350px"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={Slide2} alt="Second slide"
                                     width="900px" height="350px"/>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#slideshow" role="button"
                             data-slide="prev">
                                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                 <span className="sr-only">Next</span>
                             </a>
                        </div>

                        <div className="row">
                            {renderData}
                            <hr></hr>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
