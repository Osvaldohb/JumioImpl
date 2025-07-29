
import { Suspense } from "react";
import JumioJsx from "./components/jumio/Jumio";
import { AppProvider } from "./context/AppContext";


export default function Home() {
  return (
    <AppProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <JumioJsx/>
      </Suspense>

    </AppProvider>
  );
}
