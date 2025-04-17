import { Link } from "@nextui-org/react";
import whiteLogo from "../assets/logo/blue_logo.png";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh] px-8 sm:px-8 py-12 bg-zinc-900 text-zinc-100">

      <div className="w-full max-w-md space-y-6  items-center">
        <img
          alt="logo"
          className="w-auto mx-auto h-10"
          src={whiteLogo}
        />
        <h1 className="text-3xl font-bold text-center">Create an Account</h1>

        {/* Email Sign Up */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary500"
          />
          <button
            onClick={() => handleNavigation("/")}
            type="submit"
            className="w-full bg-primary600 hover:bg-primary700 text-white font-medium py-3 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <hr className="flex-grow border-zinc-700" />
          <span className="text-zinc-400 text-sm">or</span>
          <hr className="flex-grow border-zinc-700" />
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-4 w-full">
          <button className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white py-3 px-4 rounded-md">
            <FaGoogle className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white py-3 px-4 rounded-md">
            <FaFacebookF className="w-5 h-5" />
            Continue with Facebook
          </button>
          <button className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white py-3 px-4 rounded-md">
            <FaApple className="w-5 h-5" />
            Continue with Apple
          </button>
        </div>



        {/* Already have account */}
        <p className="text-sm text-zinc-400 text-center">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-primary500 hover:underline">Log In</a>
          </Link>
        </p>

        {/* Terms and conditions */}
        <p className="text-xs text-zinc-500 text-center max-w-sm mx-auto">
          By signing up, you agree to our{" "}
          <Link href="/terms">
            <a className="underline text-xs">Terms</a>
          </Link>{" "}
          and{" "}
          <Link href="/privacy">
            <a className="underline text-xs">Privacy Policy</a>
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
