import './searchUsers.css'
import { IoSearchOutline} from 'react-icons/io5';

function SearchUsers() {
<<<<<<< HEAD
  const Local = localStorage.getItem("forpride");
=======
  const Local = localStorage.getItem("foursome");
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
  const user = JSON.parse(Local);

      function handleSearch() {
        user.status === "suspense" ? window.open(`/activeplain`, "_self")  
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