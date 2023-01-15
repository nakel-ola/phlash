import React from "react";

interface Props {
  data: any;
}
const PreviewCard = (props: Props) => {
  const { data = "" } = props;
  return (
    <iframe
      title="preview"
      sandbox="allow-scripts"
      srcDoc={data}
      style={{
        background: "black",
      }}
      frameBorder={0}
      className="w-full h-full border-0"
    ></iframe>
  );
};

export default PreviewCard;
