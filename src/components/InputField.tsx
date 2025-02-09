
interface InputFieldProps {
    label : string,
    name : string;
    value : string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder : string

}


const InputField : React.FC<InputFieldProps> = ({ label, name, value, onChange, placeholder }) => (
    <section className="flex flex-col pb-4">
      <label htmlFor={name} className="pb-1">
        <span className="font-bold">{label}</span>
      </label>
      <input
        className="form-control w-[75%] outline-none border-b pb-1"
        type="text"
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </section>
  );
  
  export default InputField;
  