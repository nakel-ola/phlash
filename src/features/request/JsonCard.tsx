import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBody,
  addHeader,
  selectRequestData,
} from "../../redux/features/requestDataSlice";
const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

const JsonCard = () => {
  const [input, setInput] = useState<any>();
  const dispatch = useDispatch();
  const requestDataState = useSelector(selectRequestData);

  const onChange = useCallback(
    (value: string, viewUpdate: any) => {
      setInput(value);
      dispatch(
        addBody({
          body: value,
        })
      );

      let newHeader = {
        ...requestDataState.headersList,
        "Content-Type": "application/json",
      };

      dispatch(
        addHeader({
          header: value.length > 0 ? newHeader : requestDataState.headersList,
        })
      );
    },
    [dispatch, requestDataState.headersList]
  );

  return (
    <div className="pt-2 w-full h-full overflow-hidden">
      <div className="w-[98%] py-2 px-3 mx-auto flex items-center justify-between">
        <p className="text-sm text-black dark:text-white">Json Content</p>
      </div>

      <div className="w-[98%] h-[calc(100%-40px)]">
        <Editor
          value={input}
          height="100%"
          className="h-full"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default JsonCard;

// npm uninstall react-simple-code-editor react-codemirror2
