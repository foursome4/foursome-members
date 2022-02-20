import './groupsCreated.css'
import capaGrupo from '../../assets/images/capaGrupo.png'
import perfilGrupo from '../../assets/images/perfilGrupo.png'

function GroupsCreated() {
    return (
        <div className="listGroups">
             <div className="groups-all">
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Groups criados por mim</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Entrar no grupo</button>
                                    <button className='Deletar'>Deletar no grupo</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Groups criados por mim</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Entrar no grupo</button>
                                    <button className='Deletar'>Deletar no grupo</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Groups criados por mim</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Entrar no grupo</button>
                                    <button className='Deletar'>Deletar no grupo</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Groups criados por mim</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Entrar no grupo</button>
                                    <button className='Deletar'>Deletar no grupo</button>
                                </div>
                                <div className="group-unic">
                                    <img src={capaGrupo} alt="" className="cover"/>
                                    <img src={perfilGrupo} alt="" className="profile"/>
                                    <h4>Groups criados por mim</h4>
                                    <h6><b>Criado a 3 meses</b></h6>
                                    <h6>Grupo público / 20 Membros</h6>
                                    <button>Entrar no grupo</button>
                                    <button className='Deletar'>Deletar no grupo</button>
                                </div>
                            </div>
        </div>
    )
}

export { GroupsCreated }