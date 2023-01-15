import { Eye, EyeSlash } from "iconsax-react";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import InputCard from "../../components/InputCard";
import { useEncrypt } from "../../hooks/use-aes";
import { addAuth } from "../../redux/features/requestDataSlice";
import AuthTemplate from "./AuthTemplate";

interface FormType {
  username: string;
  password: string;
}
const BasicCard = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<FormType>({
    username: "",
    password: "",
  });

  const [toggle, setToggle] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let value = useEncrypt(form.username + form.password);
    dispatch(addAuth({ auth: `Basic ${value}`}))
  };
  return (
    <AuthTemplate title="Basic Authentication">
      <div className="">
        <InputCard
          title="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <InputCard
          title="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          IconRight={
            <div className="flex items-center justify-center ml-2">
              <button
                type="button"
                className="flex items-center justify-center w-[25px] h-[25px]"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? (
                  <EyeSlash
                    size={25}
                    variant="Bold"
                    className="dark:text-neutral-300 text-[20px] px-[2px] text-[#212121]"
                  />
                ) : (
                  <Eye
                    size={25}
                    variant="Bold"
                    className="dark:text-neutral-300 text-[20px] px-[2px] text-[#212121]"
                  />
                )}
              </button>
            </div>
          }
        />
      </div>
    </AuthTemplate>
  );
};



export default BasicCard;
