import { useContext, useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import api from '../../services/api';
import './settingsCharacteristcs.css'

function SettingsCharacteristcs() {
    const {loading, newUpdateCharacteristcs, newUpdateCharacteristcs2, newUpdateCharacteristcs3} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)

    const [characteristics, setCharacteristics] = useState([])
    const [characteristics2, setCharacteristics2] = useState([])
    const [characteristics3, setCharacteristics3] = useState([])

    const [birthDate,setBirthDate] = useState("");
    const [sex,setSex] = useState("");
    const [sign,setSign] = useState("");
    const [sexualOption,setSexualOption] = useState("");
    const [education,setEducation] = useState("");
    const [heigth,setHeigth] = useState("");
    const [weight,setWeight] = useState("");
    const [physique,setPhysique] = useState("");
    const [ethnicity,setEthnicity] = useState("");
    const [eyes,setEyes] = useState("");
    const [hair,setHair] = useState("");
    const [tattos,setTattos] = useState("");
    const [smokes,setSmokes] = useState("");

    const [birthDate2,setBirthDate2] = useState("");
    const [sex2,setSex2] = useState("");
    const [sign2,setSign2] = useState("");
    const [sexualOption2,setSexualOption2] = useState("");
    const [education2,setEducation2] = useState("");
    const [heigth2,setHeigth2] = useState("");
    const [weight2,setWeight2] = useState("");
    const [physique2,setPhysique2] = useState("");
    const [ethnicity2,setEthnicity2] = useState("");
    const [eyes2,setEyes2] = useState("");
    const [hair2,setHair2] = useState("");
    const [tattos2,setTattos2] = useState("");
    const [smokes2,setSmokes2] = useState("");

    const [birthDate3,setBirthDate3] = useState("");
    const [sex3,setSex3] = useState("");
    const [sign3,setSign3] = useState("");
    const [sexualOption3,setSexualOption3] = useState("");
    const [education3,setEducation3] = useState("");
    const [heigth3,setHeigth3] = useState("");
    const [weight3,setWeight3] = useState("");
    const [physique3,setPhysique3] = useState("");
    const [ethnicity3,setEthnicity3] = useState("");
    const [eyes3,setEyes3] = useState("");
    const [hair3,setHair3] = useState("");
    const [tattos3,setTattos3] = useState("");
    const [smokes3,setSmokes3] = useState("");


    useEffect(() => {
        async function loadCharacteristcs() {
            const idAccount = user.id
            await api.get(`characteristics/${idAccount}`)
            .then((res) => {
              setCharacteristics(res.data[0])
              setCharacteristics2(res.data[1])
              setCharacteristics3(res.data[2])
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          loadCharacteristcs()
    }, [user.id])


    function handleUpdateCharacteristcs(e){
        e.preventDefault()
        newUpdateCharacteristcs({
                id: characteristics.id,
                idAccount: user.id,
                birthDate: birthDate === "" ? characteristics.birthDate : birthDate,
                sex: sex === "" ? characteristics.sex : sex,
                sign: sign === "" ? characteristics.sign : sign,
                sexualOption: sexualOption === "" ? characteristics.sexualOption : sexualOption,
                idPatrono: user.patron,
                username: user.sername,
            })

    }
    function handleUpdateCharacteristcs2(e){
        e.preventDefault()
        
        newUpdateCharacteristcs2({
            idAccount: user.id,
            id2: characteristics.id,
            birthDate2: birthDate2 === "" ? characteristics2.birthDate : birthDate2,
            sex2: sex2 === "" ? characteristics2.sex : sex2,
            sign2: sign2 === "" ? characteristics2.sign : sign2,
            sexualOption2: sexualOption2 === "" ? characteristics2.sexualOption : sexualOption2,
            id: characteristics2.id,
                birthDate: birthDate === "" ? characteristics.birthDate : birthDate,
                sex: sex === "" ? characteristics.sex : sex,
                sign: sign === "" ? characteristics.sign : sign,
                sexualOption: sexualOption === "" ? characteristics.sexualOption : sexualOption,
                idPatrono: user.patron,
                username: user.sername,
            })

       
    }
    function handleUpdateCharacteristcs3(e){
        e.preventDefault()
        
        newUpdateCharacteristcs3({
                id3: characteristics3.id,
                idAccount: user.id,
                birthDate3: birthDate3 === "" ? characteristics3.birthDate : birthDate3,
                sex3: sex3 === "" ? characteristics3.sex : sex3,
                sign3: sign3 === "" ? characteristics3.sign : sign3,
                sexualOption3: sexualOption3 === "" ? characteristics3.sexualOption : sexualOption3,
                id2: characteristics2.id,
                birthDate2: birthDate2 === "" ? characteristics2.birthDate : birthDate2,
                sex2: sex2 === "" ? characteristics2.sex : sex2,
                sign2: sign2 === "" ? characteristics2.sign : sign2,
                sexualOption2: sexualOption2 === "" ? characteristics2.sexualOption : sexualOption2,
                id: characteristics.id,
                birthDate: birthDate === "" ? characteristics.birthDate : birthDate,
                sex: sex === "" ? characteristics.sex : sex,
                sign: sign === "" ? characteristics.sign : sign,
                sexualOption: sexualOption === "" ? characteristics.sexualOption : sexualOption,
                idPatrono: user.patron,
                username: user.sername,
            })
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

    function handleSelectEducation(e) {
        setEducation(e.target.value)
    }

    function handleSelectPhysique(e) {
        setPhysique(e.target.value)
    }

    function handleSelectEthnicity(e) {
        setEthnicity(e.target.value)
    }

    function handleSelectEyes(e) {
        setEyes(e.target.value)
    }

    function handleSelectHair(e) {
        setHair(e.target.value)
    }

    function handleSelectSmokes(e) {
        setSmokes(e.target.value)
    }

    function handleSelectTatoo(e) {
        setTattos(e.target.value)
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

    function handleSelectEducation2(e) {
        setEducation2(e.target.value)
    }

    function handleSelectPhysique2(e) {
        setPhysique2(e.target.value)
    }

    function handleSelectEthnicity2(e) {
        setEthnicity2(e.target.value)
    }

    function handleSelectEyes2(e) {
        setEyes2(e.target.value)
    }

    function handleSelectHair2(e) {
        setHair2(e.target.value)
    }

    function handleSelectSmokes2(e) {
        setSmokes2(e.target.value)
    }

    function handleSelectTatoo2(e) {
        setTattos2(e.target.value)
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

    function handleSelectEducation3(e) {
        setEducation3(e.target.value)
    }

    function handleSelectPhysique3(e) {
        setPhysique3(e.target.value)
    }

    function handleSelectEthnicity3(e) {
        setEthnicity3(e.target.value)
    }

    function handleSelectEyes3(e) {
        setEyes3(e.target.value)
    }

    function handleSelectHair3(e) {
        setHair3(e.target.value)
    }

    function handleSelectSmokes3(e) {
        setSmokes3(e.target.value)
    }

    function handleSelectTatoo3(e) {
        setTattos3(e.target.value)
    }




    return (
            <div className="settingsCharacteristcs">
                        <form action="">
                            <div className="data">
                            <br /><br />
                   {user.type === "Trisal" ?
                    <div className="data-form">   
                    <span>Membro casal 1</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate === "" ? characteristics.birthDate : birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={sex === "" ?  characteristics.sex : sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption === "" ? characteristics.sexualOption : sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education === "" ? characteristics.education : education} onChange={handleSelectEducation}>
                                <option value="">Escolaridade</option>
                                <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto </option>
                                <option value="Ensino Fundamental Completo">Ensino Fundamental Completo </option>
                                <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                                <option value="Faculdade Cursando">Faculdade Cursando</option>
                                <option value="Faculdade Completo">Faculdade Completo</option>
                                <option value="Mestrado/Doutorado Cursando">Mestrado/Doutorado Cursando</option>
                                <option value="Mestrado/Doutorado Completo">Mestrado/Doutorado Completo</option>
                            </select>
                            <select value={sign === "" ? characteristics.sign : sign} onChange={handleSelectSign}>
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

                    <input type="text" placeholder="Altura" value={heigth === "" ?  characteristics.heigth : heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight === "" ?  characteristics.weight : weight}  onChange={(e) => setWeight(e.target.value)}/>
                    <select value={physique === "" ? characteristics.physique : physique} onChange={handleSelectPhysique}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes === "" ? characteristics.eyes : eyes} onChange={handleSelectEyes}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity === "" ? characteristics.ethnicity : ethnicity} onChange={handleSelectEthnicity}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair === "" ? characteristics.hair : hair} onChange={handleSelectHair}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos === "" ? characteristics.tattos : tattos} onChange={handleSelectTatoo}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes === "" ? characteristics.smokes : smokes} onChange={handleSelectSmokes}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <br /><br />
                    <span>Membro casal 2</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate2 === "" ? characteristics2.birthDate : birthDate2}  onChange={(e) => setBirthDate2(e.target.value)}/>
                    <select value={sex2 === "" ? characteristics2.sex : sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption2 === "" ? characteristics2.sexualOption : sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education2 === "" ? characteristics2.education : education2} onChange={handleSelectEducation2}>
                                <option value="">Escolaridade</option>
                                <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto </option>
                                <option value="Ensino Fundamental Completo">Ensino Fundamental Completo </option>
                                <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                                <option value="Faculdade Cursando">Faculdade Cursando</option>
                                <option value="Faculdade Completo">Faculdade Completo</option>
                                <option value="Mestrado/Doutorado Cursando">Mestrado/Doutorado Cursando</option>
                                <option value="Mestrado/Doutorado Completo">Mestrado/Doutorado Completo</option>
                            </select>
                            <select value={sign2 === "" ? characteristics2.sign : sign2} onChange={handleSelectSign2}>
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

                    <input type="text" placeholder="Altura" value={heigth2 === "" ? characteristics2.heigth : heigth2}  onChange={(e) => setHeigth2(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight2 === "" ? characteristics2.weight : weight2}  onChange={(e) => setWeight2(e.target.value)}/>
                    <select value={physique2 === "" ? characteristics2.physique : physique2} onChange={handleSelectPhysique2}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes2 === "" ? characteristics2.birthDate : birthDate2} onChange={handleSelectEyes2}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity2 === "" ? characteristics2.ethnicity : ethnicity2} onChange={handleSelectEthnicity2}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair2 === "" ? characteristics2.hair : hair2} onChange={handleSelectHair2}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos2 === "" ? characteristics2.tattos : tattos2} onChange={handleSelectTatoo2}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes2 === "" ? characteristics2.smokes : smokes2} onChange={handleSelectSmokes2}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                            <br /><br />
                    <span>Membro casal 3</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate3 === "" ? characteristics3.birthDate : birthDate3}  onChange={(e) => setBirthDate3(e.target.value)}/>
                    <select value={sex3 === "" ? characteristics3.sex : sex3} onChange={handleSelectSex3}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption3 === "" ? characteristics3.sexualOption : sexualOption3} onChange={handleSelectSexualOption3}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education3 === "" ? characteristics3.education : education3} onChange={handleSelectEducation3}>
                                <option value="">Escolaridade</option>
                                <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto </option>
                                <option value="Ensino Fundamental Completo">Ensino Fundamental Completo </option>
                                <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                                <option value="Faculdade Cursando">Faculdade Cursando</option>
                                <option value="Faculdade Completo">Faculdade Completo</option>
                                <option value="Mestrado/Doutorado Cursando">Mestrado/Doutorado Cursando</option>
                                <option value="Mestrado/Doutorado Completo">Mestrado/Doutorado Completo</option>
                            </select>
                            <select value={sign3 === "" ? characteristics3.sign : sign3} onChange={handleSelectSign3}>
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

                    <input type="text" placeholder="Altura" value={heigth3 === "" ? characteristics3.heigth : heigth3}  onChange={(e) => setHeigth3(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight3 === "" ? characteristics3.weight : weight3}  onChange={(e) => setWeight3(e.target.value)}/>
                    <select value={physique3 === "" ? characteristics3.physique : physique3} onChange={handleSelectPhysique3}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes3 === "" ? characteristics3.eyes : eyes3} onChange={handleSelectEyes3}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity3 === "" ? characteristics3.ethnicity : ethnicity3} onChange={handleSelectEthnicity3}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair3 === "" ? characteristics3.hair : hair3} onChange={handleSelectHair3}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos3 === "" ? characteristics3.tattos : tattos3} onChange={handleSelectTatoo3}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes3 === "" ? characteristics3.smokes : smokes3} onChange={handleSelectSmokes3}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>

                            <div className='confirmation'>
                        <button onClick={handleUpdateCharacteristcs3}>{loading === true ? <FiRefreshCcw /> : "Atualizar"}</button>
                        
                    </div>
             </div>
             : user.type === "Casal"?
             <div className="data-form">
                  <span>Membro casal 1</span><br />
                  <input type="date" placeholder="Data de Nascimenrto" value={birthDate === "" ? characteristics.birthDate : birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={sex === "" ?  characteristics.sex : sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption === "" ? characteristics.sexualOption : sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education === "" ? characteristics.education : education} onChange={handleSelectEducation}>
                                <option value="">Escolaridade</option>
                                <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto </option>
                                <option value="Ensino Fundamental Completo">Ensino Fundamental Completo </option>
                                <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                                <option value="Faculdade Cursando">Faculdade Cursando</option>
                                <option value="Faculdade Completo">Faculdade Completo</option>
                                <option value="Mestrado/Doutorado Cursando">Mestrado/Doutorado Cursando</option>
                                <option value="Mestrado/Doutorado Completo">Mestrado/Doutorado Completo</option>
                            </select>
                            <select value={sign === "" ? characteristics.sign : sign} onChange={handleSelectSign}>
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

                    <input type="text" placeholder="Altura" value={heigth === "" ?  characteristics.heigth : heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight === "" ?  characteristics.weight : weight}  onChange={(e) => setWeight(e.target.value)}/>
                    <select value={physique === "" ? characteristics.physique : physique} onChange={handleSelectPhysique}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes === "" ? characteristics.eyes : eyes} onChange={handleSelectEyes}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity === "" ? characteristics.ethnicity : ethnicity} onChange={handleSelectEthnicity}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair === "" ? characteristics.hair : hair} onChange={handleSelectHair}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos === "" ? characteristics.tattos : tattos} onChange={handleSelectTatoo}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes === "" ? characteristics.smokes : smokes} onChange={handleSelectSmokes}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>

                            
                            
                            <br /><br />
                    <span>Membro casal 2</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate2 === "" ? characteristics2.birthDate : birthDate2}  onChange={(e) => setBirthDate2(e.target.value)}/>
                    <select value={sex2 === "" ? characteristics2.sex : sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption2 === "" ? characteristics2.sexualOption : sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education2 === "" ? characteristics2.education : education2} onChange={handleSelectEducation2}>
                                <option value="">Escolaridade</option>
                                <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto </option>
                                <option value="Ensino Fundamental Completo">Ensino Fundamental Completo </option>
                                <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                                <option value="Faculdade Cursando">Faculdade Cursando</option>
                                <option value="Faculdade Completo">Faculdade Completo</option>
                                <option value="Mestrado/Doutorado Cursando">Mestrado/Doutorado Cursando</option>
                                <option value="Mestrado/Doutorado Completo">Mestrado/Doutorado Completo</option>
                            </select>
                            <select value={sign2 === "" ? characteristics2.sign : sign2} onChange={handleSelectSign2}>
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

                    <input type="text" placeholder="Altura" value={heigth2 === "" ? characteristics2.heigth : heigth2}  onChange={(e) => setHeigth2(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight2 === "" ? characteristics2.weight : weight2}  onChange={(e) => setWeight2(e.target.value)}/>
                    <select value={physique2 === "" ? characteristics2.physique : physique2} onChange={handleSelectPhysique2}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes2 === "" ? characteristics2.birthDate : birthDate2} onChange={handleSelectEyes2}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity2 === "" ? characteristics2.ethnicity : ethnicity2} onChange={handleSelectEthnicity2}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair2 === "" ? characteristics2.hair : hair2} onChange={handleSelectHair2}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos2 === "" ? characteristics2.tattos : tattos2} onChange={handleSelectTatoo2}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes2 === "" ? characteristics2.smokes : smokes2} onChange={handleSelectSmokes2}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>

                            <div className='confirmation'>
                        <button onClick={handleUpdateCharacteristcs2}>{loading === true ? <FiRefreshCcw /> : "Atualizar"}</button>
                        
                    </div>
             </div>
             :
             <div className="data-form">
                                      <input type="date" placeholder="Data de Nascimenrto" value={birthDate === "" ? characteristics.birthDate : birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={sex === "" ?  characteristics.sex : sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption === "" ? characteristics.sexualOption : sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education === "" ? characteristics.education : education} onChange={handleSelectEducation}>
                                <option value="">Escolaridade</option>
                                <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto </option>
                                <option value="Ensino Fundamental Completo">Ensino Fundamental Completo </option>
                                <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                                <option value="Faculdade Cursando">Faculdade Cursando</option>
                                <option value="Faculdade Completo">Faculdade Completo</option>
                                <option value="Mestrado/Doutorado Cursando">Mestrado/Doutorado Cursando</option>
                                <option value="Mestrado/Doutorado Completo">Mestrado/Doutorado Completo</option>
                            </select>
                            <select value={sign === "" ? characteristics.sign : sign} onChange={handleSelectSign}>
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

                    <input type="text" placeholder="Altura" value={heigth === "" ?  characteristics.heigth : heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight === "" ?  characteristics.weight : weight}  onChange={(e) => setWeight(e.target.value)}/>
                    <select value={physique === "" ? characteristics.physique : physique} onChange={handleSelectPhysique}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes === "" ? characteristics.eyes : eyes} onChange={handleSelectEyes}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity === "" ? characteristics.ethnicity : ethnicity} onChange={handleSelectEthnicity}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair === "" ? characteristics.hair : hair} onChange={handleSelectHair}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos === "" ? characteristics.tattos : tattos} onChange={handleSelectTatoo}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes === "" ? characteristics.smokes : smokes} onChange={handleSelectSmokes}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                   <div className='confirmation'>
                        <button onClick={handleUpdateCharacteristcs}>{loading === true ? <FiRefreshCcw /> : "Atualizar"}</button>
                        
                    </div>               
             </div>
                }
                </div>

                        </form>
            </div>
    )
}

export {SettingsCharacteristcs}