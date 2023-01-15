import React, { ReactNode, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { addUserId, selectUserId } from "../redux/features/userSlice";
import { getStorage, setStorage } from "../utils/localStorage";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

export default function MainLayout(props: Props) {
  const { children } = props;

  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleId = useCallback(async () => {
    const id = v4();
    if (!userId) dispatch(addUserId(id));
  }, [dispatch, userId]);

  useEffect(() => {
    handleId();
  }, [handleId]);
  return (
    <div className="grid grid-cols-11 h-screen">
      <Sidebar />
      {children}
    </div>
  );
}
