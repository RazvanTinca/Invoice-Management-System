import {z} from "zod";
import {useFormik} from "formik";
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {useLocation, useNavigate} from "react-router";
import Input from "../components/ui/Input.tsx";
import useAuthService from "../services/authService.tsx";
import {toast} from "react-toastify";

export default function Register() {
    const {register} = useAuthService();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const registerDetails = z.object({
        firstName: z.string().min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        repeatPassword: z.string().min(6, "Password must be at least 6 characters long")
    }).refine((data) => data.password === data.repeatPassword, {
        message: "Passwords don't match",
        path: ["repeatPassword"],
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: ''
        },
        validationSchema: toFormikValidationSchema(registerDetails),
        onSubmit: (values) => {
            console.log("Form submitted with values:", values);

            register(values).then(() => {
                navigate(from, {replace: true})
                toast.done("Successfully registered! You can now log in.")
            }).catch((error) => {
                toast.error("Registration failed. " + error.response?.data?.message || "Please try again.");
            })
        }
    });

    return (
        <div className={"flex flex-col w-full h-screen justify-center items-center bg-gray-900"}>
            <div className={"w-96 rounded-lg shadow-2xl overflow-hidden"}>
                <div className={"bg-blue-600 text-white text-xl font-semibold text-center py-4"}>
                    Register
                </div>

                <form onSubmit={formik.handleSubmit} className={"flex flex-col gap-4 p-6 bg-gray-800 rounded-b-lg"}>
                    <div className="flex gap-4">
                        <Input id={"firstName"} placeholder={"First Name"} formik={formik} type={"text"}></Input>
                        <Input id={"lastName"} placeholder={"Last Name"} formik={formik} type={"text"}></Input>
                    </div>
                    <Input id={"email"} placeholder={"Email"} formik={formik} type={"text"}></Input>
                    <Input id={"password"} placeholder={"Password"} formik={formik} type={"password"}></Input>
                    <Input id={"repeatPassword"} placeholder={"Repeat Password"} formik={formik} type={"password"}></Input>
                    
                    <button 
                        type="submit" 
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}