import dynamic from "next/dynamic";
import React, { Fragment, ReactNode, useState } from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { selectSelected } from "../../redux/features/requestsSlice";
import {
  selectLoading,
  selectResponse,
} from "../../redux/features/responseSlices";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const MenuCard = dynamic(() => import("./MenuCard"), { ssr: false });
const SuccessCard = dynamic(() => import("./SuccessCard"), { ssr: false });
const ErrorCard = dynamic(() => import("./ErrorCard"), { ssr: false });
const HeaderCard = dynamic(() => import("./HeaderCard"), { ssr: false });

interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Response(props: Props) {
  const { setToggle, toggle } = props;
  return (
    <div className="col-span-8 lg:col-span-4">
      <DesktopSection>
        <Content setToggle={setToggle} />
      </DesktopSection>

      {toggle ? (
        <MobileSection>
          <Content setToggle={setToggle} />
        </MobileSection>
      ) : null}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
}

const MobileSection = (props: SectionProps) => {
  const { children } = props;
  return (
    <div className="lg:hidden w-full fixed top-0 h-full bg-white dark:bg-dark">
      {children}
    </div>
  );
};
const DesktopSection = (props: SectionProps) => {
  const { children } = props;
  return <div className="hidden lg:flex w-full">{children}</div>;
};

const Content = (props: Omit<Props, "toggle">) => {
  const { setToggle } = props;
  const requestState = useSelector(selectSelected);
  const responseState = useSelector(selectResponse);
  const loadingState = useSelector(selectLoading);

  const [active, setActive] = useState<number>(0);
  return (
    <div className="w-full">
      {requestState && responseState && !loadingState ? (
        <Fragment>
          <Navbar setToggle={setToggle} />
          <MenuCard active={active} setActive={setActive} />
          <div className="h-[calc(100vh-105px)] overflow-hidden">
            {active === 0 &&
              (responseState.type === "success" ? (
                <SuccessCard />
              ) : (
                <ErrorCard />
              ))}
            {active === 1 && <HeaderCard />}
          </div>
        </Fragment>
      ) : null}

      {loadingState ? (
        <div className="h-[calc(100vh)] grid place-items-center">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};
