import React, { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

interface ProductProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}
const Product = ({
  imgSrc,
  className,
  dark = false,
  ...props
}: ProductProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none relative z-50 overflow-hidden",
        className,
      )}
      {...props}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
      <div className="absolute inset-0 -z-10">
        <img
          className="min-h-full min-w-full object-cover"
          src={imgSrc}
          alt="overlaying product image"
        />
      </div>
    </div>
  );
};

export default Product;
