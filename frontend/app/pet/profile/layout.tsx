import { getMetadata } from "@/utils/getMetadata";

export const metadata = getMetadata({
  title: "Pet Profile",
  description: "Data about Pet",
});

const PetProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PetProfileLayout;
