import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

export default async function ImageCompress(
  image: any,
  { width, height }: any
) {
  const compressSizer = (size: any) => {
    const MB = size / Math.pow(1024, 2);
    if (Math.round(MB) === 0) return 1;
    if (Math.round(MB) === 1) return 0.9;
    if (Math.round(MB) === 2) return 0.8;
    if (Math.round(MB) === 3) return 0.7;
    if (Math.round(MB) === 4) return 0.6;
    if (Math.round(MB) >= 5) return 0.5;
    if (Math.round(MB) >= 10) return 0.4;
    if (Math.round(MB) >= 15) return 0.3;
    if (Math.round(MB) >= 20) return 0.2;
    if (Math.round(MB) >= 25) return 0.1;
  };

  const imageManipulator = async (image: any, { width, height }: any) => {
    const response = await fetch(image);
    const blob = await response.blob();

    // Calculate and log the original image size in MB
    const originalSizeInMB = blob.size / (1024 * 1024);
    console.log("Original Image Size:", originalSizeInMB.toFixed(2), "MB");

    const compress = compressSizer(blob.size);

    let resize;
    if (height === width) resize = { height: 480, width: 480 };
    else if (height > width) resize = { height: 480 };
    else resize = { width: 720 };

    const compressedPhoto = await ImageManipulator.manipulateAsync(
      image,
      [{ resize }],
      {
        compress,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    // Convert the compressed image URI to base64
    const base64 = await FileSystem.readAsStringAsync(compressedPhoto.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Calculate the size of the base64 string in MB
    const base64Length = base64.length;
    const sizeInBytes = (base64Length * 3) / 4; // 3 bytes for every 4 base64 characters
    const sizeInMB = sizeInBytes / (1024 * 1024);

    console.log("Compressed Image Size :", sizeInMB.toFixed(2), "MB");
    //console.log('Compressed Image Size (Base64):', base64Length);

    return { uri: compressedPhoto.uri, base64 };
  };

  try {
    return await imageManipulator(image, { width, height });
  } catch (error) {
    console.log(error);
  }
}
