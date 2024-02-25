import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageEditor({
  onImageChange,
}: {
  onImageChange: (editedImage: string) => void;
}) {
  const [image, setImage] = useState<any>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flippedHorizontally, setFlippedHorizontally] = useState(false);
  const [flippedVertically, setFlippedVertically] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.src = image;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.save();
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.translate(canvas.width / 2, canvas.height / 2);
        ctx?.rotate((rotation * Math.PI) / 180);
        if (flippedHorizontally) ctx?.scale(-1, 1);
        if (flippedVertically) ctx?.scale(1, -1);
        ctx?.drawImage(img, -img.width / 2, -img.height / 2);
        ctx?.restore();
        setEditedImage(canvas.toDataURL());
      };
    }
  }, [image, rotation, flippedHorizontally, flippedVertically]);

  const onDrop = (acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const rotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const flipHorizontally = () => {
    setFlippedHorizontally(!flippedHorizontally);
  };

  const flipVertically = () => {
    setFlippedVertically(!flippedVertically);
  };

  const resetChanges = () => {
    setRotation(0);
    setFlippedHorizontally(false);
    setFlippedVertically(false);
    setEditedImage(null);
  };

  const applyChanges = () => {
    if (editedImage) {
      console.log(editedImage);
      onImageChange(editedImage);
    }
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>이미지 드래그 앤 드랍 영역</p>
      </div>
      {image && (
        <div>
          <button onClick={rotate}>Rotate</button>
          <button onClick={flipHorizontally}>Flip Horizontally</button>
          <button onClick={flipVertically}>Flip Vertically</button>
          <button onClick={resetChanges}>Reset Changes</button>
          <button onClick={applyChanges}>Apply Changes</button>
          <br />
          <canvas
            ref={canvasRef}
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: '1px solid black',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageEditor;