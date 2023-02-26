import Link, { LinkProps } from "next/link";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<LinkProps> {
  content?: string;
  className?: string;
}

export const CLink: FC<Props> = ({
  href,
  content,
  children,
  className,
  ...props
}) => {
  return (
    <Link
      href={href}
      style={{ pointerEvents: href ? "initial" : "none" }}
      className={className}
      {...props}
    >
      {children ? children : <a>{content}</a>}
    </Link>
  );
};
