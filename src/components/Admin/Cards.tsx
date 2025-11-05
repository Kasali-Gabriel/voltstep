import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { TrendingDown, TrendingUp } from 'lucide-react';

type KpiCardProps = {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  subtext?: string;
  color?: string;
};

export const KpiCard = ({
  title,
  value,
  change,
  icon,
  subtext = 'Last month',
  color = 'teal',
}: KpiCardProps) => {
  const isUp = (change ?? 0) >= 0;

  // dynamically build gradient classes
  const gradient = `from-${color}-500 to-${color}-600`;

  return (
    <Card
      className={`relative overflow-hidden rounded-2xl border-0 bg-gradient-to-r text-white shadow-lg ${gradient} `}
    >
      {/* radial highlight */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
      {/* glossy border + bevel */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.25)]" />

      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium opacity-95">
          {title}
        </CardTitle>
        <div className="opacity-90">{icon}</div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="text-3xl font-bold tracking-tight">{value}</div>

        {/* horizontal separator */}
        <div className="my-2 h-px w-full bg-white/25" />

        <div className="flex items-center justify-between text-xs">
          {typeof change === 'number' ? (
            <div className="flex items-center">
              {isUp ? (
                <TrendingUp className="mr-1 h-3 w-3 text-emerald-200" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-rose-200" />
              )}
              <span className={isUp ? 'text-emerald-100' : 'text-rose-100'}>
                {isUp ? `+${Math.abs(change)}` : `-${Math.abs(change)}`}%
              </span>
            </div>
          ) : null}

          <span className="text-[11px] opacity-85">{subtext}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const ChartCard = ({
  title,
  children,
  fullWidth,
}: {
  title: string;
  children: React.ReactElement;
  fullWidth?: boolean;
}) => {
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: '#2563eb',
    },
    mobile: {
      label: 'Mobile',
      color: '#60a5fa',
    },
  } satisfies ChartConfig;

  return (
    <Card className={`h-fit ${fullWidth ? 'lg:col-span-2' : ''}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="pl-0 md:pl-0">
        <ChartContainer config={chartConfig} className="h-auto w-full">
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
