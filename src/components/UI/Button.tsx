import React, { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  textOnly?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  textOnly = false,
  className = "",
  ...props
}: ButtonProps): JSX.Element {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
