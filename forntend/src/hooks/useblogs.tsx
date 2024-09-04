import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog{
  title:string;
  content:string;
  id:string;
  author:{
    name:string;
  }
}
export const useBlogs = () => {
  const [loading, setloading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}api/v1/blog/bulk`,{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    }).then((response) => {

      setBlogs(response.data);
      setloading(false);
    });
  }, []);
  return {
    loading,
    blogs,
  };
};
