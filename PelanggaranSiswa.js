import React, {Component} from "react"; // melakukan request http
import axios from "axios"; // memberi informasi dalam bentuk text
import $ from "jquery";
import Toast from "../component/Toast";
import Modal from "../component/Modal";

class PelanggaranSiswa extends Component {
  constructor() { // fungsi yang pertama kali dijalankan
      super();
      this.state = { // inisiasi state ( menyediakan tempat data yang dibutuhkan)
        siswa: [],
        pelanggaran_siswa: [],
        pelanggaran: [],
        id_pelanggaran: "",
        list_pelanggaran: [],
        id_siswa: ""
      }

      // jika tidak terdapat data token pada local storage
      if(!localStorage.getItem("Token")){
        // direct ke halaman login
        window.location = "/login";
      }
    }

    bind = (event) => { // mmenghubungkan state dan elemen
      this.setState({[event.target.name]: event.target.value});
    }

    get_siswa = () => { // memanggil API untuk mendapat data dari database
      // tampilkan loading
      $("#loading").toast("show");
      let url = "http://localhost/pelanggaran_sekolah/public/siswa";
      // memanggil file
      axios.get(url) // mengirim data
      .then(response => {
        // hilangkan loading
        $("#loading").toast("hide");
        this.setState({siswa: response.data.siswa});
      })
      .catch(error => {
        console.log(error); // menampilkan pesan error pada console
      });
    }


    get_pelanggaran = () => { // memanggil API untuk mendapat data dari database
      let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran";
      // memanggil file
      axios.get(url) // mengirim data
      .then(response => {
        // jika berhasil menampilkan data
        this.setState({pelanggaran: response.data.pelanggaran});
      })
      // jika gagal
      .catch(error => {
        console.log(error); // menampilkan pesan error pada console
      });
    }

    get_pelanggaran_siswa = () => { // memanggil data dari database
      let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran_siswa";
      // memanggil file
      axios.get(url) // mengirim data
      .then(response => {
        // jika berhasil menampilkan data
        this.setState({pelanggaran_siswa: response.data.pelanggaran_siswa});
      })
      // jika gagal
      .catch(error => {
        console.log(error); // menampilkan pesan error pada console
      });
    }

    componentDidMount(){ // mengeksekusi fungsi get
      this.get_pelanggaran_siswa();
      this.get_siswa();
      this.get_pelanggaran();
    }

    AddPelanggaran = () => { // fungsi untuk menambah data
      if (this.state.id_pelanggaran !== "") {
        let id = this.state.id_pelanggaran;
        let item = this.state.pelanggaran.find(itm => itm.id_pelanggaran == id);
        console.log(item);
        let temp = this.state.list_pelanggaran;
        temp.push(item);
        this.setState({list_pelanggaran: temp});
      }
    }

    DropList = (index) => { // fungsi untuk menghapus data
      let temp = this.state.list_pelanggaran;
      temp.splice(index,1);
      this.setState({list_pelanggaran: temp});
    }

    Add = () => {
      // membuka modal
      $("#modal_pelanggaran").modal("show");
      this.setState({ // mengosongkan data pada form
        id_siswa: "",
        id_pelanggaran: "",
        list_pelanggaran: []
      });
    }

    Save = (event) => {
      event.preventDefault(); // fungsi untuk menjalankan form
      // tampilkan loading
      $("#loading").toast("show");

      // tutup form modal pelanggaran siswa
      $("#modal_pelanggaran").modal("hide");
      let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran_siswa/save";
      // memanggil file untuk disimpan
      // ambil data user dari local storage
      let user = JSON.parse(localStorage.getItem("user"));
      let form = new FormData(); // membungkus data yang akan dikirim melalui API
      form.append("id_siswa", this.state.id_siswa);// append: memasukkan item ke form data
      form.append("id_user", user.id_user);
      form.append("detail_pelanggaran", JSON.stringify(this.state.list_pelanggaran));
      axios.post(url,form) // mengirim data
      .then(response => {
        // hilangkan loading
        $("#loading").toast("hide");
        // jika berhasil
        this.get_pelanggaran_siswa();
        this.setState({list_pelanggaran: []});
        // tampilkan pesan
        $("#message").toast("show");
      })
      // jika gagal
      .catch(error => {
        console.log(error); // menampilkan pesan error pada console
      });
    }

