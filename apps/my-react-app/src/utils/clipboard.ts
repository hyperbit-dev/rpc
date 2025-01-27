// import { toast } from "react-toastify";

export function copy(value: string) {
  navigator.clipboard.writeText(value);
  // toast(value, {
  //   className: "text-left",
  //   position: "top-right",
  //   autoClose: 2000,
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: false,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "dark",
  // });
}
