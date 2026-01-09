import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RoadmapTask } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch active roadmap
    const { data: roadmap } = await supabase
        .from('roadmaps')
        .select('*, roadmap_tasks(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    if (!roadmap) {
        redirect('/onboarding')
    }

    const tasks = (roadmap?.roadmap_tasks as RoadmapTask[]) || []
    const completedTasks = tasks.filter((t) => t.status === 'completed').length
    const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold">{roadmap.title}</h1>
                        <p className="text-zinc-400">Track your progress and complete daily tasks</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-zinc-500">Overall Progress</p>
                        <p className="text-2xl font-mono text-indigo-500">{Math.round(progress)}%</p>
                    </div>
                </header>

                <Progress value={progress} className="h-2 bg-zinc-900" />

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            Your Learning Path
                        </h2>
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <ScrollArea className="h-[600px] p-6">
                                <div className="space-y-6">
                                    {tasks.map((task) => (
                                        <div key={task.id} className="flex gap-4 group">
                                            <div className="pt-1">
                                                <Checkbox checked={task.status === 'completed'} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between">
                                                    <p className={`font-medium ${task.status === 'completed' ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                                                        {task.title}
                                                    </p>
                                                    <span className="text-xs text-zinc-500">{task.estimated_time_minutes}m</span>
                                                </div>
                                                <p className="text-sm text-zinc-500 line-clamp-2">{task.description}</p>
                                                {task.status === 'active' && (
                                                    <div className="mt-2 text-xs text-indigo-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                                                        Current Goal
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-wider text-zinc-500">AI Mentor Advice</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed text-zinc-300 italic">
                                    &quot;Focus on the fundamentals of {roadmap.title.split(' ')[0]}. Mastery is built on a solid foundation. You&apos;ve got this!&quot;
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-wider text-zinc-500">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Tasks Total</span>
                                    <span>{tasks.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Completed</span>
                                    <span>{completedTasks}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
