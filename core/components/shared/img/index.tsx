import Image, { ImageProps } from "next/image";
import { FC } from "react";

interface Props extends ImageProps {}

export const CImg: FC<Props> = ({ src, alt = "", className, ...props }) => {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        crossOrigin="use-credentials"
        unoptimized
        fill
        {...props}
      />
    </div>
  );
};
