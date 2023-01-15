import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";

const darkTheme = createTheme({
  theme: "dark",
  settings: {
    background: '#212121',
    foreground: '#f8f8f2',
    caret: '#FFFFFF',
    selection: 'rgb(64, 64, 64)',
    selectionMatch: 'rgba(255, 255, 255, 0.2)',
    gutterBackground: 'rgb(23, 23, 23)',
    gutterForeground: '#999',
    lineHighlight: 'rgba(255, 255, 255, 0.1)',
  },
  styles: [
    { tag: [t.comment, t.bracket], color: "#8b949e" },
    { tag: [t.className, t.propertyName], color: "#d2a8ff" },
    {
      tag: [t.variableName, t.attributeName, t.number, t.operator],
      color: "#79c0ff",
    },
    {
      tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
      color: "#ff7b72",
    },
    { tag: [t.string, t.meta, t.regexp], color: "#a5d6ff" },
    { tag: [t.name, t.quote], color: "#7ee787" },
    { tag: [t.heading], color: "#d2a8ff", fontWeight: "bold" },
    { tag: [t.emphasis], color: "#d2a8ff", fontStyle: "italic" },
    { tag: [t.deleted], color: "#ffdcd7", backgroundColor: "ffeef0" },
  ],
});


export { darkTheme }
