import { FormGroup, Input, Label } from "@hyperbitui/react";
import Store from "electron-store";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  const [store, _] = useState(new Store());

  useEffect(() => {
    const data = store.get("data");
    console.log("data", data);
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      <FormGroup>
        <Label>Password</Label>
        <Input />
      </FormGroup>
      <Link to="/">Home</Link>
    </div>
  );
}
