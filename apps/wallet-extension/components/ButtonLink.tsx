import { NextLink } from "./NextLink";
import { Button, ButtonProps } from "./Button";

type ButtonLinkProps = ButtonProps & {
  href: string;
};

export function ButtonLink({ children, href, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <NextLink href={href}>{children}</NextLink>
    </Button>
  );
}
