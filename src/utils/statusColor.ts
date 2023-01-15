const colors: any = {
  get: ["text-blue-600", "bg-blue-600/10"],
  post: ["text-green-500", "bg-green-500/10"],
  put: ["text-indigo-600", "bg-indigo-600/10"],
  patch: ["text-yellow-500", "bg-yellow-600/10"],
  delete: ["text-red-500", "bg-red-600/10"],
};

export const statusColor = (word: string): string =>
  colors[word.toLowerCase()][0] || "";
export const statusbg = (word: string): string =>
  colors[word.toLowerCase()][1] || "";
