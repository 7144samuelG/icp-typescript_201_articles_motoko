import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articles_backend } from 'declarations/articles_backend';
const Artilces = () => {
  
  const router = useNavigate();

  const[articles,setArticles]=useState([]);
  useEffect(()=>{
    articles_backend.getAllArticles().then((result)=>{
      console.log(result,"results")
      setArticles(result);
    })
  },[]);
  return (
    <div className="">
      <h1 className="text-center"> articles</h1>
      {articles.length == 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="">no article found</h1>
          <button
            className="underline"
            onClick={() => router("/create-articles")}
          >
            create an article
          </button>
        </div>
      ) : (
        <div className="mx-3 grid grid-cols-3 gap-3">
          {articles.map((val, index) => (
            <div className=" " key={index}>
              <div className="border p-3 rounded-md cursor-pointer " onClick={()=>router(`/details/${val.id}`)}>
                <h1 className="text-xl py-3 font-semibold">{val?.articleTitle}</h1>
                <img
                  src={val?.articleAvatar}
                  alt="DFINITY logo"
                  className="w-full h-[200px]"
                />
                <p className="text-sm">{val?.articledescription}</p>
                <div className="">
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artilces;
