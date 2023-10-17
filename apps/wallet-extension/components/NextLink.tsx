import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

const isProduction = process.env.NODE_ENV === "production";

type NextLinkProps = LinkProps & {
  children?: ReactNode;
  hrefAs?: string;
};

export function NextLink({ children, hrefAs, ...props }: NextLinkProps) {
  const staticAs = isProduction ? props.as ?? hrefAs : undefined;
  return (
    <Link {...props} as={staticAs}>
      {children}
    </Link>
  );
}
