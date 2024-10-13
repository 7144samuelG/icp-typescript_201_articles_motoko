import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./componets/navbar";
import Artilces from "./componets/articles";
import CreateArticle from "./componets/create-article";
import MyArticles from "./componets/my-articles";
import ArtilceDetails from "./componets/article-details";
import { AuthProvider } from "./componets/use-auth";

//import { articles_backend } from 'declarations/articles_backend';

function App() {
  // const [greeting, setGreeting] = useState('');

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   articles_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  return (
    <BrowserRouter>
      <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Artilces/>}/>
        <Route path="/create-articles" element={<CreateArticle/>}/>
        <Route path="/my-articles" element={<MyArticles/>}/>
        <Route path="/details/:id" element={<ArtilceDetails/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
