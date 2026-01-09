import { createClient } from '@/lib/supabase/server'
import { ai } from '@/lib/ai/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const supabase = createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await req.json()
    const {
        subjects,
        full_name,
        daily_time_minutes,
        target_date,
        target_goal,
        learning_style
    } = payload

    // Update user profile if full_name is provided
    if (full_name) {
        await supabase
            .from('users')
            .update({ full_name })
            .eq('id', user.id)
    }

    const responses = []

    for (const subject of subjects) {
        // 1. Detect level (simplified for now, usually we'd call AI)
        // For production-grade, we assume we use the AI service
        const aiResponse = await ai.call([
            { role: "system", content: "Analyze the student's background and detect their level (Beginner, Intermediate, Advanced) and provide a welcome message. Respond IN JSON: { \"level\": \"...\", \"message\": \"...\" }" },
            { role: "user", content: `Subject: ${subject}, Daily: ${daily_time_minutes} min, Goal: ${target_goal}` }
        ])

        let detected_level = "Beginner"
        let message = "Welcome to Zuno"

        if (aiResponse) {
            try {
                const data = JSON.parse(aiResponse)
                detected_level = data.level || detected_level
                message = data.message || message
            } catch (e) { }
        }

        // 2. Save Goal
        const { data: goal, error: goalError } = await supabase
            .from('goals')
            .insert({
                user_id: user.id,
                subject,
                exam_or_skill: "General Mastery",
                daily_time_minutes,
                target_date,
                detected_level,
                target_goal,
                learning_style
            })
            .select()
            .single()

        if (goalError) {
            console.error("Goal Error:", goalError)
            continue
        }

        // 3. Generate Roadmap
        const roadmapData = await ai.generateRoadmap({
            subject,
            level: detected_level,
            goal: target_goal,
            dailyTimeMin: daily_time_minutes,
            targetDate: target_date,
            style: learning_style
        })

        if (roadmapData) {
            const { data: roadmap, error: roadmapError } = await supabase
                .from('roadmaps')
                .insert({
                    user_id: user.id,
                    goal_id: goal.id,
                    title: roadmapData.title || `${subject} Roadmap`
                })
                .select()
                .single()

            if (!roadmapError && roadmap) {
                // Insert tasks
                const tasksToInsert = []
                let order = 0
                for (const phase of roadmapData.phases || []) {
                    for (const module of phase.modules || []) {
                        for (const task of module.tasks || []) {
                            tasksToInsert.push({
                                roadmap_id: roadmap.id,
                                phase: phase.name,
                                module: module.name,
                                title: task.title,
                                description: task.description,
                                estimated_time_minutes: task.estimated_time,
                                output_deliverable: task.output_deliverable,
                                status: order === 0 ? 'active' : 'pending',
                                order_index: order,
                                scheduled_date: order === 0 ? new Date().toISOString().split('T')[0] : null
                            })
                            order++
                        }
                    }
                }

                if (tasksToInsert.length > 0) {
                    await supabase.from('roadmap_tasks').insert(tasksToInsert)
                }
            }
        }

        responses.push({ subject, detected_level, message })
    }

    return NextResponse.json({ success: true, results: responses })
}
