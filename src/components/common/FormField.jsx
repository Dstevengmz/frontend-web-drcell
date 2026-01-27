import './FormField.css';

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  placeholder,
  rows,
  options,
  error
}) => {
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows || 4}
          placeholder={placeholder}
          required={required}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          {options?.map((opt, idx) => (
            <option key={idx} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={type === 'number' ? 0 : undefined}
        step={type === 'number' ? '0.01' : undefined}
      />
    );
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && '*'}
      </label>
      {renderInput()}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default FormField;
