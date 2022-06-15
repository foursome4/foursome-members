import "./voucher.css"
import { BarBottomMenu } from "../../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../../components/TopBar/TopBar";
import {FiUpload} from "react-icons/fi";
import { useContext, useState } from "react";
import {toast} from 'react-toastify';
import profile from '../../../assets/images/image.png';
import {IoCheckmarkCircleOutline, IoBanOutline} from "react-icons/io5"
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { v4 as uuidv4} from 'uuid';
import { storage } from '../../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { AuthContext } from "../../../contexts/Auth";

function Voucher() {
    const {id} = useParams();
    const{createPayment} = useContext(AuthContext)

    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);

    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState(''); 

    const {data} = useFetch(`/plains/unic/${id}`);

    function handleFile(e) {
        console.log(e.target.files[0])
        
        if(e.target.files[0]){
            const image = e.target.files[0];
            
            if(image.type === 'image/jpeg' ||
            image.type === 'image/jpg' ||
            image.type === 'image/png'
            ) {
                setImageAvatar(image);
               setAvatarUrl(URL.createObjectURL(e.target.files[0]));
               console.log(avatarUrl);
               toast.success('Imagem carregada com sucesso. Publique sua postagem!');
            } else {
                console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                setImageAvatar("");
                return null;
            }
        }
    }


    async function handleUploadVoucher(e) {
        e.preventDefault();
        toast.info("Salvando a foto. Aguarde...")
        const uuid = uuidv4();
        let newAvatarUrlFirebase = ref(storage, `images/comprovant/${uuid}`);
        
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
        
        console.log(uploadAvatar.ref.name, photoUrlAvatar);

        UploadVoucher(photoUrlAvatar)
    }

    function UploadVoucher(voucherImage) {
        const linkComprovant = voucherImage;
        const idPlain = data?.[0].id;
        const namePlain = data?.[0].name;
        const idAccount = user.id;
        const username = user.username;
        const value = data?.[0].value;
        const period = data?.[0].period;

        console.log({linkComprovant, idPlain, namePlain, idAccount,username, value, period})
        createPayment(linkComprovant, idPlain, namePlain, idAccount,username, value, period)
    }


    return (
        <div className="Voucher">
            <TopBar />
            <div className="page-Voucher">
                <div className="red">
                    <h1><IoBanOutline /></h1>
                <h4>Não envie tela de confirmação.</h4>
                <h4>Não envie comprovante resumido.</h4>
                <h4>Não envie linha de extrato.</h4>
                <h4>Não rasure ou corte o comprovante.</h4>
                <h4>O envio de comprovante fora dos padrões poderá causar o bloqueio do seu acesso.</h4>
                </div>

                <div className="green">
                <h1> <IoCheckmarkCircleOutline /> </h1>
                <h4>Ao concluir a transação, clique no botão COMPROVANTE COMPLETO OU COMPARTILHAR COMPROVANTE.</h4>
                <h4>O comprovante deve estar completo.</h4>
                </div>

                <div className="comprovant">
                <h3>Envie o comprovante aqui:</h3>
                <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={80} width={80}/>
                        </label>
                </div>


                        <button onClick={handleUploadVoucher}>Enviar comprovante.</button>
            </div>
        </div>
    )
}

export {Voucher}