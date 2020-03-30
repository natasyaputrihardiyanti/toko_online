import React,{Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor() { // fungsi yang pertama kali di jalankan
    super();
    this.state = { // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      email: "",
      password: "",
      role:"",
      message: ""
    }
  }

  bind = (event) => { // menghubungkan state dan elemen
    this.setState({[event.target.name]: event.target.value});
  }

  Login = (event) => {
    event.preventDefault();

    let url = "http://localhost/toko_online/public/user/auth";

    // memanggil file
    let form = new FormData();
    // membungkus data yang akan dikirim melalui API
    form.append("email", this.state.email); // append : memasukkan item ke form data
    form.append("password", this.state.password);
    axios.post(url, form) // mengirim data
    .then(response => { // mendapat response
      let logged = response.data.status; // mengecek status berhasil atau tidak
      if (logged) {
        // jika login berhasil
        this.setState({message: "Login Berhasil"});
        //menyimpan data token pada local storage
        localStorage.setItem("Token", response.data.token);
        //menyimpan data login user ke local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        //direct ke halaman data siswa
        window.location = "/produk";
      } else {
        // jika login gagal
        this.setState({message: "Login Gagal"});
      }
      $("#message").toast("show"); // menampilkan pesan
    })
    .catch(error => {
      console.log(error); // menampilkan pesan error
    })
  }

  render(){ // menampilkan elemen pada halaman web
    return(
      <div className="container" style={{width: "20%"}}>
        <div className="card my-2">
          <div className="card-header bg-light">
            <h5 className="text-warning">Login User</h5>
          </div>
          <div className="card-body">
            <Toast id="message" autohide="false" title="informasi">
            {this.state.message}
            </Toast>

            <form onSubmit={this.Login}>
              <input type="text" className="form-control m-1" name="email"
                value={this.state.email} onChange={this.bind}
                required placeholder="Masukkan Username" />
              <input type="password" className="form-control m-1" name="password"
                value={this.state.password} onChange={this.bind}
                required placeholder="Masukkan Password" />
              <button className="mt-2 btn btn-warning my-2" type="submit">
                <span className="fa fa-plus text-white"></span> Login
                </button>
                <p className="text-center mt-2">Gak due akun? <Link to="/register">Register</Link></p>
              </form>
            </div>
          </div>
        </div>
    );
  }
}
export default Login;
