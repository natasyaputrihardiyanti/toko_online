import React,{Component} from "react"; // melakukan request http
import axios from "axios"; // memberi warningrmasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Pelanggaran extends Component {
  constructor() { // fungsi yang pertama kali dijalankan
    super();
    this.state = { // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      pelanggaran: [],
      id_pelanggaran: "",
      nama_pelanggaran: "",
      kategori: "",
      poin: "0",
      action: "",
      find: "",
      message: ""
    }

    // jika tidak terdapat data token pada local storage
    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
  }

    bind = (event) => { // menghubungkan state dan elemen
      this.setState({[event.target.name] : event.target.value});
    }

    Add = () => {
      // membuka modal
      $("#modal_pelanggaran").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        id_pelanggaran: "",
        nama_pelanggaran: "",
        kategori: "",
        poin: 0
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_pelanggaran").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id_pelanggaran: item.id_pelanggaran,
        nama_pelanggaran: item.nama_pelanggaran,
        kategori: item.kategori,
        poin: item.poin
      });
    }

    get_pelanggaran = () => { // memanggil data dari database
      $("#loading").toast("show"); // menampilkan proses loading
      let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran";
      // memanggil file
      axios.get(url) // mengirim data
      .then(response => {
        // jika berhasil menampilkan data
        this.setState({pelanggaran: response.data.pelanggaran});
        $("#loading").toast("hide"); // menyembunyikan proses loading
      })
      // jika gagal
      .catch(error => {
        console.log(error); // menampilkan pesan error pada console
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // menampilkan pesan konfirmasi
        $("#loading").toast("show"); // menampilkan proses loading
        let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran/drop/"+id;
        // memanggil file untuk di hapus
        axios.delete(url) // mengirim data
        .then(response => {
          $("#loading").toast("hide"); // menyembunyikan proses loading
          // jika berhasil menghapus data
          this.setState({message: response.data.message});
          $("#message").toast("show"); // menampilkan pesan
          this.get_pelanggaran();
        })
        // jika gagal
        .catch(error => {
          console.log(error); // menampilkan pesan error pada console
        });
      }
    }

    componentDidMount = () => { // mengeksekusi fungsi get
      this.get_pelanggaran();
    }

    Save = (event) => {
      event.preventDefault(); // fungsi untuk menjalankan form
      // menampilkan proses loading
      $("#loading").toast("show");
      // menutup form modal
      $("#modal_pelanggaran").modal("hide");
      let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran/save";
      // memanggil file untuk disimpan
      let form = new FormData(); // membungkus data yang akan dikirim melalui API
      form.append("action", this.state.action); // append : memasukkan item ke form data
      form.append("id_pelanggaran", this.state.id_pelanggaran);
      form.append("nama_pelanggaran", this.state.nama_pelanggaran);
      form.append("kategori", this.state.kategori);
      form.append("poin", this.state.poin);
      axios.post(url, form) // mengirim data
      .then(response => {
        $("#loading").toast("hide"); // menyembunyikan proses loading
        // jika berhasil menyimpan data
        this.setState({message: response.data.message});
        $("#message").toast("show"); // menampilkan pesan
        this.get_pelanggaran();
      })
      // jika gagal
      .catch(error => {
        console.log(error); // menapilkan pesan error pada console
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show"); // menampilkan proses loading
        let url = "http://localhost/pelanggaran_sekolah/public/pelanggaran";
        // memanggil file yang dicari
        let form = new FormData(); // membungkus data yang akan dikirim melalui API
        form.append("find", this.state.find); // append : memasukkan item ke form data
        axios.post(url, form) // menampilkan pesan
        .then(response => {
          $("#loading").toast("hide"); // menyembunyikan proses loading
          // jika berhasil mencari data
          this.setState({pelanggaran: response.data.pelanggaran});
        })
        // jika gagal
        .catch(error => {
          console.log(error); // menampilkan pesan error pada console
        });
      }
    }

    render(){ // menampilkan elemen pada halaman web
      return(
        <div className="container">
          <div className="card mt-2">
            {/* header card */}
            <div className="card-header bg-dark">
              <div className="row">
                <div className="col-sm-8">
                  <h4 className="text-warning">Data Pelanggaran</h4>
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian..." />
                </div>
              </div>

            </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="warningrmasi">
                {this.state.message}
              </Toast>
              <Toast id="loading" autohide="false" title="warningrmasi">
                <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
              </Toast>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nama Pelanggaran</th>
                    <th>Kategori</th>
                    <th>Poin</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.pelanggaran.map((item) => { // menampilkan seluruh data pada array
                    return(
                      <tr key={item.id_pelanggaran}>
                        <td>{item.nama_pelanggaran}</td>
                        <td><div className="badge badge-warning">{item.kategori}</div></td>
                        <td>{item.poin}</td>
                        <td>
                          <button className="m-1 btn btn-warning" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-warning"
                            onClick={() => this.Drop(item.id_pelanggaran)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}
              <button className="btn btn-warning my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>

              {/* form modal siswa*/}
              <Modal id="modal_pelanggaran" title="Form Siswa" bg_header="dark" text_header="warning">
                <form onSubmit={this.Save}>
                  Nama Pelanggaran
                  <input type="text" className="form-control" name="nama_pelanggaran"
                    value={this.state.nama_pelanggaran} onChange={this.bind} required />
                  Kategori
                  <select name="kategori" className="form-control" value={this.state.kategori}
                    onChange={this.bind} required >
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Kedisiplinan">Kedisiplinan</option>
                        <option value="Kerajinan">Kerajinan</option>
                        <option value="Kerapian">Kerapian</option>
                  </select>
                  Poin
                  <input type="number" className="form-control" name="poin" value={this.state.poin}
                    onChange={this.bind} required />
                  <button type="submit" className="btn btn-warning pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>


        </div>
      );
    }



}
export default Pelanggaran;
