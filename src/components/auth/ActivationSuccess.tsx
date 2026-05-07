import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const ActivationSuccess = (props: PropTypes) => {
  const router = useRouter();

  const { status } = props;
  const success = status === "success";

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
          priority
        />
        <Image
          src={
            success
              ? "/images/illustrations/success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
          priority
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-danger-500 text-3xl font-bold">
          {success ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-default-500 text-xl font-bold">
          {success
            ? "Thank you for register account in EventForge"
            : "Confirmation code is invalid"}
        </p>

        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
          onPress={() => router.push("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ActivationSuccess;
