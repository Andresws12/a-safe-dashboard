'use client';
import { Skeleton } from '@/components/UI/atoms/skeleton';
import CommonChart from '@/components/UI/organisms/common-pie-chart';
import { getCategoryDistribution } from '@/handlers/common/handleCommonChart';
import { usePost } from '~/hooks/usePost';


export default function OverviewPage() {
    const {
        postList: { data, status },
    } = usePost(undefined);

    // Handle loading state
    if (status === 'pending') {
        return (
            <div className="space-y-4">
                <Skeleton className="h-[300px] w-full" />
            </div>
        );
    }

    // Handle error state
    if (status === 'error') {
        return <div className="text-red-500">Error loading data</div>;
    }

    // Handle empty data state
    if (!data || data.pages.length === 0) {
        return <div className="text-gray-500">No data available</div>;
    }

    // Calculate total count of items
    const count = data.pages.reduce((total, page) => total + page.items.length, 0);

    // Parse data for chart
    const categoryData = getCategoryDistribution(data.pages);

    return (
        <div className="overview-container">
            <CommonChart title="Categories" data={categoryData} count={count} />
        </div>
    );
}
