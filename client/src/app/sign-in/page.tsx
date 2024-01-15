'use client'
import {useEffect, useState} from "react";
import {useUserState} from "@/state/user";
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const firstName = useUserState(s => s.firstName)

    const {signIn} = useUserState();

    useEffect(() => {
        if (firstName) {
            router.push('/');
        }
    }, [router]);

    const handleSignIn = (id: string, firstName: string, role: string, token: string) => {
        signIn(id, firstName, role, token);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8000/auth/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        console.log(response);

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        const {token, user: {id, firstName, role}} = data;

        handleSignIn(id, firstName, role, token);

        console.log('Login successful', data);

        await router.push('/');
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 m-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn
