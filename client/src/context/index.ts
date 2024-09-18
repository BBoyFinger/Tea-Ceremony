import { createContext, Dispatch, SetStateAction } from "react";

interface ContextType {
  // Define your context value type here
  fetchUserDetails: () => Promise<void>; 
}

const Context = createContext<ContextType | null>(null);

export default Context;