import { BrowserRouter, Navigate, } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home.tsx";
import Music from "./routes/Music.tsx";
import Podcast from "./routes/Podcast.tsx";
import Live from "./routes/Live.tsx";
import Genres from "./routes/Genres.tsx";
import Albums from "./routes/Albums.tsx";
import Artists from "./routes/Artists.tsx";
import Favourites from "./routes/Favourites.tsx";
import "./index.css";
import Root from "./routes/root.tsx";
import Register from "./routes/Register.tsx";
import Login from "./routes/Login.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes location={location} >
          <Route element={<Root />} path="/" >
            <Route element={<Navigate to="/home" />} index />
            <Route element={<Home />} path="/home" />
            <Route element={<Music />} path="/music" />
            <Route element={<Podcast />} path="/podcasts" />
            <Route element={<Live />} path="/live" />
            <Route element={<Genres />} path="genres" />
            <Route element={<Albums />} path="/albums" />
            <Route element={<Artists />} path="/artists" />
            <Route element={<Favourites />} path="/favourites" />
          </Route>
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          {/* <Route element={<Error404 />} path="*" /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
