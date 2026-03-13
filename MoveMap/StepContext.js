import { createContext } from "react";

const StepContext = createContext({
  count: 0,
  distance: 0,
});

export default StepContext;
