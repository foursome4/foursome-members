import { useContext, useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import logoImg from '../../assets/images/logo.png';
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

    const [birthDate,setBirthDate] = useState(characteristics.data);
    const [sex,setSex] = useState(characteristics.sex);
    const [sign,setSign] = useState(characteristics.sign);
    const [sexualOption,setSexualOption] = useState(characteristics.sexualOption);
    const [education,setEducation] = useState(characteristics.education);
    const [heigth,setHeigth] = useState("");
    const [weight,setWeight] = useState("");
    const [physique,setPhysique] = useState(characteristics.physique);
    const [ethnicity,setEthnicity] = useState(characteristics.ethnicity);
    const [eyes,setEyes] = useState(characteristics.eyes);
    const [hair,setHair] = useState(characteristics.hair);
    const [tattos,setTattos] = useState(characteristics.tattos);
    const [smokes,setSmokes] = useState(characteristics.smokes);

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
              console.log(res.data[0])
              console.log(res.data[1])
              console.log(res.data[2])
              setCharacteristics(res.data[0])
              setCharacteristics2(res.data[1])
              setCharacteristics3(res.data[2])
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          loadCharacteristcs()
    }, [])


    function handleUpdateCharacteristcs(e){
        e.preventDefault()
        
        if(birthDate && sex && sign && sexualOption && education && heigth && weight && physique && ethnicity && eyes && hair && tattos && smokes && birthDate2 && sex2 && sign2 && sexualOption2 && education2 && heigth2 && weight2 && physique2 && ethnicity2 && eyes2 && hair2 && tattos2 && smokes2 && birthDate3 && sex3 && sign3 && sexualOption3 && education3 && heigth3 && weight3 && physique3 && ethnicity3 && eyes3 && hair3 && tattos3 && smokes3 !== "") {
            newUpdateCharacteristcs3({
                idAccount: user.id,
                birthDate3,
                sex3,
                sign3,
                sexualOption3,
                education3,
                heigth3,
                weight3,
                physique3,
                ethnicity3,
                eyes3,
                hair3,
                tattos3,
                smokes3,
                idAccount: user.id,
                birthDate2,
                sex2,
                sign2,
                sexualOption2,
                education2,
                heigth2,
                weight2,
                physique2,
                ethnicity2,
                eyes2,
                hair2,
                tattos2,
                smokes2,
                idAccount: user.id,
                birthDate,
                sex,
                sign,
                sexualOption,
                education,
                heigth,
                weight,
                physique,
                ethnicity,
                eyes,
                hair,
                tattos,
                smokes})
        } else if ( birthDate && sex && sign && sexualOption && education && heigth && weight && physique && ethnicity && eyes && hair && tattos && smokes && birthDate2 && sex2 && sign2 && sexualOption2 && education2 && heigth2 && weight2 && physique2 && ethnicity2 && eyes2 && hair2 && tattos2 && smokes2  !== "") {
            
            newUpdateCharacteristcs2({
                idAccount: user.id,
                birthDate2,
                sex2,
                sign2,
                sexualOption2,
                education2,
                heigth2,
                weight2,
                physique2,
                ethnicity2,
                eyes2,
                hair2,
                tattos2,
                smokes2,
                birthDate,
                sex,
                sign,
                sexualOption,
                education,
                heigth,
                weight,
                physique,
                ethnicity,
                eyes,
                hair,
                tattos,
                smokes
            })

        } else if ( birthDate && sex && sign && sexualOption && education && heigth && weight && physique && ethnicity && eyes && hair && tattos && smokes  !== "") {
            newUpdateCharacteristcs({
                idAccount: user.id,
                birthDate,
                sex,
                sign,
                sexualOption,
                education,
                heigth,
                weight,
                physique,
                ethnicity,
                eyes,
                hair,
                tattos,
                smokes})

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
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={characteristics.sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={characteristics.sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={characteristics.education} onChange={handleSelectEducation}>
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
                            <select value={characteristics.sign} onChange={handleSelectSign}>
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

                    <input type="text" placeholder="Altura" value={characteristics.heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={characteristics.weight}  onChange={(e) => setWeight(e.target.value)}/>
                    <select value={characteristics.physique} onChange={handleSelectPhysique}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics.eyes} onChange={handleSelectEyes}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics.ethnicity} onChange={handleSelectEthnicity}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={characteristics.hair} onChange={handleSelectHair}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics.tattos} onChange={handleSelectTatoo}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={characteristics.smokes} onChange={handleSelectSmokes}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <br /><br />
                    <span>Membro casal 2</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={characteristics2.birthDate}  onChange={(e) => setBirthDate2(e.target.value)}/>
                    <select value={characteristics2.sex} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={characteristics2.sexualOption} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={characteristics2.education} onChange={handleSelectEducation2}>
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
                            <select value={characteristics2.sign} onChange={handleSelectSign2}>
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

                    <input type="text" placeholder="Altura" value={characteristics2.heigth}  onChange={(e) => setHeigth2(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={characteristics2.weight}  onChange={(e) => setWeight2(e.target.value)}/>
                    <select value={characteristics2.physique} onChange={handleSelectPhysique2}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics2.eyes} onChange={handleSelectEyes2}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics2.ethnicity} onChange={handleSelectEthnicity2}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={characteristics2.hair} onChange={handleSelectHair2}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics2.tattos} onChange={handleSelectTatoo2}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={characteristics2.smokes} onChange={handleSelectSmokes2}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                            <br /><br />
                    <span>Membro casal 3</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={characteristics3.birthDate}  onChange={(e) => setBirthDate3(e.target.value)}/>
                    <select value={characteristics3.sex} onChange={handleSelectSex3}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={characteristics3.sexualOption} onChange={handleSelectSexualOption3}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={characteristics3.education} onChange={handleSelectEducation3}>
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
                            <select value={characteristics3.sign} onChange={handleSelectSign3}>
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

                    <input type="text" placeholder="Altura" value={characteristics3.heigth}  onChange={(e) => setHeigth3(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={characteristics3.weight}  onChange={(e) => setWeight3(e.target.value)}/>
                    <select value={characteristics3.physique} onChange={handleSelectPhysique3}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics3.eyes} onChange={handleSelectEyes3}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics3.ethnicity} onChange={handleSelectEthnicity3}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={characteristics3.hair} onChange={handleSelectHair3}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics3.tattos} onChange={handleSelectTatoo3}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={characteristics3.smokes} onChange={handleSelectSmokes3}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
             </div>
             : user.type === "Casal"?
             <div className="data-form">
                  <span>Membro casal 1</span><br />
                  <input type="date" placeholder="Data de Nascimenrto" value={characteristics.birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={characteristics.sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={characteristics.sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={characteristics.education} onChange={handleSelectEducation}>
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
                            <select value={characteristics.sign} onChange={handleSelectSign}>
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

                    <input type="text" placeholder="Altura" value={characteristics.heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={characteristics.weight}  onChange={(e) => setWeight(e.target.value)}/>
                    <select value={characteristics.physique} onChange={handleSelectPhysique}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics.eyes} onChange={handleSelectEyes}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics.ethnicity} onChange={handleSelectEthnicity}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={characteristics.hair} onChange={handleSelectHair}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics.tattos} onChange={handleSelectTatoo}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={characteristics.smokes} onChange={handleSelectSmokes}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                            
                            <br /><br />
                    <span>Membro casal 2</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={characteristics2.birthDate}  onChange={(e) => setBirthDate2(e.target.value)}/>
                    <select value={characteristics2.sex} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={characteristics2.sexualOption} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={characteristics2.education} onChange={handleSelectEducation2}>
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
                            <select value={characteristics2.sign} onChange={handleSelectSign2}>
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

                    <input type="text" placeholder="Altura" value={characteristics2.heigth}  onChange={(e) => setHeigth2(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={characteristics2.weight}  onChange={(e) => setWeight2(e.target.value)}/>
                    <select value={characteristics2.physique} onChange={handleSelectPhysique2}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics2.eyes} onChange={handleSelectEyes2}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics2.ethnicity} onChange={handleSelectEthnicity2}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={characteristics2.hair} onChange={handleSelectHair2}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={characteristics2.tattos} onChange={handleSelectTatoo2}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={characteristics2.smokes} onChange={handleSelectSmokes2}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
             </div>
             :
             <div className="data-form">
                                      <input type="date" placeholder="Data de Nascimenrto" value={birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education} onChange={handleSelectEducation}>
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
                            <select value={sign} onChange={handleSelectSign}>
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

                    <input type="text" placeholder="Altura" value={heigth === "" ? characteristics.heigth : heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight === "" ? characteristics.weight : weight}  onChange={(e) => setWeight(e.target.value)}/>
                    <select value={physique} onChange={handleSelectPhysique}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes} onChange={handleSelectEyes}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity} onChange={handleSelectEthnicity}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair} onChange={handleSelectHair}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos} onChange={handleSelectTatoo}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes} onChange={handleSelectSmokes}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
             </div>
                }
                </div>
                    <div className='confirmation'>
                        <button onClick={handleUpdateCharacteristcs}>{loading === true ? <FiRefreshCcw /> : "Atualizar"}</button>
                        
                    </div>
                        </form>
            </div>
    )
}

export {SettingsCharacteristcs}