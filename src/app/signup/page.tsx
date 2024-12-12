"use client"

import UserType from "@/components/UserType";
import styles from "./signup.module.scss"
import { Form } from "react-router-dom";

const SignUp: React.FC = () => {

    return (
        <main>
            <form>
                <UserType/>
            </form>
        </main>
    );
}


export default SignUp;