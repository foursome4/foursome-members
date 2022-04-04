import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import logoImg from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/Auth';
import './characteristcsForm.css'

function CharacteristcsForm() {
    const {updateCharacteristcs, updateCharacteristcs2, updateCharacteristcs3, logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)
    const LocalCharacteristics = localStorage.getItem("characteritics-foursome");

    const [data,setData] = useState("");
    const [sex,setSex] = useState("");
    const [sign,setSign] = useState("");
    const [sexualOption,setSexualOption] = useState("");

    const [data2,setData2] = useState("");
    const [sex2,setSex2] = useState("");
    const [sign2,setSign2] = useState("");
    const [sexualOption2,setSexualOption2] = useState("");

    const [data3,setData3] = useState("");
    const [sex3,setSex3] = useState("");
    const [sign3,setSign3] = useState("");
    const [sexualOption3,setSexualOption3] = useState("");

    function handleUpdateCharacteristcs(e){
        e.preventDefault()
        
        if(data && sex && sign && sexualOption && data2 && sex2 && sign2 && sexualOption2 && data3 && sex3 && sign3 && sexualOption3 !== "") {
            toast.info("Salvando Caracteristicas do trisal. Aguarde...")
            updateCharacteristcs3({
                idAccount: user.id,
                data3,
                sex3,
                sign3,
                sexualOption3,
                data2,
                sex2,
                sign2,
                sexualOption2,
                data,
                sex,
                sign,
                sexualOption})
        } else if ( data && sex && sign && sexualOption && data2 && sex2 && sign2 && sexualOption2 !== "") {
            toast.info("Salvando Caracteristicas do casal. Aguarde...")
            updateCharacteristcs2({
                idAccount: user.id,
                data2,
                sex2,
                sign2,
                sexualOption2,
                data,
                sex,
                sign,
                sexualOption,
            })

        } else if ( data && sex && sign && sexualOption !== "") {
            toast.info("Salvando Caracteristicas. Aguarde...")
            updateCharacteristcs({
                idAccount: user.id,
                data,
                sex,
                sign,
                sexualOption})

        }
    }

//-----------------------------------

    function handleSelectSex(e) {
        setSex(e.target.value)
    }
    
    
    function handleSelectSign(e) {
        setSign(e.target.value)
    }

    function handleSelectSexualOption(e) {
        setSexualOption(e.target.value)
    }

    function handleSelectSex2(e) {
        setSex2(e.target.value)
    }

    function handleSelectSign2(e) {
        setSign2(e.target.value)
    }

    function handleSelectSexualOption2(e) {
        setSexualOption2(e.target.value)
    }

    function handleSelectSex3(e) {
        setSex3(e.target.value)
    }


    function handleSelectSign3(e) {
        setSign3(e.target.value)
    }

    function handleSelectSexualOption3(e) {
        setSexualOption3(e.target.value)
    }



    return (
            <div className="content-Login">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Caracteristicas</h2>
                    </div>
                        <form onSubmit={handleUpdateCharacteristcs}>
                            <div className="data">
                            <br /><br />
                   {user.type === "Trisal" ?
                    <div className="data-form">   
                    <span>Membro casal 1</span><br />
                    <h5>Data de nascimento</h5>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
                    <select required value={sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select required value={sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select required value={sign} onChange={handleSelectSign}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
                    <br /><br />
                    <span>Membro casal 2</span><br />
                    <h5>Data de nascimento</h5>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data2}  onChange={(e) => setData2(e.target.value)}/>
                    <select required value={sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select required value={sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select required value={sign2} onChange={handleSelectSign2}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>

                            <br /><br />
                    <span>Membro casal 3</span><br />
                    <h5>Data de nascimento</h5>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data3}  onChange={(e) => setData3(e.target.value)}/>
                    <select required value={sex3} onChange={handleSelectSex3}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select required value={sexualOption3} onChange={handleSelectSexualOption3}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select required value={sign3} onChange={handleSelectSign3}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
       </div>
             : user.type === "Casal"?
             <div className="data-form">
                  <span>Membro casal 1</span><br />
                  <h5>Data de nascimento</h5>
                  <input required type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
                    <select required value={sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select required value={sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select required value={sign} onChange={handleSelectSign}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
                            
                            <br /><br />
                    <span>Membro casal 2</span><br />
                    <h5>Data de nascimento</h5>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data2}  onChange={(e) => setData2(e.target.value)}/>
                    <select required value={sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select required value={sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select required value={sign2} onChange={handleSelectSign2}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>

             </div>
             :
             <div className="data-form">
                     <h5>Data de nascimento</h5>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
                    <select required value={sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select required value={sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select required value={sign} onChange={handleSelectSign}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
             </div>
                }
                </div>
                <br />
                    <div className='confirmation'>
                        <div className="confirmation_characteristcsForm">
                        <input required type="checkbox"/>
                        <span>Minhas informações estão corretas!</span>
                        </div>
                        <button type='submit'>"Salvar e avançar"</button>
                        
                    </div>
                        </form>
            </div>
    )
}

export {CharacteristcsForm}