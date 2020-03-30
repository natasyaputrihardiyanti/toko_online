this.state.data_pengiriman.map((item)=> {
    return(
      
        const { user, data_pengiriman } = this.state;
        <div class="col-sm-6">
        
        <div class="card" style={{marginBottom: "20px"}}>
          <div class="card-header text-white bg-info" style={{textAlign:"center"}}>
            {item.id_pengiriman}
          </div>
          <div class="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Nama Penerima : {item.nama_penerima} </li>
              <li className="list-group-item">Kode Pos : {item.kode_pos} </li>
              <li className="list-group-item">Kecamatan : {item.kecamatan} </li>
              <li className="list-group-item">Kota : {item.kota} </li>
              <li className="list-group-item">Jalan : {item.jalan} </li>
              <li className="list-group-item">RT :  {item.rt} </li>
              <li className="list-group-item">RW : {item.rw} </li>
              <li className="list-group-item">
                <button className="m-1 btn btn-sm btn-outline-success" onClick={()=> this.Edit_alamat(item)}>
                  Edit
                </button>
                <button className="m-1 btn btn-sm btn-outline-success" onClick={()=> this.Drop_alamat(item.id_pengiriman)}>
                  Hapus
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
       } )}
       );
   