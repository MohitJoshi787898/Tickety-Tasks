"use client";
import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Loder from "@/components/Loder";

const Register = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {authUser,isLoading,setAuthUser}=useAuth();
  useEffect(()=>{
    if(!isLoading && authUser){
      router.push("/")
    }
  },[authUser,isLoading])
  const signupHandler = async () => {
    if (username === "" || email === "" || password == "") return;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: username });
      console.log(user);
      setAuthUser({uid:user.uid, email:user.email,username})
    } catch (error) {
      console.log(error);
    }
  };
  const signinWithGoogle = async () => {
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  };
  return isLoading || (!isLoading && authUser) ? (
    <Loder />
  ) : (
    <div className=" flex w-[100vw] h-[100vh]">
      <div className=" bg-slate-200 flex-1 h-full w-full p-5">
        <div className=" flex w-full h-full  justify-center items-center">
          <div className=" flex justify-start flex-col ">
            <h1 className=" text-black font-extrabold text-4xl">Sign Up</h1>
            <div>
              <span className=" text-gray-600">Dont have an account?</span>
              <Link
                href="/login"
                className="text-black underline-offset-2 underline"
              >
                SignIn
              </Link>
            </div>
            <button
              onClick={signinWithGoogle}
              className=" bg-gray-300 w-[250px] h-[40px] shadow-sm shadow-gray-500 mt-5 gap-2 outline-none border-none rounded-full flex justify-center items-center"
            >
              <Image src="/gl.png" width={25} height={25} alt="google" />
              <h1 className=" text-black font-semibold">Login with Google</h1>
            </button>
            <form
              className="flex justify-start flex-col "
              onSubmit={(e) => e.preventDefault()}
            >
              <div className=" mt-5 w-full flex justify-start flex-col ">
                <label className="text-gray-600">Name</label>
                <input
                  size="250px"
                  type="text "
                  className=" bg-slate-300 rounded-md h-[40px] outline-none border-none text-black px-2"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className=" mt-5 w-full flex justify-start flex-col ">
                <label className="text-gray-600">Email</label>
                <input
                  size="250px"
                  type="email"
                  className=" bg-slate-300 rounded-md h-[40px] outline-none border-none text-black px-2"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className=" mt-5 flex justify-start flex-col ">
                <label className="text-gray-600">Password</label>
                <input
                  size="250px"
                  type="password"
                  className=" bg-slate-300 rounded-md h-[40px] outline-none border-none text-black px-2"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className=" bg-slate-900 mt-5 h-[40px] rounded-full"
                onClick={signupHandler}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className=" flex-1 h-full flex justify-end items-end  bg-white relative">
        <Image src="/bg.jpg" fill className=" object-cover" alt="bg" />
      </div>
    </div>
  );
};

export default Register;
