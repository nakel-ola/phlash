import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { ViewUpdate } from "@codemirror/view";
import { githubLight } from "@uiw/codemirror-theme-github";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { useState } from "react";
import { darkTheme } from "../utils/editorTheme";
import { useTheme } from "../utils/theme";

interface EditorProps extends ReactCodeMirrorProps {
  language?: "json" | "html";
}

const Editor = (props: EditorProps) => {
  const {
    onChange,
    extensions = [],
    value = "",
    language = "json",
    ...rest
  } = props;
  const [input, setInput] = useState(value);

  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    onChange?.(value, viewUpdate);
    setInput(value);
  };

  const languages = {
    html,
    json,
  };

  return (
    <CodeMirror
      value={input}
      height="100%"
      className="h-full"
      theme={currentTheme === "dark" ? darkTheme : githubLight}
      extensions={[...extensions, languages[language]()]}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default Editor;
