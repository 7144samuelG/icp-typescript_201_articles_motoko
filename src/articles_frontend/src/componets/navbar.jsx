import { Link } from "react-router-dom";
import AuthLoginOut from "./login";
import { articles_backend } from 'declarations/articles_backend';
const NavBar = () => {
  articles_backend.registerDeveloper().then((result)=>{
    console.log(result);
  })
  return (
    <div className="max-w-[1300px] mx-auto mt-[30px]">
      <div className="flex justify-between px-2 items-center">
        <img
          src="../logo2.svg"
          alt="DFINITY logo"
          className="w-[100px] h-[100px]"
        />
        <div className="flex items-center space-x-10">
          <Link to="/">View Articles</Link>
          <Link to="/my-articles">My Articles</Link>
          <AuthLoginOut />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
