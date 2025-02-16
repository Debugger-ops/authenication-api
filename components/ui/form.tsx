interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode
  }
  
  export function Form({ children, ...props }: FormProps) {
    return (
      <form className="form" {...props}>
        {children}
      </form>
    )
  }