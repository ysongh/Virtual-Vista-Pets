import Image from "next/image";

export default function Footer() {
  return (
    <div className="bottom-0 w-full bg-blue-600 flex items-center flex-col lg:flex-row lg:justify-between gap-4 px-4">
      <div className="flex flex-row gap-8 items-center justify-center mb-4">
       <p className="text-white text-2xl">Virtual Vista Pets</p>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center mb-2">
        <p className="text-white text-2xl">2024</p>
      </div>
    </div>
  );
}
