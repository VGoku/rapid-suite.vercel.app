/**
 * PhotoCapture.tsx
 * -----------------
 * A reusable component for capturing or uploading photos.
 *
 * Features:
 * - Mobile: opens the device camera
 * - Desktop: opens file picker
 * - Converts selected image to base64
 * - Returns base64 string to parent via onPhoto()
 *
 * Improvements in this version:
 * - Professional light/dark mode styling
 * - Better variable names
 * - Stronger accessibility
 * - Cleaner layout and comments
 */

import { useRef } from "react";

interface PhotoCaptureProps {
  onPhoto: (base64: string) => void;
}

export default function PhotoCapture({ onPhoto }: PhotoCaptureProps) {
  /** Reference to the hidden file input */
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Converts a File object into a base64 string.
   * This is used for both mobile camera captures and desktop uploads.
   */
  function convertFileToBase64(imageFile: File) {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        onPhoto(reader.result.toString());
      }
    };

    reader.readAsDataURL(imageFile);
  }

  /**
   * Triggered when the user selects a file from the file picker.
   */
  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) convertFileToBase64(selectedFile);
  }

  /**
   * Opens the hidden file input.
   * On mobile devices, this will open the camera.
   */
  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <div className="flex flex-col gap-4">

      {/* TAKE / UPLOAD PHOTO BUTTON */}
      <button
        onClick={openFilePicker}
        className="
          px-4 py-3 rounded-lg font-medium
          bg-blue-600 text-white hover:bg-blue-700
          dark:bg-blue-500 dark:hover:bg-blue-400
        "
      >
        📸 Take or Upload Photo
      </button>

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"  // Opens camera on mobile devices
        onChange={handleFileSelection}
        className="hidden"
      />
    </div>
  );
}