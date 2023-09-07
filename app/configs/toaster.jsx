import toast from "react-hot-toast";

const toaster = ({ message, type, promise, error, position }) => {
  console.log(message, type);
  if (type === "error") {
    toast.error(message);
  } else if (type === "success") {
    toast.success(message);
  } else if (type === "promise") {
    toast.promise(promise, {
      loading: "Loading",
      success: message,
      error: error,
    });
  }
};

export default toaster;
