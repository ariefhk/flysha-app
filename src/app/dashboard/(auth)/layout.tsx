import React from "react";

export default function AuthLayout({ children }: Readonly<React.PropsWithChildren>) {
  return <main>{children}</main>;
}
