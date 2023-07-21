"use client"
import { useState } from "react";
import { BiCheckbox, BiClipboard, BiCheckSquare } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

const Todo = ({id, content,completed}) => {
  const [check, setCheck] = useState(false);
// const check=true;
console.log(check)
  return (
    <div key={id}  className="flex w-full items-center justify-between">
      <button onClick={()=>setCheck((pre)=>!pre)}>
        {!check ? (
          <BiCheckbox size={50} className=" text-black" />
        ) : (
          <BiCheckSquare size={50} className=" border-black text-green-400" />
        )}
      </button>
      <div className="flex-1 break-words">
        <p className=" text-black font-serif w-[500px] font-medium">
          {!check ?{content} : (<del>{content}</del>)}
        
        </p>
      </div>
      <MdOutlineDeleteForever
        size={50}
        className=" border-black text-red-600"
      />
    </div>
  );
};

export default Todo;
