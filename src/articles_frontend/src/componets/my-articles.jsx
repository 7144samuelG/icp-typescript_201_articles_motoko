import { useNavigate } from "react-router-dom";
import { articles_backend } from "declarations/articles_backend";
import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";
const MyArticles = () => {
  const router = useNavigate();
  const [data, setData] = useState([]);
  const { isAuthenticated, login, principal, logout } = useAuth();
  useEffect(() => {
    articles_backend.getdeveloperPrincipal().then((result) => {
      console.log(result, "my");
      setData(result.ok.articles);
    });
  }, []);

  const handledelete = (id) => {
    articles_backend.deleteArticle(id).then((result) => {
      console.log(result, "delete");
    });
  };
  return (
    <div className="">
      {isAuthenticated ? (
        <div className="">
          <div className="">
            {data.length == 0 ? (
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
                {data.map((val, index) => (
                  <div className=" " key={index}>
                    <div className="border p-3 rounded-md cursor-pointer">
                      <h1 className="text-xl py-3 font-semibold">
                        {val?.articleTitle}
                      </h1>
                      <img
                        src={val?.articleAvatar}
                        alt="DFINITY logo"
                        className="w-full h-[200px]"
                      />
                      <p className="text-sm">{val?.articledescription}</p>
                      <div className="">
                        <button
                          className="border rounded-md bg-red-500 text-white p-2 my-4"
                          onClick={() => router(`/details/${val.id}`)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="">
          <h1 className="text-center font-bold text-sm">must be logged in</h1>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
