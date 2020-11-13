import { Drizzle } from "@drizzle/store";
import { useReady } from "components/connectionProvider/hooks";
import { useEffect } from "react";
import { useStore } from "react-redux";

function DrizzleCreator({ children }) {
  const ready = useReady();
  const store = useStore();

  // Reluctantly decided to set drizzle as a global variable as providing via
  // context was causing many timing and re-rendering issues, particularly as
  // we are adding contracts dynamically causing a cascade of updates for every
  // contract added.
  useEffect(() => {
    if (ready) {
      window.drizzle = new Drizzle({}, store);
    }
  }, [ready]);

  return children;
}

export default DrizzleCreator;
