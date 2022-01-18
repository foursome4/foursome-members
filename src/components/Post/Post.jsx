import avatarImg from '../../assets/images/avatar.png'
import { FiImage, FiVideo, FiUsers, FiList, FiMenu } from 'react-icons/fi'
import './post.css';

function Post() {
    return (
        <div className="post">
            <div className="avatar">
            <img src={avatarImg} alt="" />
            </div>
            <div className="post-type">
                <textarea name="" id="" cols={30} rows={10}></textarea>
                <div className="buttons">
                    <button className='selected'> <FiMenu /> Texto </button>
                    <button> <FiImage /> Foto </button>
                    <button> <FiVideo /> Vídeo </button>
                    <button> <FiUsers /> Grupo </button>
                    <button> <FiList /> Fórum </button>
                </div>
            </div>
        </div>
    )
}

export {Post}