import './searchUsers.css'
import { IoSearchOutline} from 'react-icons/io5';

function SearchUsers() {
  const Local = localStorage.getItem("foursome");
  const user = JSON.parse(Local);

      function handleSearch() {
        user.status === "Aproved" || user.status  === "active" ? window.open(`/activeplain" `, "_self") : user.status === "suspense" ? window.open(`/suspenseaccount`, "_self")  
        : window.open("/search", "_self")
        
      }
      return (
        <>
            <div className="search" onClick={handleSearch}>
                <IoSearchOutline />
               <p>Buscar</p>
            </div>
            {/* <div className="search2" onClick={handleSearch}>
                <IoSearchOutline />
               <p>Buscar pessoas</p>
            </div> */}
        </>
    )
}

export {SearchUsers}