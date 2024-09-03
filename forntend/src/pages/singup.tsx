import { Auth } from "../components/auth";
import { Greeter } from "../components/Greeter";

export const Signup = () => {
  return (
    <div className="h-screen grid md:grid-cols-2">
      <Auth  type="signup"/>
      <div className="hidden md:block">
        <Greeter />
      </div>
    </div>
  );
};
