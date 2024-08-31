import { ChangeEvent, ChangeEventHandler } from "react";
import { Link } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center">
          <div className="text-4xl font-bold text-center">
            Create an Account
          </div>
          <div className="flex">
            <div>Already have an account 🤨?</div>
            <Link className="underline pl-2" to={"/sign"}>
              Login
            </Link>
          </div>
        </div>
        <div>
          <LabelInputs />
          <LabelInputs />
          <LabelInputs />
        </div>
      </div>
    </div>
  );
};

interface LabelInterface {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelInputs({ label, placeholder, onChange }: LabelInterface) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
