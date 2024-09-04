import { Appbar } from "../components/appbar";
import { BlogCard } from "../components/blogcard";
import { useBlogs } from "../hooks/useblogs";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>Loading</div>;
  }
  if (!Array.isArray(blogs)) {
    return <div>No blogs available</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center mt-10">
        <div className="max-w-xl">
          <div>
            {blogs.map((blog) => (
              <BlogCard
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishDate={"Aug 4 2024"}
              />
            ))};
          </div>
        </div>
      </div>
    </div>
  );
};
