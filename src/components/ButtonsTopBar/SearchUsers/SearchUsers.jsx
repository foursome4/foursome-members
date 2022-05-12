import './searchUsers.css'
import { IoSearchOutline} from 'react-icons/io5';
import Modal from 'react-modal';

function SearchUsers() {

      function handleSearch() {
        window.open("/search", "_self")
      }





    return (
        <>
            <div className="search" onClick={handleSearch}>
                <IoSearchOutline />
               <p>Pesquisar</p>
            </div>


        </>
    )
}

export {SearchUsers}