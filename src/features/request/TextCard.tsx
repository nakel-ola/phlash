import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize, {
  TextareaHeightChangeMeta,
} from "../../components/TextareaAutosize";
import {
  addBody,
  addHeader,
  selectRequestData,
} from "../../redux/features/requestDataSlice";

const TextCard = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();
  const requestDataState = useSelector(selectRequestData);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    dispatch(
      addBody({
        body: e.target.value,
      })
    );

    let newHeader = {
      ...requestDataState.headersList,
      "Content-Type": "text/plain",
    };

    dispatch(
      addHeader({
        header:
          e.target.value.length > 0 ? newHeader : requestDataState.headersList,
      })
    );
  };
  return (
    <div className="pt-4 w-full h-full overflow-hidden">
      <div className="w-[98%] py-2 px-3 mx-auto flex items-center justify-between">
        <p className="text-sm text-black dark:text-white">Text Content</p>
      </div>

      <div className="flex w-[98%] mx-auto h-[calc(100%-40px)] border-2 border-slate-100 dark:border-neutral-800 overflow-y-scroll rounded-lg">
        <textarea
          name=""
          id=""
          value={input}
          onChange={handleChange}
          placeholder="Enter text"
          className="w-[98%] h-full mx-auto outline-none bg-transparent resize-none"
        ></textarea>
      </div>
    </div>
  );
};

export default TextCard;
