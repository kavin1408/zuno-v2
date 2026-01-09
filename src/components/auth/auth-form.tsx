'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export function AuthForm({ type }: { type: 'login' | 'signup' }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (type === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.push('/dashboard')
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                toast({
                    title: "Account Created",
                    description: "Check your email for the confirmation link.",
                })
            }
        } catch (error: Error | any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : String(error),
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-zinc-950 border-zinc-800"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-zinc-950 border-zinc-800"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {type === 'login' ? 'Sign In' : 'Sign Up'}
                    </Button>

                    <div className="text-center text-sm">
                        <button
                            type="button"
                            onClick={() => router.push(type === 'login' ? '/signup' : '/login')}
                            className="text-indigo-400 hover:text-indigo-300"
                        >
                            {type === 'login'
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
