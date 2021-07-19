import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from '../../services/api'
import Navbar from "../../components/Navbar";
import { FiMapPin, FiArrowLeft, FiTwitter, FiMail } from "react-icons/fi";
import { GoRepo, GoStar } from "react-icons/go";
import Loading from "../../components/Loading";


interface User { 
  followers: number;
  following: number;
  location: string;
  twitter_username: string;
  bio: string;
  email: string;
  avatar_url: string;
  login: string;
  id: number;
  html_url: string;
  name: string;
}

interface Repos {
  id: number,
  name: string,
  full_name: string,
  html_url: string,
}

interface Starred {
  id: number,
  name: string,
  full_name: string,
  html_url: string,
}

export default function Home(){
  const { name } :any = useParams()
  const history = useHistory()
  const [user, setUser] = useState({} as User);
  const [repos, setRepos] = useState<Repos[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [starred, setStarred] = useState<Starred[]>([]);
  const [loadingStarred, setLoadingStarred] = useState(false);

  useEffect(() => {
    GetDetails();
    GetRepos();
    GetStarreds();
  }, [name]);

  async function GetDetails(){
    await api.get(`users/${name}`)
    .then(response => {
      console.log(response.data);
      setUser(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  }

  async function GetRepos(){
    setLoadingRepos(true);
    await api.get(`users/${name}/repos`)
    .then(response => {
      console.log(response.data);
      setRepos(response.data);
      setLoadingRepos(false);
    })
    .catch(error => {
      console.log(error);
      setLoadingRepos(false);
    })
  }

  async function GetStarreds(){
    setLoadingStarred(true);
    await api.get(`users/${name}/starred`)
    .then(response => {
      console.log(response.data);
      setStarred(response.data);
      setLoadingStarred(false);
    })
    .catch(error => {
      console.log(error);
      setLoadingStarred(false);
    })
  }


  return(
    <>
    <Navbar />
    <div className="container">
      
      <button 
        className="btn btn-success mt-3 mb-4" 
        type="submit"
        onClick={() => history.push('/')}
      >
        <FiArrowLeft /> Voltar
      </button>
      <div className="row ">
        <div className="col">

          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img 
                  src={user.avatar_url} 
                  className="img-fluid rounded" 
                  alt={user.login} 
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title mb-0">{user.name}</h5>
                  <p>
                    <a 
                      href={user.html_url} 
                      className="card-link"
                      target="_blank"
                    >
                      {user.login}
                    </a>
                  </p>

                  {user.followers 
                    ? <p className="card-text">Seguidores: <strong>{user.followers}</strong></p> 
                    : null
                  }
                  {user.following 
                    ? <p className="card-text">Seguindo: <strong>{user.following}</strong></p> 
                    : null
                  }
                  {user.email 
                    ? <p className="card-text"><FiMail/> {user.email}</p> 
                    : null
                  }
                  {user.location 
                    ? <p className="card-text"><FiMapPin/> {user.location}</p> 
                    : null
                  }
                  {user.twitter_username 
                    ? <p className="card-text"><FiTwitter/> @{user.twitter_username}</p> 
                    : null
                  }
                  {user.bio 
                    ? <p className="card-text">{user?.bio}</p> 
                    : null
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Favoritos</h5>
              <p className="card-text">Lista de repositórios favoritados por <strong>{user.name ? user.name : user.login}</strong>.</p>
            </div>
            {loadingStarred 
              ? <Loading/>
              : starred.length 
                ? (
                    <ul className="list-group list-group-flush">
                      {starred.map(repo => {
                        return(
                          <li key={repo.id} className="list-group-item">
                            <GoStar/>
                            <a 
                              href={repo.html_url} 
                              className="card-link m-2"
                              target="_blank"
                            >
                              {repo.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )
                : (
                    <div className="card-body">
                      <p className="card-text">
                        <small className="text-muted">
                          Usuário não favoritou nenhum repositório.
                        </small>
                      </p>
                    </div>
                  )
            } 
          </div>

        </div>
        <div className="
          col-0 
          col-xs-4 
          col-md-4
          col-lg-4
          col-xl-4
          col-xxl-4
        ">

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Repositórios</h5>
              <p className="card-text">Lista de repositórios públicos de <strong>{user.name ? user.name : user.login}</strong>.</p>
            </div>
            {loadingRepos 
              ? <Loading/>
              : repos.length 
                ? (
                    <ul className="list-group list-group-flush">
                      {repos.map(repo => {
                        return(
                          <li key={repo.id} className="list-group-item">
                            <GoRepo/>
                            <a 
                              href={repo.html_url} 
                              className="card-link m-2"
                              target="_blank"
                            >
                              {repo.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )
                : (
                    <div className="card-body">
                      <p className="card-text">
                        <small className="text-muted">
                          Usuário sem repositórios públicos.
                        </small>
                      </p>
                    </div>
                  )
            } 
          </div>

        </div>
      </div>
    </div>
    </>
  );
}