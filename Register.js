import React,{Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from 'react-router-dom';

class Register extends Component {
  constructor() { // fungsi yang pertama kali di jalankan
    super();
    this.state = { // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      id_user:"",
      nama_user:"",
      email: "",
      nama_lengkap:"",
      no_ktp:"",
      jenis_kelamin:"",
      tgl_lahir:"",
      no_hp:"",
      image:"",
      password: "",
      repassword:"",
      role:"client",
      message: ""
    }
  }
  bind = (event) => { // menghubungkan state dan elemen
    this.setState({[event.target.name]: event.target.value});
  }

  Save = (event) => {
      event.preventDefault();

      if (this.state.password == this.state.repassword ){
        let url = "http://localhost/toko_online/public/register";
        let form = new FormData();
        form.append("nama_user", this.state.nama_user)
        form.append("email", this.state.email)
        form.append("nama_lengkap", this.state.nama_lengkap)
        form.append("no_ktp", this.state.no_ktp)
        form.append("jenis_kelamin", this.state.jenis_kelamin)
        form.append("tgl_lahir", this.state.tgl_lahir)
        form.append("no_hp", this.state.no_hp)
        form.append("password", this.state.password)
        form.append("image", this.state.image)
        form.append("jenis_kelamin", this.state.jenis_kelamin)


        axios.post(url, form)
        .then(response => {
          this.setState ({message: response.data.message})
          this.get_user()

      })
      .catch(error => {
        console.log(error); // menampilkan pesan error
      })
      alert(this.state.message)

    }
    else{
      alert("Register Gagal")
      window.location="/register";

    }
  }



  render(){
    return(
      <div class="container register-form">
                <form onSubmit={this.Save} >
                      <div class="note">
                          <p>Register</p>
                      </div>

                      <div class="form-content bg-light">
                          <div class="row">
                              <div class="col-md-5 ">
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="nama_user" name="nama_user" value={this.state.nama_user} onChange={this.bind} required/>
                                  </div>
                                  <div class="form-group">
                                      <input type="email" class="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.bind} required/>
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="nama_lengkap" name="nama_lengkap" value={this.state.nama_lengkap} onChange={this.bind} required/>
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="no_ktp" name="no_ktp" value={this.state.no_ktp} onChange={this.bind} required/>
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="jenis_kelamin" name="jenis_kelamin" value={this.state.jenis_kelamin} onChange={this.bind} required/>
                                  </div>
                                  <div class="form-group">
                                      <input type="date" class="form-control" placeholder="tgl_lahir" name="tgl_lahir" value={this.state.tgl_lahir} onChange={this.bind} required/>
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="no_hp" name="no_hp" value={this.state.no_hp} onChange={this.bind} required/>
                                  </div>
                                  <div class="form-group">
                                  Gambar <br/>
                                    <input type="file" className="file-control" placeholder="image" name="images" value ={this.state.images} onChange={this.bindImage} required />                                  </div>
                                  <div class="form-group">
                                      <input type="password" class="form-control" placeholder="Your Password" name="password" value={this.state.password} onChange={this.bind} required/>
                                  </div>
                                  <div class="form-group">
                                      <input type="password" class="form-control" placeholder="Confirm Password *" name="repassword" value={this.state.repassword} onChange={this.bind} required/>
                                  </div>
                              </div>

                          </div>
                          <button type="submit" class="btn btn-outline-warning">Submit</button>
                      </div>
                  </form>
              </div>
    );
  }
}
export default Register;
