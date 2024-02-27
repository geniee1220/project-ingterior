import { useImageEdit } from '@/hooks/useImageEdit';

function ImageEditor({
  onImageChange,
}: {
  onImageChange: (editedImage: string) => void;
}) {
  const {
    image,
    getRootProps,
    getInputProps,
    rotate,
    flipHorizontally,
    flipVertically,
    resetChanges,
    editedImage,
    canvasRef,
    applyChanges,
  } = useImageEdit((editedImage: string) => {
    onImageChange(editedImage);
  });

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