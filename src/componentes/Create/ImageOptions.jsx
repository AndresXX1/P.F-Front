import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./imageOptions.css"

const ImageOptions = ({ imageOptions, setImageOptions, imageUrls, setImageUrls, imageFiles, setImageFiles }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);



   
    const handleTypeChange = (index, event) => {
      const newImageOptions = [...imageOptions];
      newImageOptions[index].type = event.target.value;
      setImageOptions(newImageOptions);
    };
   
    const handleValueChange = (index, event) => {
        const newImageOptions = [...imageOptions];
        const value = event.target.value;
        newImageOptions[index].value = value;
        setImageOptions(newImageOptions);
      
        // Si el tipo es 'url', actualiza imageUrls con la nueva URL
        if (newImageOptions[index].type === 'url') {
          const newImageUrls = [...imageUrls];
          newImageUrls[index] = value;
          setImageUrls(newImageUrls);
        }
      };
   
 

       const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
          const newImageFiles = [...imageFiles];
          newImageFiles[index] = file;
          setImageFiles(newImageFiles);
      
          const reader = new FileReader();
          reader.onload = function(e) {
            const newImageUrls = [...imageUrls];
            newImageUrls[index] = e.target.result;
            setImageUrls(newImageUrls);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleAddImageOption = () => {
        setImageOptions([...imageOptions, { id: uuidv4(), type: '', value: '', file: null }]);
        setImageUrls([...imageUrls, ""]);
        setImageFiles([...imageUrls, null]);
    };
 
    const handleRemoveImageOption = (index) => {
        const newImageOptions = [...imageOptions];
        const newImageUrls = [...imageUrls];
        const newImageFiles = [...imageFiles];
     
        newImageOptions.splice(index, 1);
        newImageUrls.splice(index, 1);
        newImageFiles.splice(index, 1);
     
        setImageOptions(newImageOptions);
        setImageUrls(newImageUrls);
        setImageFiles(newImageFiles);
     
        if (index === currentImageIndex && imageUrls.length > 1) {
            setCurrentImageIndex((prevIndex) => (prevIndex < imageUrls.length - 1 ? prevIndex : prevIndex - 1));
        } else if (index === currentImageIndex && imageUrls.length === 1) {
            setCurrentImageIndex(0);
        }
     };

 return (
  <>

{imageOptions.map((option, index) => (
  <div key={option.id} className="image-option-container">
    <select value={option.type} onChange={(event) => handleTypeChange(index, event)}>
      <option value="">Selecciona una opción</option>
      <option value="url">URL</option>
      <option value="file">Archivo</option>
    </select>
    {option.type === 'url' && (
      <input type="text" value={option.value} onChange={(event) => handleValueChange(index, event)} />
    )}
    {option.type === 'file' && (
      <input type="file" onChange={(event) => handleFileChange(index, event)} />
    )}
    <button type="button" onClick={() => handleRemoveImageOption(index)} className="image-option-remove-button">X</button>
  </div>
))}
<button type="button" onClick={handleAddImageOption} className="image-option-add-button">add a new image</button>
  </>
 );
};

export default ImageOptions;