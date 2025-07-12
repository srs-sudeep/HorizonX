import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/components';

export const YearlyBreakup = () => {
  return (
    <Card className="col-span-12 md:col-span-4">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Yearly Breakup</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="mb-4">
          <h3 className="text-3xl font-bold">$36,358</h3>
          <p className="flex items-center text-sm text-success-600">
            <span className="text-success-500 mr-1">+9% </span>
            <span className="text-muted-foreground">last year</span>
          </p>
        </div>

        <div className="mt-4 relative pt-6">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>2023</span>
            <span>2023</span>
          </div>
          <div className="relative h-24 w-24 mx-auto">
            {/* Circle background */}
            <div className="absolute inset-0 bg-muted-foreground rounded-full"></div>
            {/* Progress circle */}
            <div className="absolute inset-0 -rotate-90">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="text-background"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary"
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset="75"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium text-background">70%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Monthly Earnings</span>
              <span className="text-sm font-medium">$6,820</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Yearly Growth</span>
              <span className="text-sm font-medium">+9%</span>
            </div>
            <Progress value={9} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
