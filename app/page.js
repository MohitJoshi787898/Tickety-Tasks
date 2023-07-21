"use client";
import Image from "next/image";
import { IoAddOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useAuth } from "@/firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { BiCheckbox, BiClipboard, BiCheckSquare } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
export default function Home() {
  const { authUser, isLoading, signOut } = useAuth();
  const name = "Mohit";
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  const addTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        owner: authUser.uid,
        content: inputTodo,
        completed: false,
      });
      fetchTodos(authUser.uid);
      setInputTodo("");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTodos = async (uid) => {
    try {
      const q = await query(collection(db, "todos"), where("owner", "==", uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        data.push({ ...doc.data(), id: doc.id });
      });
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (docId) => {
    try {
      await deleteDoc(doc(db, "todos", docId));
      fetchTodos(authUser.id);
    } catch (error) {
      console.log(error);
    }
  };
  const markAsCompleted = async (check, docId) => {
    try {
      const docRef = await doc(db, "todos", docId);
      await updateDoc(docRef, { completed: !check });

      fetchTodos(authUser.id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isLoading && authUser === null) {
      router.push("/login");
    }
    if (!!authUser) {
      fetchTodos(authUser.uid);
    }
  }, [authUser, isLoading]);
  const onKeyUp = (e) => {
    if (e.key === "Enter" && inputTodo !== "") {
      addTodo();
    }
  };
  return (
    <div className=" flex w-[100vw] h-[100vh] justify-center flex-row-reverse bg-slate-200">
      <div className="w-[70vw] md:w-[600px]    flex flex-col items-center ">
        <div className=" flex w-full   justify-end mt-5 ">
          <button
            type="button"
            onClick={signOut}
            className="bg-gray-900 w-[100px] h-[35px] rounded-full hover:bg-slate-300 hover:font-semibold hover:text-black"
          >
            Sign Out
          </button>
        </div>
        <Image
          src="/todo.jpg"
          width={90}
          className="mt-[50px]"
          height={70}
          alt="logo"
        />
        <h1 className=" text-4xl font-serif text-black font-extrabold mt-5">
          Tickety-Tasks
        </h1>
        <div className="flex w-full px-5 mt-5">
          <input
            className="flex-1 border-black focus:border-orange-500 border-2 outline-none rounded-lg px-3 text-black"
            type="text"
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
            placeholder={`👏 ${authUser?.username} add new task in the list of infinitely postponed tasks`}
            onKeyUp={onKeyUp}
          />
          <button
            className=" w-[50px] h-10 flex justify-center items-center"
            onClick={addTodo}
          >
            <IoAddOutline
              value={{ color: "black", width: "50px" }}
              className=" bg-black font-bold rounded-md"
              size={40}
            />
          </button>
        </div>
        <div className=" mt-8 flex flex-col items-start bg w-full px-5">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="flex w-full items-center justify-between"
            >
              
              <button
                onClick={() => {
                  markAsCompleted(todo.completed, todo.id);
                }}
              >
                {!todo.completed ? (
                  <BiCheckbox size={50} className=" text-black" />
                ) : (
                  <BiCheckSquare
                    size={50}
                    className=" border-black text-green-400"
                  />
                )}
              </button>
              <div className="flex-1 break-words">
                <p className=" text-black font-serif  w-full max-w-[500px] font-medium">
                  {!todo.completed ? todo.content : <del>{todo.content}</del>}
                </p>
              </div>
              <button
                className=" w-[100px]"
                onClick={() => deleteTodo(todo.id)}
              >
                <MdOutlineDeleteForever className=" font-bold text-4xl text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
