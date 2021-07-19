import { useState, FormEvent } from "react";
import api from '../../services/api'
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import ModalStarred from "../../components/ModalStarred";
import ModalRepos from "../../components/ModalRepos";

interface User {
  id: number
  login: string;
  avatar_url: string;
}

export default function Home(){
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [text, setText] = useState('Busque por um usuário do GitHub');
  const [inputSearch, setInputSearch] = useState('');
  const [username, setUsername] = useState('');
  const [type, setType] = useState('');

  async function getUsers(event: FormEvent){
    event.preventDefault();
    if(inputSearch){
      setUsers([]);
      setLoading(true);
      await api.get(`search/users?q=${inputSearch}`)
      .then(response => {
        console.log(response.data.items);
        setUsers(response.data.items);
        if(!response.data.items){
          setText('Nenhum usuário encontrado.')
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setText('Houve um erro ao fazer a busca. Tente novamente.')
      })
    } else {
      setUsers([]);
    }
  }

  return(
    <>
      <Navbar />
      <div className="container">
        
        <div className="container busca">
          <form 
            className="
              d-flex 
              flex-grow-1 
              flex-sm-grow-0 
              flex-md-grow-0 
              flex-lg-grow-0 
              flex-xl-grow-0 
              flex-xxl-grow-0
            "
          >
            <input 
              data-testid="inputSearch"
              className="form-control me-2" 
              type="search" 
              placeholder="Busque por usuários" 
              aria-label="Buscar"
              value={inputSearch} 
              onChange={event => {setInputSearch(event.target.value)}}
            />
            <button 
              data-testid="buttonInputSearch"
              className="btn btn-success" 
              type="submit"
              onClick={getUsers}
            >
              Buscar
            </button>
          </form>
        </div>
        
        {loading 
          ? <Loading/>
          : users.length
            ? (
                <div 
                  className="
                    row 
                    row-cols-1 
                    row-cols-sm-2 
                    row-cols-md-3 
                    row-cols-lg-4 
                    row-cols-xl-5 
                    g-4 
                    pb-5 
                    pt-4"
                >
                  {users.map(user => {
                    return(
                      <Card
                        key={user.id}
                        username={user.login}
                        thumbnail={user.avatar_url}
                        setUsername={setUsername}
                        setType={setType}
                      />
                    );
                  })}
                </div>
              )
            : <Message text={text} />
        }

        <ModalStarred 
          username={username} 
          type={type}
        />

        <ModalRepos 
          username={username} 
          type={type}  
        />  
      
      </div>
    </>
  );
}