import crypto from "crypto";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { ResponseError } from "@/types/api";

export async function GET(): Promise<NextResponse<any | ResponseError>> {
  try {
    const nonce = crypto.randomBytes(32).toString("base64");
    return NextResponse.json(
      { nonce },
      {
        status: 200,
        headers: {
          "Set-Cookie": serialize("auth-nonce", nonce, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          }),
        },
      }
    );
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
