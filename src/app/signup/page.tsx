"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { NextResponse } from "next/server";
import {
    SignupRequestType,
    SignupResponseType,
} from "../api/signup/_helpers/types";
import Link from "next/link";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const req: SignupRequestType = {
                username,
                email,
                password,
            };
            const response = await axios.post("/api/signup", req);
            const data: SignupResponseType = response.data;
            console.log(data);
        } catch (error: any) {
            console.log("Error:", error.response.data);
        }
    }

    return (
        <div className="h-screen justify-center items-center flex">
            <div className="flex flex-col items-center gap-5">
                <h1 className="text-2xl p-3">Signup Page</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 items-center"
                >
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        className="text-black p-1"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="text-black p-1"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="text-black p-1"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-700 w-20 rounded-full hover:bg-blue-800 active:bg-blue-900 mt-2"
                    >
                        Signup
                    </button>
                </form>
                <Link href={"/login"}>Go to login page</Link>
            </div>
        </div>
    );
}
