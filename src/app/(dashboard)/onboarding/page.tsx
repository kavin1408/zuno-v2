'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from 'lucide-react'

export default function OnboardingPage() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        subjects: [''],
        dailyTime: '1',
        targetDate: '',
        goal: 'job-ready',
        style: 'balanced'
    })
    const router = useRouter()
    const { toast } = useToast()

    const handleNext = () => setStep(s => s + 1)
    const handleBack = () => setStep(s => s - 1)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const filteredSubjects = formData.subjects.filter(s => s.trim() !== '')
            const res = await fetch('/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subjects: filteredSubjects,
                    full_name: formData.fullName,
                    daily_time_minutes: parseFloat(formData.dailyTime) * 60,
                    target_date: formData.targetDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    target_goal: formData.goal,
                    learning_style: formData.style
                })
            })

            if (!res.ok) throw new Error('Failed to save goals')
            router.push('/dashboard')
        } catch (error: unknown) {
            toast({
                variant: 'destructive',
                title: 'Onboarding Error',
                description: error instanceof Error ? error.message : 'An unknown error occurred'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-2xl space-y-8">
                <div className="space-y-2 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-500">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Let&apos;s build your path</h1>
                    <p className="text-zinc-400">Step {step} of 4</p>
                </div>

                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardContent className="pt-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-lg font-medium text-white">What should we call you?</Label>
                                    <Input
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        className="h-14 bg-zinc-950 border-zinc-800 text-xl"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-lg font-medium text-white">What do you want to master?</Label>
                                    <p className="text-sm text-zinc-400">Enter the subjects or skills you want to learn.</p>
                                    {formData.subjects.map((s, i) => (
                                        <Input
                                            key={i}
                                            placeholder="e.g. Python, Machine Learning..."
                                            value={s}
                                            onChange={e => {
                                                const newSubjects = [...formData.subjects]
                                                newSubjects[i] = e.target.value
                                                setFormData({ ...formData, subjects: newSubjects })
                                            }}
                                            className="h-12 bg-zinc-950 border-zinc-800"
                                        />
                                    ))}
                                    <Button variant="ghost" className="text-indigo-400" onClick={() => setFormData({ ...formData, subjects: [...formData.subjects, ''] })}>
                                        + Add another subject
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-lg font-medium text-white">Daily Commitment</Label>
                                    <RadioGroup value={formData.dailyTime} onValueChange={v => setFormData({ ...formData, dailyTime: v })} className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                                            <RadioGroupItem value="0.5" id="r1" />
                                            <Label htmlFor="r1">30 min/day</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                                            <RadioGroupItem value="1" id="r2" />
                                            <Label htmlFor="r2">1 hour/day</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                                            <RadioGroupItem value="2" id="r3" />
                                            <Label htmlFor="r3">2 hours/day</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                                            <RadioGroupItem value="4" id="r4" />
                                            <Label htmlFor="r4">4+ hours/day</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-lg font-medium text-white">Select your primary goal</Label>
                                    <RadioGroup value={formData.goal} onValueChange={v => setFormData({ ...formData, goal: v })} className="space-y-2">
                                        {['job-ready', 'certification', 'project-focused', 'exam-prep'].map(g => (
                                            <div key={g} className="flex items-center space-x-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4 capitalize">
                                                <RadioGroupItem value={g} id={g} />
                                                <Label htmlFor={g}>{g.replace('-', ' ')}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex justify-between pt-6 border-t border-zinc-800">
                            {step > 1 && (
                                <Button variant="ghost" onClick={handleBack} disabled={loading} className="text-zinc-400">
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                            )}
                            <div className="ml-auto flex gap-2">
                                {step < 4 ? (
                                    <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
                                        Continue
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button onClick={handleSubmit} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Analyze & Create Roadmap
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
