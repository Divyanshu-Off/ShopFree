import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Search,
  User,
  MapPin,
  Wind,
  Wallet,
  Sparkles
} from 'lucide-react';
import './Form.css';

const ProductInquiryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    category: '',
    age: '',
    city: '',
    climate: 'Humid',
    budget: '',
    additionalInfo: { notes: '' }
  });

  const updateFormData = (key, value) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="form-step-container"
    >
      <div className="form-header">
        <h2 className="form-title">What are you looking for?</h2>
        <p className="form-subtitle">
          Type any product, category, or specific item you need advice on.
        </p>
      </div>

      <div className="input-grid" style={{ marginTop: '2rem' }}>
        {/* Product / Keyword */}
        <div className="input-group input-full">
          <label className="input-label">
            <Search width={16} height={16} /> Product / Keyword
          </label>
          <input
            type="text"
            placeholder="e.g., Mechanical keyboard, Running shoes, Noise‑cancelling headphones"
            className="form-input"
            style={{ fontSize: '1.1rem', padding: '1rem' }}
            value={formData.category}
            onChange={e => updateFormData('category', e.target.value)}
            autoFocus
          />
        </div>

        {/* Age */}
        <div className="input-group">
          <label className="input-label">
            <User width={16} height={16} /> Age
          </label>
          <input
            type="number"
            placeholder="e.g. 25"
            className="form-input"
            value={formData.age}
            onChange={e => updateFormData('age', e.target.value)}
          />
        </div>

        {/* City */}
        <div className="input-group">
          <label className="input-label">
            <MapPin width={16} height={16} /> City
          </label>
          <input
            type="text"
            placeholder="e.g. London"
            className="form-input"
            value={formData.city}
            onChange={e => updateFormData('city', e.target.value)}
          />
        </div>

        {/* Climate */}
        <div className="input-group">
          <label className="input-label">
            <Wind width={16} height={16} /> Climate
          </label>
          <select
            className="form-input"
            value={formData.climate}
            onChange={e => updateFormData('climate', e.target.value)}
          >
            <option value="Humid">Humid / Hot</option>
            <option value="Dry">Dry / Arid</option>
            <option value="Cold">Cold / Alpine</option>
            <option value="Temperate">Temperate</option>
          </select>
        </div>

        {/* Budget */}
        <div className="input-group">
          <label className="input-label">
            <Wallet width={16} height={16} /> Budget (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. $50‑$100"
            className="form-input"
            value={formData.budget}
            onChange={e => updateFormData('budget', e.target.value)}
          />
        </div>

        {/* Extra notes */}
        <div className="input-group input-full">
          <label className="input-label">
            <Sparkles width={16} height={16} /> Anything else?
          </label>
          <textarea
            placeholder="e.g. Prefer lightweight, need good battery life, avoid certain brands…"
            className="form-input"
            rows="3"
            value={formData.additionalInfo.notes}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                additionalInfo: { ...prev.additionalInfo, notes: e.target.value }
              }))
            }
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>

      <div className="form-actions" style={{ marginTop: '2rem' }}>
        <button
          onClick={handleSubmit}
          disabled={!formData.category.trim()}
          className="btn-action"
        >
          Continue <ArrowRight width={20} height={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductInquiryForm;
