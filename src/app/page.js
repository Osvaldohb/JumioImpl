
import { Suspense } from "react";
import JumioJsx from "./components/jumio/Jumio";


export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <JumioJsx/>
      </Suspense>

    </div>
  );
}
