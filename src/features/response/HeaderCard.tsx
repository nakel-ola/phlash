import React from "react";
import { useSelector } from "react-redux";
import { selectResponse } from "../../redux/features/responseSlices";
import objToArray from "../../utils/objToArray";
import ResponseTemplate from "./ResponseTemplate";

function HeaderCard() {
  const responseState = useSelector(selectResponse);

  const headers = objToArray(responseState?.headers!);

  return (
    <ResponseTemplate>
      <div className="flex flex-col items-center h-full">
        <div className="w-[95%] h-[45px] flex items-center justify-evenly border-b-[2px] border-slate-100 dark:border-neutral-800">
          <div className="flex items-start w-[49%] p-2">
            <p className="font-bold text-black dark:text-white text-lg">
              Name
            </p>
          </div>
          <div className="h-full w-[2%]">
            <hr className="w-[2px] h-full bg-slate-100 dark:bg-neutral-800 border-0" />
          </div>
          <div className="flex items-start w-[49%] p-2">
            <p className="font-bold text-black dark:text-white text-lg">
              Value
            </p>
          </div>
        </div>

        <div className="w-[95%] h-[calc(100%-100px)] divide-y-[2px] divide-slate-100 dark:divide-neutral-800 overflow-y-scroll overflow-x-hidden">
          {headers.map(({ field, value }, index: number) => (
            <div
              key={index}
              className="flex items-center justify-evenly h-[45px] w-full "
            >
              <div className="flex items-start w-[49%] p-2">
                <p className=" text-black dark:text-white text-sm">{field}</p>
              </div>
              <div className="h-full w-[2%]">
                <hr className="w-[2px] h-full bg-slate-100 dark:bg-neutral-800 border-0" />
              </div>
              <div className="flex items-start w-[49%] p-2">
                <p className=" text-black dark:text-white text-sm whitespace-nowrap">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResponseTemplate>
  );
}

export default HeaderCard;
