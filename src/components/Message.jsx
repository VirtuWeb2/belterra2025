import gsap from "gsap";
import { CircleX } from "lucide-react";
import { CheckCircle } from "lucide-react";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Message = ({ type, title, setMessage }) => {
  const timeOut = useRef();
  useEffect(() => {
    gsap.fromTo(
      ".message",
      { opacity: 0, x: -64 },
      {
        opacity: 1,
        x: 0,
        duration: .3,
        ease: "expo.inOut",
        onComplete: () => {
          clearTimeout(timeOut.current);
          timeOut.current = setTimeout(() => {
            setMessage(null);
          }, 3000);
        },
      }
    );
  }, [setMessage]);
  return (
    <div
      className={`message fixed left-8 bottom-8 ${
        type === "success" ? "bg-green-400" : "bg-[#FF8A8A]"
      } p-[1.6rem] rounded-md`}
    >
      <div className="flex gap-[1rem] items-center ">
        {type === "success" ? (
          <CheckCircle className="text-green-950" />
        ) : (
          <CircleX className="text-red-900" width={24} />
        )}
        <span
          className={`${
            type === "success" ? "text-green-950" : " text-red-900"
          } text-[1.8rem]  font-semibold`}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

export default Message;
