import logoImg from '../../assets/images/logo2.png';
import './characteristcsForm.css'

function CharacteristcsForm() {
    return (
            <div className="informations">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Caracteristicas</h2>
                    </div>
                        <form action="">
                    <div className="data">                      
                            <input type="date" placeholder="Data de Nascimenrto"/>
                            <input type="text" placeholder="Signo"/>
                            <input type="text" placeholder="Escolaridade"/>
                            <input type="text" placeholder="Altura"/>
                            <input type="text" placeholder="Fisico"/>
                            <input type="text" placeholder="Olhos"/>
                            <input type="text" placeholder="Etinia"/>
                            <input type="text" placeholder="Alto / Baixo"/>
                            <input type="text" placeholder="Atletico / Esbelto / MNagro"/>
                            <input type="text" placeholder="Tatuagens?"/>
                            <input type="text" placeholder="Fumante?"/>
                            <input type="text" placeholder="Amizade ou Pegação"/>
                     </div>
                    <div className='confirmation'>
                        <div className="confirmation_informations">
                        <input type="checkbox"/>
                        <span>Minhas informações estão corretas!</span>
                        </div>
                        <button>Salvar e Avançar</button>
                        
                    </div>
                        </form>
            </div>
    )
}

export {CharacteristcsForm}