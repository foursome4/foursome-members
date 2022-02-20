import './myGroups.css'
import capaGrupo from '../../assets/images/capaGrupo.png'
import perfilGrupo from '../../assets/images/perfilGrupo.png'

function MyGroups() {
    return (
        <div className="listGroups">
             <div className="groups-all">
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Meys Groups</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Sair</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Meys Groups</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Sair</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Meys Groups</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Sair</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Meys Groups</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Sair</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Meys Groups</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Sair</button>
                                </div>
                            </div>
        </div>
    )
}

export { MyGroups }