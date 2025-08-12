import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import Markdown from 'react-markdown';
import Toaster from '../Toaster/Toaster';
import './RecipeModal.scss';
import 'react-markdown-editor-lite/lib/index.css';

export default function RecipeModal({ isOpen, onClose, onSave, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || ['']);
  const [description, setDescription] = useState(initialData?.description || '');
  const [isPreview, setIsPreview] = useState(false);
  const [toast, setToast] = useState(null);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'InterCode');
  
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dbxz0czfj/image/upload',
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      setToast({ type: 'error', message: 'Image upload failed' });
    }
  };
  

  const handleEditorChange = ({ text }) => {
    setDescription(text);
  };

  const handleSave = async () => {
    try {
      await onSave({
        title,
        description,
        ingredients,
        imageUrl,
      });
      setToast({ type: 'success', message: 'Recipe saved!' });
      setTimeout(() => {
        setToast(null);
        onClose();
      }, 1000);
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to save recipe' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="recipe-modal-overlay">
      <div className="recipe-modal">
        <h2>{initialData ? 'Edit Recipe' : 'Create Recipe'}</h2>

        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input type="file" onChange={(e) => uploadImage(e.target.files[0])} />
        {imageUrl && <img className="preview-img" src={imageUrl} alt="Preview" />}

        <h4>Ingredients</h4>
        {ingredients.map((ing, idx) => (
          <input
            key={idx}
            value={ing}
            onChange={(e) => {
              const copy = [...ingredients];
              copy[idx] = e.target.value;
              setIngredients(copy);
            }}
            placeholder={`Ingredient ${idx + 1}`}
          />
        ))}
        <button onClick={() => setIngredients([...ingredients, ''])}>+ Add Ingredient</button>

        <h4>Description</h4>
        {isPreview ? (
          <Markdown>{description}</Markdown>
        ) : (
          <MdEditor
            value={description}
            style={{ height: '300px' }}
            renderHTML={(text) => <Markdown>{text}</Markdown>}
            onChange={handleEditorChange}
          />
        )}
        <button onClick={() => setIsPreview(!isPreview)}>
          {isPreview ? 'Edit Mode' : 'Preview Mode'}
        </button>

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>

        {toast && <Toaster type={toast.type} message={toast.message} />}
      </div>
    </div>
  );
}
