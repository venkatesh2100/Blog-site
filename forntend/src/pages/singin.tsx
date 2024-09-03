import { Auth } from "../components/auth";
import { Greeter } from "../components/Greeter";

export const SignIn = () => {
  return (
    <div className="h-screen grid md:grid-cols-2">
      <Auth type="signin"/>
      <div className="invisible md:visible">
        <Greeter />
      </div>
    </div>
  );
};
