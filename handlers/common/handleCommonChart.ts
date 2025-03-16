const tailwindColors = [
  '#ef4444', // red-500
  '#3b82f6', // blue-500
  '#facc15', // yellow-400
  '#22c55e', // green-500
  '#a855f7', // purple-500
  '#ec4899', // pink-500
  '#f97316', // orange-500
  '#14b8a6', // teal-500
  '#64748b', // slate-500
  '#0ea5e9', // sky-500
  '#eab308', // amber-500
  '#10b981', // emerald-500
  '#7c3aed', // violet-500
  '#db2777', // rose-500
  '#f43f5e', // red-400
  '#6366f1', // indigo-500
  '#84cc16', // lime-500
  '#f59e0b', // amber-400
];

/**
 * Shuffles an array using Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 */
export const shuffleArray = () => {
  return [...tailwindColors].sort(() => Math.random() - 0.5);
};

/**
 * Generates chart data for a given dataset and colors.
 * @param data The data to be used in the chart.
 * @returns The chart data object.
 */
export const generatePieChartData = (
  data: { name: string; value: number }[],
) => {
  const shuffledColors = shuffleArray();
  return {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: shuffledColors,
      },
    ],
  };
};

/**
 * Generates chart data for a given dataset and colors.
 * @param {string[]} labels The labels to be used in the chart.
 * @param {number[]} data The data to be used in the chart.
 * @param {string} description The description of the chart.
 * @returns The chart data object.
 */
export const generateBarChartData = (
  labels: string[],
  data: number[],
  description: string,
) => {
  return {
    labels,
    datasets: [
      {
        label: description,
        data,
        backgroundColor: shuffleArray(),
        borderWidth: 1,
      },
    ],
  };
};

type Page = {
  items: Array<{ category: string; [key: string]: unknown }>;
};

type CategoryItem = {
  name: string;
  value: number;
};

export function getCategoryDistribution(pages: Page[]): CategoryItem[] {
  return pages
    .flatMap((page: Page) => page.items)
    .reduce((categories: CategoryItem[], item: { category: string }) => {
      const existingCategory = categories.find(
        (cat: CategoryItem) => cat.name === item.category,
      );

      if (existingCategory) {
        existingCategory.value += 1;
      } else {
        categories.push({ name: item.category, value: 1 });
      }

      return categories;
    }, []);
}
