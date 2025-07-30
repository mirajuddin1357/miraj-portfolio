import { useQuery } from '@tanstack/react-query';

interface VisitorStats {
  totalVisitors: number;
  totalPageViews: number;
}

export function VisitorCounter() {
  const { data: stats } = useQuery<VisitorStats>({
    queryKey: ['/api/visitor-stats'],
    refetchInterval: 60000, // Refresh every minute
  });

  if (!stats) return null;

  return (
    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
      <div className="flex items-center gap-1">
        <i className="fas fa-users text-blue-500"></i>
        <span>{stats.totalVisitors.toLocaleString()} visitors</span>
      </div>
      <div className="flex items-center gap-1">
        <i className="fas fa-eye text-green-500"></i>
        <span>{stats.totalPageViews.toLocaleString()} views</span>
      </div>
    </div>
  );
}