function MyAccount() {
  return (
    <div className="myAccount">
      <div className="profile">
        <h3>Dados pessoais</h3>
        <div className="selection">
        <span></span>
        <input type="radio" name="" id="" />
        </div>
      </div>
      <div className="access">
        <h3>Dados de acesso</h3>
      </div>
      <div className="preferences">
      <h3>Preferências</h3>
      </div>
      <div className="privacity">
      <h3>Privacidade</h3>
      </div>
    </div>
  )
}

export { MyAccount }