import { Avatar } from "./blogcard";

export const Appbar = () => {
  return (
    <div className="flex border justify-between  border-b-2 border-slate-200 w-full px-10 py-5">
      <div className="flex justify-between 2w">
        <div className="text-xl font-semibold ">Medium</div>
        <div className=" ml-4">title</div>
        <div className="ml-4">Saved</div>
      </div>
      <div className="flex">
        <div className="font-medium">Status</div>
        <div className="ml-4 mr-4">...</div>
        <div className="mr-4">Notification</div>
        {/*//?TODO Implement the ClSX for avatar for independtly change the Properties of Avatar Component*/}
        <Avatar name={"venky"} />
      </div>
    </div>
  );
};
