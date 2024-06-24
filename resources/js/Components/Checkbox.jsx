export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded  text-[#00dae8] shadow-sm focus:ring-[#00dae8] ' +
                className
            }
        />
    );
}
