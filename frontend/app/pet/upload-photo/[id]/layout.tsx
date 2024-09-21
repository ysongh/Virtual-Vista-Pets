import { getMetadata } from "@/utils/getMetadata";

export const metadata = getMetadata({
  title: "Upload Photo",
  description: "Upload photo for your pet",
});

const CreatePetLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CreatePetLayout;
