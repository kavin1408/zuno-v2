export interface User {
    id: string;
    email: string;
    full_name?: string;
    created_at: string;
}

export interface Goal {
    id: number;
    user_id: string;
    subject: string;
    exam_or_skill: string;
    daily_time_minutes: number;
    target_date: string;
    detected_level?: string;
    target_goal?: string;
    learning_style?: string;
    created_at: string;
}

export interface Roadmap {
    id: number;
    user_id: string;
    goal_id: number;
    title: string;
    created_at: string;
}

export interface RoadmapTask {
    id: number;
    roadmap_id: number;
    phase: string;
    module: string;
    title: string;
    description?: string;
    estimated_time_minutes: number;
    status: 'pending' | 'active' | 'completed';
    order_index: number;
    output_deliverable?: string;
    scheduled_date?: string;
    completed_at?: string;
}

export interface DailyTask {
    id: number;
    user_id: string;
    roadmap_task_id?: number;
    title: string;
    description?: string;
    content_markdown?: string;
    status: 'pending' | 'completed';
    scheduled_date: string;
    completed_at?: string;
}
