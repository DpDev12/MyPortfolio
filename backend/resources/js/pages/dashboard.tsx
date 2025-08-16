import { Card } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { SidebarInset, SidebarInsetContent, SidebarInsetHeader } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


interface Project {
    id: number;
    title: string;
    body: string;
    status: string;
    image?: string;
    start_date?: string;
    end_date?: string;
    created_at: string;
    updated_at: string;
}


interface Activity {
    id: number;
    description: string;
    user: string;
    timestamp: string;
    type: 'project' | 'report' | 'settings' | 'user';
}


interface Props {
    projects?: {
        data: Project[];
        recentActivities?: Activity[];
        userCount?: number;
        reportCount?: number;
        logCount?: number;
    };
}


export default function Dashboard({ projects, recentActivities, userCount, reportCount,logCount }: Props) {

    const defaultActivities: Activity[] = [
        {
            id: 1,
            description: "Updated project 'Website Redesign'",
            user: "John Doe",
            timestamp: "2 hours ago",
            type: "project"
        },
        {
            id: 2,
            description: "Generated monthly report",
            user: "Admin",
            timestamp: "4 hours ago",
            type: "report"
        },
        {
            id: 3,
            description: "Updated system settings",
            user: "System",
            timestamp: "1 day ago",
            type: "settings"
        },
        {
            id: 4,
            description: "New user registered",
            user: "Jane Smith",
            timestamp: "2 days ago",
            type: "user"
        }
    ];

    const activities = recentActivities || defaultActivities;

    const getActivityIcon = (type: Activity['type']) => {
        switch (type){
           case 'project':
                return '📁';
            case 'report':
                return '📊';
            case 'settings':
                return '⚙️';
            case 'user':
                return '👤';
            default:
                return '📋';
        }
    };

    const getActivityColor = (type: Activity['type']) => {
        switch (type) {
            case 'project':
                return 'text-blue-600 dark:text-blue-400';
            case 'report':
                return 'text-green-600 dark:text-green-400';
            case 'settings':
                return 'text-orange-600 dark:text-orange-400';
            case 'user':
                return 'text-purple-600 dark:text-purple-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <SidebarInset>
                <SidebarInsetContent>
                    <div className="flex flex-col gap-6 min-h-full py-4">
                        {/* Stats Cards - Fixed at top */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
                            <Card 
                                title="Users" 
                                value={userCount?.toString() || "0"} 
                            />
                            <Card 
                                title="Projects" 
                                value={projects?.data.length?.toString() || "0"} 
                            />
                            <Card 
                                title="Reports" 
                                value={reportCount?.toString() || "0"} 
                            />
                            <Card 
                                title="Logs" 
                                value={logCount?.toString() || "0"} 
                            />
                        </div>
                        
                        {/* Recent Activities - Takes remaining space */}
                        <div className="flex-1">
                            <div className="h-full min-h-[400px] rounded-xl border border-border bg-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Recent Activities</h2>
                                    <span className="text-sm text-muted-foreground">Last 7 days</span>
                                </div>
                                
                                <div className="h-[calc(100%-4rem)] overflow-auto">
                                    {activities.length > 0 ? (
                                        <div className="space-y-3">
                                            {activities.map((activity) => (
                                                <div 
                                                    key={activity.id}
                                                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                                >
                                                    <div className="flex-shrink-0 text-lg">
                                                        {getActivityIcon(activity.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium">
                                                            <span className={getActivityColor(activity.type)}>
                                                                {activity.user}
                                                            </span>
                                                            {' '}
                                                            {activity.description}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {activity.timestamp}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                            <div className="text-4xl mb-2">📋</div>
                                            <p className="text-sm">No recent activities</p>
                                        </div>
                                    )}
                                </div>
                                
                                {activities.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-border text-center">
                                        <button className="text-sm text-primary hover:text-primary/80 font-medium">
                                            View all activities →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </SidebarInsetContent>
            </SidebarInset>
        </AppLayout>
    );
}
