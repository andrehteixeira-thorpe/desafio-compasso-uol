import { Link } from "react-router-dom";

export default function Navbar(){
  return(
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand mx-auto"
        >
          <img src="./logo.png" alt="Logo" />
        </Link>   
      </div>
    </nav>
  );
}