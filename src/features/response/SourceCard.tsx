import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

interface Props {
  isHtml: boolean;
  data: any;
}
const SourceCard = (props: Props) => {
  const { isHtml, data } = props;
  return (
    <Editor
      value={isHtml ? data : JSON.stringify(data, null, 2)}
      height="100%"
      className="h-full"
      editable={false}
      language={isHtml ? "html" : "json"}
    />
  );
};

export default SourceCard;
