import React from "react";
import ReactLoading from "react-loading";
import type { LoadingProps} from "react-loading";
import { useTheme } from "../utils/theme";

interface Props extends Omit<LoadingProps, "color"> {
  title?: string;
}

export default function Loader(props: Props) {
  const { title = "", type = "spinningBubbles", ...others } = props;
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className="flex flex-col items-center justify-center">
      <ReactLoading
        type="spinningBubbles"
        color={currentTheme === "dark" ? "white" : "black"}
        {...others}
      />
      <p className="my-5 text-lg dark:text-white text-black font-medium">
        {title}
      </p>
    </div>
  );
}
