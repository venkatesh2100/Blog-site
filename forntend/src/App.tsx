

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Blog } from "./pages/blog";
import { SignIn } from "./pages/singin";
import { Signup } from "./pages/singup";
import { Blogs } from "./pages/blogs";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/blogs" element={<Blogs/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
