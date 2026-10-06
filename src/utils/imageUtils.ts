/**
 * Utility to process and compress uploaded images to base64 Data URLs.
 * Keeps storage light and ensures persistence in LocalStorage works seamlessly.
 */
export function compressImageFile(
  file: File,
  maxWidth = 700,
  maxHeight = 700,
  quality = 0.78
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith('image/')) {
      reject(new Error('File yang dipilih bukan berkas gambar valid'));
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      if (!result) {
        reject(new Error('Gagal membaca berkas gambar'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original base64
          resolve(result);
          return;
        }

        // Draw background white in case of transparent png converting to jpeg
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          resolve(result);
        }
      };

      img.onerror = () => {
        // Fallback to direct data URL
        resolve(result);
      };

      img.src = result;
    };

    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
