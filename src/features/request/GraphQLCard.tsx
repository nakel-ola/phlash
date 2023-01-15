import { Divider } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBody,
  addHeader,
  selectRequestData,
} from "../../redux/features/requestDataSlice";


const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

const GraphQLCard = () => {
  const requestDataState = useSelector(selectRequestData);
  let dispatch = useDispatch();

  const [input, setInput] = useState({
    query: "",
    variables: "",
  });

  const handleChange = (value: string, name: "query" | "variables") => {
    setInput({ ...input, [name]: value });
    dispatch(addBody({ body: input }));
    let newHeader = {
      ...requestDataState.headersList,
      "Content-Type": "application/json",
    };

    dispatch(
      addHeader({
        header: value.length > 0 ? newHeader : requestDataState.headersList,
      })
    );
  };

  return (
    <div className="pt-4 w-full h-full overflow-hidden">
      <div className="w-[98%] py-2 px-3 mx-auto flex items-center justify-between">
        <p className="text-sm text-black dark:text-white">Query</p>
      </div>

      <Editor
        value={input.query}
        onChange={(value: string) => handleChange(value, "query")}
        height="100%"
        className="h-[55%]"
      />

      <Divider />

      <div className="w-[98%] py-2 px-3 mx-auto flex items-center justify-between">
        <p className="text-sm text-black dark:text-white">Variables</p>
      </div>

      <Editor
        value={input.variables}
        onChange={(value: string) => handleChange(value, "variables")}
        height="100%"
        className="h-[30%]"
      />
    </div>
  );
};

export default GraphQLCard;
