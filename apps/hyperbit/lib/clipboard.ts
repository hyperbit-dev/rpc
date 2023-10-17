import { toast } from "react-toastify";

export function copy(value: string | number) {
  const copy = document.createElement("textarea");
  document.body.appendChild(copy);
  copy.value = value;
  copy.select();
  document.execCommand("copy");
  document.body.removeChild(copy);
  toast(value, {
    className: "text-left",
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}
