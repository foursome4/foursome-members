import { useContext, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import logoImg from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/Auth';
import './characteristcsForm.css'

function CharacteristcsForm() {
    const {loading, updateCharacteristcs, updateCharacteristcs2, updateCharacteristcs3} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local)

    const [data,setData] = useState("");
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

    const [data2,setData2] = useState("");
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

    const [data3,setData3] = useState("");
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


    function handleUpdateCharacteristcs(e){
        e.preventDefault()
        
        if( data3 && sex3 && sign3 && sexualOption3 && education3 && heigth3 && weight3 && physique3 && ethnicity3 && eyes3 && hair3 && tattos3 && smokes3 !== "") {
            updateCharacteristcs3({
                idAccount: user.id,
                data3,
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
                smokes3})
        } else if ( data2 && sex2 && sign2 && sexualOption2 && education2 && heigth2 && weight2 && physique2 && ethnicity2 && eyes2 && hair2 && tattos2 && smokes2  !== "") {
            
            updateCharacteristcs2({
                idAccount: user.id,
                data2,
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
            })
        } else {
            updateCharacteristcs({
                idAccount: user.id,
                data,
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
            <div className="characteristcsForm">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Caracteristicas</h2>
                    </div>
                        <form action="">
                            <div className="data">
                            <br /><br />
                   {user === "trisal" ?
                    <div className="data-form">   
                    <span>Membro casal 1</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
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

                    <input type="text" placeholder="Altura" value={heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight}  onChange={(e) => setWeight(e.target.value)}/>
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
                    <br /><br />
                    <span>Membro casal 2</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={data2}  onChange={(e) => setData2(e.target.value)}/>
                    <select value={sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education2} onChange={handleSelectEducation2}>
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
                            <select value={sign2} onChange={handleSelectSign2}>
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

                    <input type="text" placeholder="Altura" value={heigth2}  onChange={(e) => setHeigth2(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight2}  onChange={(e) => setWeight2(e.target.value)}/>
                    <select value={physique2} onChange={handleSelectPhysique2}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes2} onChange={handleSelectEyes2}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity2} onChange={handleSelectEthnicity2}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair2} onChange={handleSelectHair2}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos2} onChange={handleSelectTatoo2}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes2} onChange={handleSelectSmokes2}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                            <br /><br />
                    <span>Membro casal 3</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={data3}  onChange={(e) => setData3(e.target.value)}/>
                    <select value={sex3} onChange={handleSelectSex3}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption3} onChange={handleSelectSexualOption3}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education3} onChange={handleSelectEducation3}>
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
                            <select value={sign3} onChange={handleSelectSign3}>
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

                    <input type="text" placeholder="Altura" value={heigth3}  onChange={(e) => setHeigth3(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight3}  onChange={(e) => setWeight3(e.target.value)}/>
                    <select value={physique3} onChange={handleSelectPhysique3}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes3} onChange={handleSelectEyes3}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity3} onChange={handleSelectEthnicity3}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair3} onChange={handleSelectHair3}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos3} onChange={handleSelectTatoo3}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes3} onChange={handleSelectSmokes3}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
             </div>
             : user === "casal"?
             <div className="data-form">
                  <span>Membro casal 1</span><br />
                  <input type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
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

                    <input type="text" placeholder="Altura" value={heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight}  onChange={(e) => setWeight(e.target.value)}/>
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
                            
                            <br /><br />
                    <span>Membro casal 2</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={data2}  onChange={(e) => setData2(e.target.value)}/>
                    <select value={sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={education2} onChange={handleSelectEducation2}>
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
                            <select value={sign2} onChange={handleSelectSign2}>
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

                    <input type="text" placeholder="Altura" value={heigth2}  onChange={(e) => setHeigth2(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight2}  onChange={(e) => setWeight2(e.target.value)}/>
                    <select value={physique2} onChange={handleSelectPhysique2}>
                                <option value="">Físico</option>
                                <option value="Atletico">Atletico </option>
                                <option value="Magro">Magro </option>
                                <option value="Esbelto">Esbelto </option>
                                <option value="Gordo">Gordo </option>
                                <option value="Maromba">Maromba </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={eyes2} onChange={handleSelectEyes2}>
                                <option value="">Olhos</option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Verdes">Verdes </option>
                                <option value="Azuis">Azuis </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={ethnicity2} onChange={handleSelectEthnicity2}>
                                <option value="">Etnia</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Pardos">Pardos </option>
                                <option value="Pretos">Pretos </option>
                                <option value="Amarelos">Amarelos </option>
                                <option value="Indígenas">Indígenas </option>
                                <option value="Outros">Outros </option>
                            </select>
                            <select value={hair2} onChange={handleSelectHair2}>
                                <option value="">Cabelos</option>
                                <option value="Brancos">Brancos </option>
                                <option value="Preto">Preto </option>
                                <option value="Castanho">Castanho </option>
                                <option value="Loiro">Loiro </option>
                                <option value="Ruivo">Ruivo </option>
                                <option value="Outros">Outros </option>
                            </select>
                    <select value={tattos2} onChange={handleSelectTatoo2}>
                                <option value="">Tatuagens?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
                    <select value={smokes2} onChange={handleSelectSmokes2}>
                                <option value="">Fumante?</option>
                                <option value="Sim">Sim </option>
                                <option value="Não">Não </option>
                            </select>
             </div>
             :
             <div className="data-form">
                                      <input type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
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

                    <input type="text" placeholder="Altura" value={heigth}  onChange={(e) => setHeigth(e.target.value)}/>
                    <input type="text" placeholder="Peso" value={weight}  onChange={(e) => setWeight(e.target.value)}/>
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
                        <div className="confirmation_characteristcsForm">
                        <input type="checkbox"/>
                        <span>Minhas informações estão corretas!</span>
                        </div>
                        <button onClick={handleUpdateCharacteristcs}>{loading === true ? <FiRefreshCcw /> : "Salvar e avançar"}</button>
                        
                    </div>
                        </form>
            </div>
    )
}

export {CharacteristcsForm}