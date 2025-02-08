interface LabelProps {
  classNameProps?: string;  
  labelText: string;  
  value: string;  
}

export default function Label({ classNameProps, labelText, value }: LabelProps) {
  return (
    <div className={classNameProps}>
      <label>{labelText}</label>
      <p>{value}</p>
    </div>
  );
}
