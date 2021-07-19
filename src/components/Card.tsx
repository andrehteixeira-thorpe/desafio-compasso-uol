import { Link } from 'react-router-dom';
import { GoRepo, GoStar } from "react-icons/go";

type CharacterData = {
  username: string;
  thumbnail: string;
  setUsername: any;
  setType: any;
}

export default function Card(props: CharacterData){

  return(
    <div className="col" data-testid="card">
      <div className="card shadow-sm"> 
        <img src={props.thumbnail} className="card-img-top" alt={props.username} />
        <div className="card-body">
          <h5>{props.username}</h5>
          <div className="d-grid gap-2 mb-2">
            <button 
              type="button" 
              className="btn btn-outline-primary" 
              data-bs-toggle="modal" 
              data-bs-target="#modalRepo"
              onClick={() => {
                props.setUsername(props.username);
                props.setType('repos');
              }}
            >
              <GoRepo/> Repos
            </button>
          </div>

          <div className="d-grid gap-2 mb-2">
            <button 
              type="button" 
              className="btn btn-outline-primary" 
              data-bs-toggle="modal" 
              data-bs-target="#modalStarred"
              onClick={() => {
                props.setUsername(props.username);
                props.setType('starred');
              }}
            >
              <GoStar/> Starred
            </button>
          </div>
          

          <div className="d-grid gap-2">
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/${props.username}`
              }}
            >
              Ver detalhes
            </Link>
          </div>
          <div className="d-grid gap-2">
          </div>
        </div>
      </div>
    </div>
  );
}