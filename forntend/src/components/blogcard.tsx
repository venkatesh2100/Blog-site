interface BlogcardProps{
  authorName: string;
  publishDate: string;
  title: string;
  content: string;
}

export const BlogCard = ({ authorName, publishDate, title, content }) => {
  return (
    <div className="flex flex-col ">
      <div className="font-medium flex">
        <div>{authorName}</div>
        <div className="text-slate-600">. {publishDate}</div>
      </div>
      <div className="mt-2">
        <div className="font-bold text-2xl">{title}</div>
        <div className="font-normal mt-1">{content.slice(0,100)+"..."}</div>
      </div>
      <div className="mt-4 text-slate-500">{`${Math.ceil(content.length/300)} minutes`}</div>
    <div className="bg-slate-200 w-full h-1"></div>
    </div>
  );
};
