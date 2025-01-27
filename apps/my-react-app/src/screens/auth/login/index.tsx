import { LoginForm } from "./components/login-form";

export default function LoginScreen() {
  return (
    <div className="flex flex-row h-full">
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="hidden lg:block flex-1 flex items-center justify-center py-2">
        <div
          className="bg-brand-500 h-full w-full rounded-s-lg relative overflow-hidden"
          style={{
            background:
              "linear-gradient(140deg, #F3F5F8 0%,#F3F5F8 16%,#f3f3f7 16%,#f3f3f7 50%,#edeff2 50%,#edeff2 100%)",
          }}
        >
          {/* <Image
            className="border border-black border-4 rounded-lg absolute top-0 bottom-0 left-48 m-auto  max-w-100 max-h-100 w-[882px] h-[666px] object-cover object-left"
            src="/marketing/explorer.png"
            width={882}
            height={666}
            alt="Blockchain Explorer"
            priority
          /> */}
        </div>
      </div>
    </div>
  );
}
