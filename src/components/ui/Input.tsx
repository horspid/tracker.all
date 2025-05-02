import { ChangeEventHandler, FunctionComponent, SVGProps } from "react";

interface InputProps {
  className?: string;
  placeholder?: string;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  type?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  Icon,
  placeholder,
  type,
  value,
  name,
  onChange,
}: InputProps) => {
  return (
    <div className="relative">
      <input
        type={type}
        className="w-400 pl-67 h-60 bg-lightdark rounded-2xl outline-none font-bold"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {Icon && (
        <Icon className="absolute left-20 top-1/2 transform -translate-y-1/2 translate-x-4" />
      )}
    </div>
  );
};

export default Input;
