import { useContext, createContext } from "react";
import { GlobalContexttype } from "./loginTypes";

export const MyGlobalContext = createContext<GlobalContexttype>({
  user: {},
  setUser: () => {}
});
export const useGlobalContext = () => useContext(MyGlobalContext);
