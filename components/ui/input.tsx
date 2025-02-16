interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
  }
  
  export function Input({ label, error, ...props }: InputProps) {
    return (
      <div>
        {label && <label>{label}</label>}
        <input className="input" {...props} />
        {error && <span className="error">{error}</span>}
      </div>
    )
  }