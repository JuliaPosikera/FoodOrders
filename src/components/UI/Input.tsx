interface InputProps {
  label: string;
  id: string;
  type: string;
}

export default function Input({
  label,
  id,
  ...props
}: InputProps): JSX.Element {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
}
