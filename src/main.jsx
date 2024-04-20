import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NavBar from './routes/navBar';
import CreatePost from './routes/createPost';
import PostDetails from './routes/postDetails';
import EditPost from './routes/editPost';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index={true} path='/' element={<App />} />
        <Route index={true} path='/createPost' element={<CreatePost />} />
        <Route index={true} path='/postDetails/:id' element={<PostDetails />} />
        <Route index={true} path='/editPost/:id' element={<EditPost />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)