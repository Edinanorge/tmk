import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return <section className="p-10 md:py-20 md:px-2  xl:px-40 2xl:px-80">{children}</section>;
}
