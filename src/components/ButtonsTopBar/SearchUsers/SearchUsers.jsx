import './searchUsers.css'
import { IoSearchOutline} from 'react-icons/io5';

function SearchUsers() {

      function handleSearch() {
        window.open("/search", "_self")
      }

      return (
        <>
            <div className="search" onClick={handleSearch}>
                <IoSearchOutline />
               <p>Encontrar pessoas</p>
            </div>
        </>
    )
}

export {SearchUsers}