import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormBody, addBody } from "../../redux/features/requestDataSlice";
import { selectSelected } from "../../redux/features/requestsSlice";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const MenuCard = dynamic(() => import("./MenuCard"), { ssr: false });
const AuthTemplate = dynamic(() => import("./AuthTemplate"), { ssr: false });
const JsonCard = dynamic(() => import("./JsonCard"), { ssr: false });
const TextCard = dynamic(() => import("./TextCard"), { ssr: false });
const FormCard = dynamic(() => import("./FormCard"), { ssr: false });
const GraphQLCard = dynamic(() => import("./GraphQLCard"), { ssr: false });
const BasicCard = dynamic(() => import("./BasicCard"), { ssr: false });
const BearerCard = dynamic(() => import("./BearerCard"), { ssr: false });

interface Props {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Request(props: Props) {
  const { setToggle } = props;
  const requestState = useSelector(selectSelected);
  const dispatch = useDispatch();
  const [active, setActive] = useState<{ parent: number; child: number }>({
    parent: 0,
    child: 0,
  });

  const handleItemsChange = (data: FormBody[]) => {
    dispatch(addBody({ body: data }));
  };
  return (
    <div className="col-span-8 lg:col-span-4 border-r-[2px] border-r-slate-100 dark:border-r-neutral-800">
      {requestState ? (
        <>
          <Navbar setToggle={setToggle} />
          <MenuCard active={active} setActive={setActive} />

          <div className="h-[calc(100vh-100px)] overflow-hidden">
            {active.parent === 0 && (
              <>
                {requestState.method === "Get" ? (
                  <AuthTemplate title="Choose HTTP method can not send a request body" />
                ) : (
                  <>
                    {active.child === 0 && <JsonCard />}
                    {active.child === 1 && <TextCard />}
                    {active.child === 2 && (
                      <FormCard
                        title="Form Fields"
                        onFormChange={handleItemsChange}
                      />
                    )}
                    {active.child === 3 && <GraphQLCard />}
                  </>
                )}
              </>
            )}

            {active.parent === 1 && (
              <>
                {active.child === 0 && <BasicCard />}
                {active.child === 1 && <BearerCard />}
              </>
            )}

            {active.parent === 2 && (
              <FormCard title="Query Parameters" showCheckbox={false} />
            )}
            {active.parent === 3 && (
              <FormCard
                title="Http Headers"
                showCheckbox={false}
                defaultItems={[
                  {
                    value: { field: "Accept", value: "*/*" },
                    checkedValue: true,
                  },
                  {
                    value: {
                      field: "User-Agent",
                      value: "Phlash Client (https://www.thunderclient.com)",
                    },
                    checkedValue: true,
                  },
                ]}
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
