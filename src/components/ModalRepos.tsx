import { useEffect, useState } from "react";
import api from "../services/api";
import { GoRepo } from "react-icons/go";
import Loading from "./Loading";

type ModalData = {
  username: string;
  type: string;
}

type Repos = {
  id: number,
  name: string,
  full_name: string,
  html_url: string,
}

export default function ModalRepos( props: ModalData ) {
  const [repos, setRepos] = useState<Repos[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  
  useEffect(() => {
    if(props.username){
      GetRepos();
    }
  }, [props.username]);

  async function GetRepos(){
    setLoadingRepos(true);
    setRepos([]);
    await api.get(`users/${props.username}/repos`)
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

  return(
    <div 
      className="modal fade" 
      id="modalRepo" 
      tabIndex={-1} 
      aria-labelledby="modalLabel" 
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 
              className="modal-title" 
              id="modalLabel"
            >
              <GoRepo/> {props.username}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close" 
            />
          </div>
          <div className="modal-body">
            {loadingRepos 
              ? <Loading/>
              : repos.length 
                  ? (
                      <ul className="list-group list-group-flush">
                        {repos.map(data =>{
                          return(
                            <li key={data.id} className="list-group-item text-truncate">
                              <GoRepo/>
                              <a 
                                href={data.html_url} 
                                className="card-link m-2"
                                target="_blank"
                              >
                                {data.name}
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
  );
}