    Drop = (id_pelanggaran_siswa) => {
      if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // menampilkan pesan konfirmasi
        // tampilkan loading
        $("#loading").toast("show");
        let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran_siswa/drop/"+id_pelanggaran_siswa;
        // memanggil file untuk dihapus
        axios.delete(url) // mengirim data
        .then(response => {
          // tampilkan loading
          $("#loading").toast("show");
          // jika berhasil
          this.setState({message: response.data.message});
          this.get_pelanggaran_siswa();

          // tampilkan pesan
          $("#message").toast("show");
        })
        // jika gagal
        .catch(error => {
          console.log(error); // menampilkan pesan error pada console
        });
      }
    }

    render(){
      return(
        <div className="container">
        <div className="card my-2">
        <div className="card-header bg-dark">
        <h4 className="text-warning">Data Pelanggaran Siswa</h4>
        </div>
        <div className="card-body">
        <Toast id="loading" autohide="false" title="Informasi">

        <span className="fa fa-spin fa-spinner"></span> Memuat Data...

        </Toast>

        <Toast id="message" autohide="true" title="Informasi">

        { this.state.message }
        </Toast>
        <table className="table">
        <thead>
        <tr>
        <td>Tanggal</td>
        <td>Nama Siswa</td>
        <td>Pelanggaran</td>
        <td>Option</td>
        </tr>
        </thead>
        <tbody>
        { this.state.pelanggaran_siswa.map(item => { // menampilkan seluruh data pada array
          return(
            <tr key={item.id_pelanggaran_siswa}>
            <td>{item.waktu}</td>
            <td>{item.nama_siswa}</td>
            <td>
            <ul>
            { item.detail_pelanggaran.map(it => {
              return(
                <li key={it.id_pelanggaran}>
                {it.nama_pelanggaran}
                </li>
              );
            }) }
            </ul>
            </td>
            <td>
            <button className="btn btn-sm btn-warning"
            onClick={() => this.Drop(item.id_pelanggaran_siswa)}>
            <span className="fa fa-trash"></span> Hapus
            </button>
            </td>
            </tr>
          );
        }) }
        </tbody>
        </table>

        <button className="btn btn-warning my-2" onClick={this.Add}>
        <span className="fa fa-plus"></span> Tambah Data
        </button>
        </div>
        </div>


        {/* form modal pelanggaran siswa*/}
        <Modal id="modal_pelanggaran" title="Form Pelanggaran Siswa" bg_header="dark" text_header="warning">
        <form onSubmit={this.Save}>
        Nama Siswa

        <select name="id_siswa" className="form-control" value={this.state.id_siswa}

        onChange={this.bind} required>
        <option value="">-- Pilih Siswa --</option>
        { this.state.siswa.map(item => {
          return (
            <option key={item.id_siswa} value={item.id_siswa}>
            {item.nama_siswa}

            </option>
          );
        }) }
        </select>
        Pilih Pelanggaran
        <select name="id_pelanggaran" className="form-control"
        value={this.state.id_pelanggaran}
        onChange={this.bind} required>
        <option value="">-- Pilih Pelanggaran --</option>
        { this.state.pelanggaran.map(item => {
          return (
            <option key={item.id_pelanggaran} value={item.id_pelanggaran}>
            {item.nama_pelanggaran}
            </option>
          );
        }) }
        </select>

        <button type="button" className="btn btn-warning btn-sm btn-primary my-1"
        onClick={this.AddPelanggaran}>
        Tambahkan Pelanggaran
        </button>

        <ul>
        {this.state.list_pelanggaran.map((item,index) => {
          return (
            <li key={item.id_pelanggaran+index}>
            {item.nama_pelanggaran}

            [<a className="text-warning" onClick={() => this.DropList(index)}>X</a>]

            </li>
          );
        })}
        </ul>

        <button className="pull-right btn btn-warning my-2" type="submit">
        <span className="fa fa-check"></span> Simpan
        </button>
        </form>
        </Modal>
        </div>
      );
    }
  }
  export default PelanggaranSiswa;
