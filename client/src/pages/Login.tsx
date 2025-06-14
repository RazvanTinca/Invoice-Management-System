import useAuthService from "../services/authService.tsx";
import {z} from "zod"
import {useFormik} from "formik";
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {useLocation, useNavigate} from "react-router";
import Input from "../components/ui/Input.tsx";
import {toast} from "react-toastify";

export default function Login() {

    const {login} = useAuthService();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const loginDetails = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(3, "Password must be at least 3 characters long")
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: toFormikValidationSchema(loginDetails),
        onSubmit: (values) => {
            console.log("Form submitted with values:", values);
            login({email: values.email, password: values.password})
                .then(() => {
                    navigate(from, {replace: true})
                    toast.done("Successfully logged in!")
                })
                .catch((error) => {
                    toast.error("Login failed. " + error.response?.data?.message || "Please try again.");
                })

        }
    })


    return (
        <div className={"flex flex-col w-full h-screen justify-center items-center bg-gray-900"}>
            <div className={"w-96 rounded-lg shadow-2xl overflow-hidden"}>
                <div className={"bg-blue-600 text-white text-xl font-semibold text-center py-4"}>
                    Login
                </div>

                <form onSubmit={formik.handleSubmit} className={"flex flex-col gap-4 p-6 bg-gray-800 rounded-b-lg"}>
                    <Input id={"email"} placeholder={"Email"} formik={formik} type={"text"}></Input>
                    <Input id={"password"} placeholder={"Password"} formik={formik} type={"password"}></Input>
                    
                    <button 
                        type="submit" 
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}