import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "./Loading";
import { GoStar } from "react-icons/go";

type ModalData = {
  username: string;
  type: string;
}

type Starred = {
  id: number,
  name: string,
  full_name: string,
  html_url: string,
}

export default function ModalStarred( props: ModalData ) {
  const [starred, setStarred] = useState<Starred[]>([]);
  const [loadingStarred, setLoadingStarred] = useState(false);

  useEffect(() => {
    if(props.username){
      GetStarreds();
    }
  }, [props.username]);

  async function GetStarreds(){
    setLoadingStarred(true);
    await api.get(`users/${props.username}/starred`)
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
    <div 
      className="modal fade" 
      id="modalStarred" 
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
              <GoStar/> {props.username}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close" 
            />
          </div>
          <div className="modal-body">
            {loadingStarred 
              ? <Loading/>
              : starred.length 
                  ? (
                      <ul className="list-group list-group-flush">
                        {starred.map(data =>{
                          return(
                            <li key={data.id} className="list-group-item text-truncate">
                              <GoStar/>
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
                            Usuário não favoritou nenhum repositório.
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