import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectResponse } from "../../redux/features/responseSlices";
const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

const ErrorCard = () => {
  const responseState = useSelector(selectResponse);

  return (
    <div className="pt-4 w-full h-full overflow-hidden">
      <div className="w-[98%] h-[calc(100%-0px)]">
        <Editor
          value={responseState?.data}
          height="100%"
          className="h-full"
          editable={false}
        />
      </div>
    </div>
  );
};

export default ErrorCard;
