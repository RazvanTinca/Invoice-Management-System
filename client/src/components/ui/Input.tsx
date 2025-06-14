export type InputProps = {
    id: string;
    placeholder: string;
    type?: string;
    className?: string;
    formik?: any;
}

export default function Input({id, type, placeholder, className, formik}: InputProps) {
    return (
        <>
            <div className="relative my-2">
                <input
                    className={`block px-2.5 pb-2.5 pt-4 w-full bg-gray-700 rounded-lg border-0 appearance-none text-gray-200 outline-none focus:ring-1 focus:ring-blue-500 peer ${className}`}
                    placeholder={" "}
                    type={type}
                    id={id}
                    name={id}
                    {...formik.getFieldProps(id)}
                />
                <label htmlFor={id}
                       className={"rounded-lg absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"}>{placeholder}</label>

                {formik.touched[id] && formik.errors[id] && <div className="text-red-500 text-xs absolute mt-1">{formik.errors[id]}</div>}
            </div>
        </>
    )
}