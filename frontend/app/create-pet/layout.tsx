import { getMetadata } from "@/utils/getMetadata";

export const metadata = getMetadata({
  title: "Create Pet",
  description: "Create and mint pet NFT",
});

const CreatePetLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CreatePetLayout;
