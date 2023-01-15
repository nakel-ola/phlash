import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import Request from "../../features/request";
import { selectSelected } from "../../redux/features/requestsSlice";

const Response = dynamic(() => import("../../features/response"), {
  ssr: false,
});

export default function Home() {
  const requestState = useSelector(selectSelected);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Head>
        <title>{requestState?.title}</title>
      </Head>
      <div className="col-span-11 lg:col-span-8 flex flex-col lg:grid lg:grid-cols-8 lg:flex-row overflow-hidden lg:overflow-hidden">
        <Request setToggle={setToggle} />
        <Response toggle={toggle} setToggle={setToggle} />
      </div>
    </>
  );
}
