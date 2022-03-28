import './searchUsers.css'
import { useEffect, useState } from 'react';
import { UsersSearch } from './UsersSearch/UsersSearch';
import { IoSearchOutline, IoCloseOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import api from '../../../services/api';

function SearchUsers() {
    const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);

    const [accounts, setAccoounts] = useState([]) 
    const [search, setSearch] = useState('')
    const [searchId, setSearchId] = useState('')
    const [type, setType] = useState("username")


    useEffect(() => {
        async function loadAccounts() {
            await api.get("/accounts").then((result) => {
                setAccoounts(result.data)
            })
        }

        loadAccounts() 
    }, [])


    const SearchUsers = accounts.filter((account) => account.username.startsWith(search))
    const SearchUsersId = accounts.filter((account) => account.id.startsWith(searchId))


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
           <select  value={type} onChange={handleSelectTypeSearch}>
                <option value="username">Usuário</option>
                <option value="id">id</option>
            </select>
            {type === "username" ?
            <input type="text" placeholder='buscar usuário' value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value)}/>
            :
            <input type="text" placeholder='buscar pelo Id' value={searchId.toLowerCase()} onChange={(e) => setSearchId(e.target.value)}/>
            }
            </div>
            
            <div className="itensModal">
            {type === "username" ?
            SearchUsers.map((account) => {
                return(
                    
                    <div className="accounts" key={account.id}>
                      <UsersSearch id={account.id} username={account.username} />
                    </div>
                )
            })
                :
                SearchUsersId.map((account) => {
                    return(
                        
                        <div className="accounts" key={account.id}>
                           <UsersSearch id={account.id} username={account.username} />
                        </div>
                    )
            
                })
            }
            
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