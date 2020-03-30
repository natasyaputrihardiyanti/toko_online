import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import User from '../page/User';
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Profil extends React.Component {
  constructor() {
    super();
    this.state = {
    user: [],
    id_user: "",
    email: "",
    password: "",
    nama_user: "",
    role: "user",
    no_ktp: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    tgl_lahir: "",
    nohp: "",
    image:"",
    data_pengiriman:"",
    id_pengiriman:"",
    nama_penerima:"",
    kode_pos:"",
    kecamatan:"",
    kota:"",
    jalan:"",
    rt:"",
    rw:"",
    action: "",
     find: "",
    message: ""

}
  if(!localStorage.getItem("Token")){
    // direct ke halaman login
    window.location = "/login";
    }
  }
    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }
    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id_user: item.id_user,
        nama_user: item.nama_user,
        nama_lengkap: item.nama_lengkap,
        no_ktp: item.no_ktp,
        jenis_kelamin: item.jenis_kelamin,
        tgl_lahir: item.tgl_lahir,
        nohp: item.nohp,
        image:item.image
      });
    }
  get_user = () => {
    // $("#loading").toast("show");
    let id = JSON.parse(localStorage.getItem('user'))
    // console. log(items)
    let url = "http://localhost/toko_online/public/user/"+id.id_user;
    axios.get(url)
    .then(response => {
    // $("#loading").toast("hide");
    this.setState({
      user: response.data.user,
    });// $("message-).toast("show");
  })
  .catch(error => {
  console.log(error);
  });
// this. setltate({
// user: items,
// id user: items.id_user
 // });
 }
 componentDidMount = ()=>{
 this.get_user();
}

  Save= (event) => {
    console.log(this.state.id_user)
    event.preventDefault();
    // $("*loading").toast("show");
    // menampilkan proses loading
    // menutup form modal
    $("#modal_user").modal("hide");
    let url = "http://localhost/toko_online/public/user/save_profil";
    let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_user", this.state.id_user);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      form.append("nama_user", this.state.nama_user);
      form.append("nama_lengkap", this.state.nama_lengkap);
      form.append("no_ktp", this.state.no_ktp);
      form.append("jenis_kelamin", this.state.jenis_kelamin);
      form.append("tanggal_lahir", this.state.tanggal_lahir);
      form.append("nohp", this.state.nohp);
      form.append("image", this.state.image);

    axios.post(url, form)
    .then(response => {
     // $("#loading").toast("hide");
    this.setState({
    message: response.data.message});
    $("#message").toast("show");
    this.get_user();
    })
    .catch(error => {
    console.log(error);
    });
  }
  Add_alamat=()=>{
    $("#modal_alamat").modal("show");

    this.setState({
      action:"insert",
      id_pengiriman:"",
      id_user:"",
      nama_penerima:"",
      kode_pos:"",
      kecamatan:"",
      kota:"",
      jalan:"",
      rt:"",
      rw:"",
    });
  }
  get_alamat = () => {
    // $("#loading").toast("show");
    let id = JSON.parse(localStorage.getItem('data_pengiriman'))
    // console. log(items)
    let url = "http://localhost/toko_online/public/alamat/"+id.id_pengiriman;
    axios.get(url)
    .then(response => {
    // $("#loading").toast("hide");
    this.setState({
      data_pengiriman: response.data.data_pengiriman,
    });// $("message-).toast("show");
  })
  .catch(error => {
  console.log(error);
  });
// this. setltate({
// user: items,
// id user: items.id_user
 // });
 }
 Edit_alamat=(item)=> {
   $("modal_alamat").modal("show");

   this.setState({
     action:"update",
     id_pengiriman: item.id_pengiriman,
     id_user:item.id_user,
     nama_penerima:item.nama_penerima,
     kode_pos:item.kode_pos,
     kecamatan:item.kecamatan,
     kota:item.kota,
     jalan:item.jalan,
     rt:item.rt,
     rw:item.rw,
   });
 }

 Save_alamat=(event)=>{
   let id = JSON.parse(localStorage.getItem('id_user'))
   event.preventDefault();

   let url = "http://localhost/toko_online/public/alamat/save";
   let form = new FormData();
   form.append("action", this.state.action);
   form.append("id_pengiriman", this.state.id_pengiriman);
   form.append("id_user",this.state.id_user);
   form.append("nama_penerima",this.state.nama_penerima);
   form.append("kode_pos",this.state.kode_pos);
   form.append("nama_penerima",this.state.nama_penerima);
   form.append("kode_pos",this.state.kode_pos);
   form.append("kecamatan",this.state.kecamatan);
   form.append("kota",this.state.kota);
   form.append("rt",this.state.rt);
   form.append("rw",this.state.rw);
   axios.post(url,form)

   .then(response=>{
     this.setState({message: response.data.message});
     $("#message").toast("show");
     this.get_alamat();
     })
     .catch(error => {
     console.log(error);
     });
   }

   Drop_alamat=(id_pengiriman)=>{
     if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
       // $("#loading").toast("show");
       let url = "http://localhost/toko_online/public/alamat/drop/"+id_pengiriman;
       axios.delete(url)
       .then(response => {
         $("#loading").toast("hide");
         this.setState({message: response.data.message});
         $("#message").toast("show");
         this.get_user();
       })
       .catch(error => {
         console.log(error);
       });
     }
   }

  render() {
      return (
          <div className=" container">
              <div className="row">
                  <div className="col-lg-0">
                      <h2 className="my-4">Profil</h2>
                      <div>
                      {this.state.user.map((item,index)=>{
                        return(  <img src={"http://localhost/toko_online/public/images/"+item.image} class="img" width="200px" height="275"/>)
                      })}

                      </div>
                  </div>
                  <div className="col-lg">
                      <br></br><br></br><br></br><br></br>

                      {

                        this.state.user.map((item,index) => {
        console.log(this.state.user);
                          return (
                      <table className="table shadow">
                          <ul class="list-group">
                               <li class="list-group-item">Nama User : {item.nama_user}</li>
                              <li class="list-group-item">Nama Lengkap : {item.nama_lengkap}</li>
                              <li class="list-group-item">Jenis kelamin : {item.jenis_kelamin}</li>
                              <li class="list-group-item">Email: {item.email}</li>
                              <li class="list-group-item">Tanggal Lahir : {item.tgl_lahir}</li>
                              <li class="list-group-item">No. HP : {item.no_hp}</li>

                          </ul>
                      </table>
                    );
                })}
                      <button className="mt-3 btn float-right btn-info" onClick={this.Edit}>
                          <span className="fa fa-edit"></span> Edit Data
                      </button>
                      <Modal id="modal_user" title="Form Profil" bg_header="success" text_header="white">
                          <form onSubmit={this.Save}>
                              Nama User
                                  <input type="text" className="form-control" name="nama_user" value={this.state.nama_user}
                                  onChange={this.bind} required />
                              Nama Lengkap
                                  <input type="text" className="form-control" name="nama_lengkap"
                                  value={this.state.nama_lengkap} onChange={this.bind} required />
                              Jenis Kelamin
                                      <input type="text" className="form-control" name="jenis_kelamin"
                                      value={this.state.jenis_kelamin} onChange={this.bind} required />
                              email
                                  <input type="text" className="form-control" name="email" value={this.state.email}
                                  onChange={this.bind} required />
                              tanggal lahir
                                  <input type="date" className="form-control" name="tanggal_lahir"
                                  value={this.state.tanggal_lahir} onChange={this.bind} required />
                              No Hp
                              <input type="number" className="form-control" name="no_hp" value={this.state.no_hp}
                              onChange={this.bind} required />
                              <button type="submit" className="btn btn-info pull-right m-2">
                                  <span className="fa fa-check"></span> Simpan
                                  </button>
                          </form>
                      </Modal>
                  </div>

              </div>
              <hr />
              <div className="col-lg-0">
                  <h2 className="my-4">Alamat Pengiriman</h2>

                  <Modal id="modal_alamat" title="Form Profil" bg_header="success" text_header="white">
                      <form onSubmit={this.Save}>
                          Alamat
                              <input type="text" className="form-control" name="alamat" value={this.state.alamat}
                              onChange={this.bind} required />
                          RT
                              <input type="number" className="form-control" name="rt"
                              value={this.state.rt} onChange={this.bind} required />
                              RW
                                  <input type="number" className="form-control" name="rw"
                                  value={this.state.rw} onChange={this.bind} required />
                          Kecamatan
                              <input type="text" className="form-control" name="kecamatan" value={this.state.kecamatan}
                              onChange={this.bind} required />
                          Kode POS
                              <input type="text" className="form-control" name="kode_pos"
                              value={this.state.kode_pos} onChange={this.bind} required />
                          <button type="submit" className="btn btn-info pull-right m-2">
                              <span className="fa fa-check"></span> Simpan
                              </button>
                      </form>
                  </Modal>
              </div>
              <div className="col-lg">
                  <br></br>
                  <table className="table shadow bg-light">
                      <ul class="list-group">
                          <li class="list-group-item">Alamat : {this.state.alamat}</li>
                          <li class="list-group-item">RT: {this.state.rt}</li>
                          <li class="list-group-item">RW : {this.state.rw}</li>
                          <li class="list-group-item">Kecamatan : {this.state.kecamatan}</li>
                          <li class="list-group-item">Kode POS : {this.state.kode_pos}</li>
                      </ul>
                  </table>
                  <button className="mt-3 btn float btn-success" onClick={this.Add}>
                      <span className="fa fa-plus"></span> Tambah Alamat
                      </button>
                  <button className="mt-3 btn float-right btn-danger" onClick={this.Add}>
                      <span className="fa fa-trash"></span> Hapus
                      </button>
                  <button className="mt-3 btn float-right btn-info" onClick={this.Add}>
                      <span className="fa fa-edit"></span> Edit
                      </button>
              </div><hr />
          </div>
      );
  }
  }
