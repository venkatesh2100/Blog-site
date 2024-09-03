import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupInput } from "@venkatesh2100/medium-common";
import { BACKEND_URL } from "../config";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [postInputs, setpostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const respone = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = respone.data;
      localStorage.setItem("token", jwt);
      navigate("/blog");
    } catch (e) {
      alert("Error while signup"); 
      console.log(e);
    }
  }
  return (
    // {JSON.stringify(postInputs)}
    <div className="flex justify-center h-screen items-center ">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center">
          <div className="text-4xl font-bold text-center">
            {type === "signup" ? "Create an Account" : "Welcome Back Buddy"}
          </div>
          <div className="flex text-gray-400 items-center justify-center">
            <div>
              {type === "signup"
                ? "Already have an account 🤨?"
                : "Don't you have an Account? "}
            </div>
            <Link
              className="underline pl-2"
              to={type === "signup" ? "/signin" : "/signup"}
            >
              {type === "signup" ? "Login" : "Signup"}
            </Link>
          </div>
        </div>
        <div className="pt-5">
          <div>
            {type === "signup" && (
              <LabelInputs
                title="Username"
                placeholder="Enter your Username"
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            )}
          </div>

          <LabelInputs
            title="Email"
            placeholder="vs@gmail.com"
            type="username  "
            onChange={(e) => {
              setpostInputs({
                ...postInputs,
                username: e.target.value,
              });
            }}
          />
          <LabelInputs
            title="Password"
            placeholder=""
            type="password"
            onChange={(e) => {
              setpostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
          <button
            onClick={sendRequest}
            className="bg-gray-50 border border-gray-300 mt-4 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600  dark:text-white dark:focus:ring-black dark:focus:border-black"
          >
            {type === "signup" ? "Signup" : "Signin"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelInterface {
  title: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelInputs({ title, placeholder,  onChange }: LabelInterface) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-md font-semibold text-gray-900 "
      >
        {title}
      </label>
      <input
        onChange={onChange}
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
