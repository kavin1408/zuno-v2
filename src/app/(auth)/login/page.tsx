import { AuthForm } from '@/components/auth/auth-form'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
                    <p className="text-zinc-400">Enter your credentials to access your roadmap</p>
                </div>
                <AuthForm type="login" />
            </div>
        </div>
    )
}
