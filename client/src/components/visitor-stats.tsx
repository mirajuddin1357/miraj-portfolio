import { useQuery } from '@tanstack/react-query';

interface VisitorStats {
  totalVisitors: number;
  totalPageViews: number;
  recentVisitors: Array<{
    id: number;
    country?: string;
    city?: string;
    visitCount: number;
    lastVisit: string;
  }>;
}

export function VisitorStats() {
  const { data: stats, isLoading } = useQuery<VisitorStats>({
    queryKey: ['/api/visitor-stats'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-32 mb-2"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-24"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-lg p-6 border border-white/20 dark:border-gray-800/20">
      <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
        <i className="fas fa-chart-bar mr-2"></i>
        Website Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.totalVisitors.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total Visitors
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.totalPageViews.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Page Views
          </div>
        </div>
      </div>

      {stats.recentVisitors.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            Recent Visitors
          </h4>
          <div className="space-y-1">
            {stats.recentVisitors.slice(0, 3).map((visitor) => (
              <div key={visitor.id} className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                <span>
                  {visitor.country || 'Unknown'} {visitor.city ? `(${visitor.city})` : ''}
                </span>
                <span>{visitor.visitCount} visits</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}