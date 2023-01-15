import { useState,ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import InputCard from "../../components/InputCard";
import TextareaAutosize from "../../components/TextareaAutosize";
import { addAuth } from "../../redux/features/requestDataSlice";
import AuthTemplate from "./AuthTemplate";


const BearerCard = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ text: "", token: "Bearer" });


  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    dispatch(addAuth({ auth: `${input.token} ${input.text}`}))
  }

  return (
    <AuthTemplate title="Bearer Token">
      <div className="flex flex-col w-[98%] mx-auto h-[55%] border-2 border-slate-100 dark:border-neutral-800 overflow-y-scroll rounded-lg">
        <TextareaAutosize
          name="text"
          minRows={10}
          className=" outline-0 w-[98%] mx-auto h-full scrollbar-hide bg-transparent text-neutral-600 dark:text-neutral-400 resize-none"
          value={input.text}
          onChange={handleChange}
          placeholder="Enter text"
        ></TextareaAutosize>
      </div>

      <div className="w-[90%] ml-3">
        <InputCard
          name="token"
          title="Token Prefix"
          toggle
          value={input.token}
          onChange={handleChange}
        />
      </div>
    </AuthTemplate>
  );
};

export default BearerCard;
