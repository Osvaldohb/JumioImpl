import JumioJsx from "./components/jumio/Jumio";


export default function Home() {
  return (
    <div >
      <h1 className="text-3xl font-bold underline">
        Welcome to DPR Jumio!
      </h1>
      <p className="mt-4 text-lg">
        This is a simple Next.js application demonstrating the integration of Jumio for identity verification.
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Please follow the instructions in the documentation to set up and use Jumio services.
      </p>
      <JumioJsx/>
    </div>
  );
}
