import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectResponse } from "../../redux/features/responseSlices";
const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

const isHtml = (data: string) => {
  if (data[1] === "<") return true;
  return false;
};

const JsonCard = () => {
  const responseState = useSelector(selectResponse);

  const html = isHtml(JSON.stringify(responseState?.data));

  return (
    <div className="pt-4 w-full h-full overflow-hidden">
      <div className="w-[98%] py-2 px-3 mx-auto flex items-center justify-between">
        <p className="text-sm text-black dark:text-white">Results</p>
        {html ? (
          <button
            className="text-sm text-black dark:text-white"
            onClick={() => {}}
          >
            Preview
          </button>
        ) : (
          <button
            className="text-sm text-black dark:text-white"
            onClick={() => {}}
          >
            Copy
          </button>
        )}
      </div>
      <div className="w-[98%] h-[calc(100%-40px)]">
        <Editor
          value={
            html
              ? responseState?.data
              : JSON.stringify(responseState?.data, null, 2)
          }
          height="100%"
          className="h-full"
          editable={false}
          language={html ? "html" : "json"}
        />
      </div>
    </div>
  );
};
export default JsonCard;
