import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen
    p-8 pb-5 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Contact Manager App</h1>
      <p className="text-lg text-gray-600">Manage your contacts efficiently and effortlessly.</p>
      </div>
      <Image src="/contact-manager.webp" alt="Contact Manager" width={400} height={300}
       className="rounded-lg shadow-md"/>
      
      <div className="text-center">
        <p className="mt-2 text-lg text-gray-500">Start managing your contacts today!</p>
      </div>
    </div>
    </>
  );
}
