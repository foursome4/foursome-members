import "./settingsDataAccess.css"

function SettingsDataAccess() {

    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations= JSON.parse(LocalInformations);


    return (
        <div className="settingsDataAccess">
            <form action="">
                <input type="email" value={user.email} placeholder="E-mail"/>
                <input type="phone" value={user.phone} placeholder="Telefone"/>
                <select value={user.type} onChange={""}>
                                <option value="">Tipo de conta</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                                <option value="Casal">Casal</option>
                                <option value="Trisal">Trisal</option>
                                <option value="Transex">Transex</option>
                                <option value="Travestis">Travestis</option>
                            </select>
                <input type="username" value={user.username} disabled="disabled" placeholder="username"/>
                <input type="password" placeholder="Senha"/>
                <input type="password" placeholder="Confirmar Senha"/>
                <button>Atualizar</button>
            </form>
        </div>
    )
}

export { SettingsDataAccess }