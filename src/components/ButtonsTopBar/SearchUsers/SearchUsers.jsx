import './searchUsers.css'
import { useState } from 'react';
import { UsersSearch } from './UsersSearch/UsersSearch';
import { IoSearchOutline, IoCloseOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useFetch } from '../../../hooks/useFetch';

function SearchUsers() {
    const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);

    const [search, setSearch] = useState('')
    const [type, setType] = useState("username")


    const {data} = useFetch(`/informations`);

    let SearchUsers = []
    const searchLower = search.toLowerCase()

    if(data) {
        SearchUsers = data?.filter((informations) => informations.nickname.toLowerCase().includes(searchLower))
    }

    function handleOpenModalSearch() {
        setIsOpenModalSearch(true)
      }
    
      function handleCloseModalSearch() {
        setIsOpenModalSearch(false)
      }
      function handleSearch() {
        handleOpenModalSearch()
      }


      function handleSelectTypeSearch(e) {
        setType(e.target.value)
    }


    Modal.setAppElement('#root');
    return (
        <>
            <div className="search" onClick={handleSearch}>
                <IoSearchOutline />
               <p>Pesquisar</p>
            </div>

           {/* Modal Search  */}
            <Modal isOpen={isOpenModalSearch} onRequestClose={handleCloseModalSearch}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalSearch}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <h3>Busca de usuários</h3>
        
            <div className="search">
            <input type="text" placeholder='Buscar usuário' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            
            <div className="itensModalSearch">
          
            {SearchUsers.map((information) => {
                return(
                    <div className="accounts" key={information.nickname}>
                      <UsersSearch id={information.idAccount} nickname={information.nickname} avatar={information.avatar}/>
                    </div>
                )
            })}
            
            </div>
            <div className="buttons-modal">
            <button className="butont-White" onClick={handleCloseModalSearch}>Cancelar</button>
            </div>
            </div>
            </Modal>
            {/* FIM Modal Search  */}

        </>
    )
}

export {SearchUsers}