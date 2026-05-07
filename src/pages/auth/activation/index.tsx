import ActivationSuccess from "@/components/auth/ActivationSuccess";
import AuthLayout from "@/components/layouts/AuthLayout";
import authServices from "@/services/auth.service";

interface PropTypes {
  status: "success" | "failed";
}

const ActivationPage = (props: PropTypes) => {
  const { status } = props;
  console.log(props);

  return (
    <AuthLayout title="EventForge | Activation">
      <ActivationSuccess status={status} />
    </AuthLayout>
  );
};

export const getServerSideProps = async (context: {
  query: { code: string };
}) => {
  try {
    const res = await authServices.activation({ code: context.query.code });

    console.log(res.data);
    if (res.data.data) {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        status: "failed",
      },
    };
  }
};

export default ActivationPage;
