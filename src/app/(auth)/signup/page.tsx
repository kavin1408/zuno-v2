import { AuthForm } from '@/components/auth/auth-form'

export const dynamic = 'force-dynamic'

export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
                    <p className="text-zinc-400">Join Zuno to start your learning journey</p>
                </div>
                <AuthForm type="signup" />
            </div>
        </div>
    )
}
