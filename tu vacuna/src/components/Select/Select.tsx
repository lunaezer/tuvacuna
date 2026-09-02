export type SelectVariant = "large" | "small";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    variant: SelectVariant;
    label: string;
    name: string;
    value: string;
    options: Option[];
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    placeholder?: string;
    required?: boolean;
}

function Select({ variant, label, name, value, options, onChange, placeholder = "Selecciona", required }: SelectProps) {
    return (
        <label className="input-label">
            {label}
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`input input--${variant}`.trim()}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </label>
    );
}

export default Select