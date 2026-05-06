import PageHead from "@/components/commons/PageHead";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <main className="flex flex-col mx-auto min-h-screen w-full max-w-3xl items-center justify-center bg-white dark:bg-black">
      <PageHead />
      <Button variant="primary">Primary</Button>
    </main>
  );
}
