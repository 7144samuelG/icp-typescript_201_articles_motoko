import { LucideKey, MessageCircle, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articles_backend } from "declarations/articles_backend";
import { useAuth } from "./use-auth";
const ArtilceDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState();
  const { isAuthenticated, login, principal, logout } = useAuth();

  const handleComment = (e) => {
    e.preventDefault();

    articles_backend
      .addCommentToArticle(id, comment, "anonymous")
      .then((result) => {
        console.log(result, "comments");
      });

      articles_backend.getArticle(id).then((result) => {
        console.log(result, "article");
        setData(result.ok);
      });
  };
  const handlelikes = () => {
    articles_backend.likeAnArticle(id).then((result) => {
      console.log(result, "like");
    });
     articles_backend.getArticle(id).then((result) => {
        console.log(result, "article");
        setData(result.ok);
      });
  };
  useEffect(() => {
    articles_backend.getArticle(id).then((result) => {
      console.log(result, "article");
      setData(result.ok);
    });
  }, [setComment]);
  console.log(data, "data");

  return (
    <div>
      <div className="flex space-x-2 mx-2">
        <div className="w-[60%]">
          {data ? (
            <div className="">
              {data.map((val, index) => (
                <div className="" key={index}>
                  <img
                    src={val?.articleAvatar}
                    alt="DFINITY logo"
                    className="w-full h-[300px] border"
                  />
                  <div className="">
                    <h1 className="text-2xl my-2">{val?.articleTitle}</h1>
                    <div className="flex justify-between">
                      <h1 className="text-sm font-semibold">
                        by:kndcbhdbhdvghdvgvdgvhv
                      </h1>
                      <div className="flex items-center space-x-2">
                        <h1 className="text-sm font-semibold flex items-center">
                          <ThumbsUp
                            onClick={handlelikes}
                            className="cursor-pointer"
                          />
                          <span>{val?.likes.length}</span>
                        </h1>
                        <h1 className="text-sm font-semibold flex items-center">
                          <MessageCircle />
                          <span>{val?.comments.length}</span>
                        </h1>
                      </div>
                    </div>
                    <p className="text-sm my-3">{val?.articledescription}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=""></div>
          )}

          <div className="">
            <h2 className="text-xl font-medium">Add comment</h2>
            <form action="" className="mt-4" onSubmit={handleComment}>
              <div className="flex flex-col">
                <label htmlFor=""></label>
                <textarea
                  name=""
                  rows={5}
                  cols={10}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border rounded-md"
                  id=""
                ></textarea>
              </div>
              <button
                className="bg-blue-400 rounded-md my-4 text-sm p-3 "
                onClick={handleComment}
              >
                submit
              </button>
            </form>
          </div>
        </div>
        <div className="pl-4">
          <h1 className="font-bold text-xl ">comments</h1>
          {data ? (
            <div className="">
              {data?.map((val, index) => (
                <div className="">
                  {val.comments.map((com, index) => (
                    <div className="" key={index}>
                      <div className="">
                        <p className="text-sm">{com.commentmessage}</p>
                      </div>
                      <div className="border-b w-[90%] my-1 pt-3" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="">
              <p className="text-sm">no comment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtilceDetails;
