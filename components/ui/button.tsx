interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
  }
  
  export function Button({
    variant = 'default',
    size = 'md',
    ...props
  }: ButtonProps) {
    return (
      <button
        className={`button ${variant} ${size}`}
        {...props}
      />
    )
  }