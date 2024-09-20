import { getMetadata } from "@/utils/getMetadata";

export const metadata = getMetadata({
  title: "Pet Gallery",
  description: "Photo Gallery about Pet",
});

const PetProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PetProfileLayout;
