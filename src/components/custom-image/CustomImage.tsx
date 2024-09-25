import Image, { ImageProps } from 'next/image';

function CustomImage(props: ImageProps) {
  return (
    <Image
      {...props}
      className={`transition-image ${props.className}`}
      alt={props.alt}
      style={{ objectFit: 'scale-down', ...props.style }}
    />
  );
}

export default CustomImage;
