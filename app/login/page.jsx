"use client";
import Loder from "@/components/Loder";
import { useAuth } from "@/firebase/auth";
import { auth } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Port_Lligat_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { authUser, isLoading } = useAuth();
  useEffect(() => {
    if (authUser && !isLoading) {
      router.push("/");
    }
  }, [authUser, isLoading]);
  const signinHandler = async () => {
    if (email === "" || password === "") return;
    console.log(email, password);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const SingInWithGoogle = async () => {
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  };
  return isLoading || (!isLoading && authUser) ? (
    <Loder/>

  ) : (
    <div className=" flex w-[100vw] h-[100vh]">
      <div className=" bg-slate-200 flex-1 h-full w-full p-5">
        <div className=" flex w-full h-full  justify-center items-center">
          <div className=" flex justify-start flex-col ">
            <h1 className=" text-black font-extrabold text-4xl">Login</h1>
            <div>
              <span className=" text-gray-600">Dont have an account?</span>
              <Link
                href="/register"
                className="text-black underline-offset-2 underline"
              >
                SignUp
              </Link>
            </div>
            <button
              onClick={SingInWithGoogle}
              className=" bg-gray-300 w-[250px] h-[40px] shadow-sm shadow-gray-500 mt-5 gap-2 outline-none border-none rounded-full flex justify-center items-center"
            >
              <Image src="/gl.png" width={25} height={25} alt="bg" />
              <h1 className=" text-black font-semibold">Login with Google</h1>
            </button>

            <div className=" mt-5 w-full">
              <p className="text-gray-600">Email</p>
              <input
                size="250px"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" bg-slate-300 rounded-md h-[40px] outline-none border-none text-black px-2"
              />
            </div>
            <div className=" mt-5">
              <p className="text-gray-600">Password</p>
              <input
                size="250px"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" bg-slate-300 rounded-md h-[40px] outline-none border-none text-black px-2"
              />
            </div>
            <button
              onClick={signinHandler}
              className=" bg-slate-900 mt-5 h-[40px] rounded-full"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className=" flex-1 h-full flex justify-end items-end  bg-white relative">
        <Image src="/bg.jpg" fill className=" object-cover" alt="bg" />
      </div>
    </div>
  );
};

export default Login;
