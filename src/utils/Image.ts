import { Area } from 'react-easy-crop';

export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(file);
  });
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid CORS issues on CodeSandbox
    image.src = url;
  });

export const getCroppedImg = async (
  imageSrc: string,
  crop: Area
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxDimension = 256;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;

  // Determine the new dimensions
  let canvasWidth = cropWidth;
  let canvasHeight = cropHeight;

  if (cropWidth > maxDimension || cropHeight > maxDimension) {
    // Resize while maintaining aspect ratio
    const aspectRatio = cropWidth / cropHeight;
    if (aspectRatio > 1) {
      canvasWidth = maxDimension;
      canvasHeight = maxDimension / aspectRatio;
    } else {
      canvasHeight = maxDimension;
      canvasWidth = maxDimension * aspectRatio;
    }
  }

  // Set canvas dimensions
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  if (ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    // Draw cropped image on canvas
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    }, 'image/jpeg');
  });
};
