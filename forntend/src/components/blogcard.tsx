interface BlogcardProps {
  authorName: string;
  publishDate: string;
  title: string;
  content: string;
}

export const BlogCard = ({
  authorName,
  publishDate,
  title,
  content,
}: BlogcardProps) => {
  return (
    <div className="flex flex-col px-10 mb-10">
      <div className="font-extralight flex">
      <Avatar name={authorName}/>
        <div className="ml-2">{authorName}</div>
        <Circle />
        <div className="text-slate-600">{publishDate}</div>
      </div>
      <div className="mt-2">
        <div className="font-bold text-2xl">{title}</div>
        <div className="font-light mt-1">{content.slice(0, 100) + "..."}</div>
      </div>
      <div className="mt-4 text-slate-500">{`${Math.ceil(
        content.length / 300
      )} minutes`}</div>
      <div className="bg-slate-200 w-full h-1"></div>
    </div>
  );
};

function Circle() {
  return(
    <div className="w-1 h-1 mt-3 mx-2  bg-slate-400 rounded-full flex justify-center items-center">

    </div>
  )

}
export function Avatar({ name }: { name: string }) {
  const words = name.split(' ');
  const initials = words.length > 1
    ? `${words[0][0]}${words[1][0]}`
    : `${words[0][0]}`;

  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-sm text-gray-600 dark:text-gray-300">{initials}</span>
    </div>
  );
}
