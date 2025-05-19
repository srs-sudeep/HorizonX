import { Book, Users, Clock, ArrowLeft } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const LibrarianDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Librarian Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Books"
          value="12,846"
          icon={<Book className="h-5 w-5 text-blue-500" />}
          iconColor="bg-blue-100"
        />
        <StatCard
          title="Active Borrowers"
          value="348"
          icon={<Users className="h-5 w-5 text-yellow-500" />}
          iconColor="bg-yellow-100"
        />
        <StatCard
          title="Overdue Returns"
          value="28"
          icon={<Clock className="h-5 w-5 text-red-500" />}
          iconColor="bg-red-100"
        />
        <StatCard
          title="Returns Today"
          value="42"
          icon={<ArrowLeft className="h-5 w-5 text-green-500" />}
          iconColor="bg-green-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-medium mb-4">Recent Borrowings</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center p-3 bg-background rounded-md border">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <Book className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Advanced Biology Textbook</h3>
                  <p className="text-sm text-muted-foreground">
                    Borrowed by Student {i + 10}, {i + 1} hr(s) ago
                  </p>
                </div>
                <div className="ml-auto text-xs">
                  <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded-full">
                    Due in {(i + 1) * 7} days
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-medium mb-4">Overdue Returns</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center p-3 bg-background rounded-md border">
                <div className="bg-red-100 p-2 rounded mr-3">
                  <Clock className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium">Physics Vol. {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    Student {i + 5}, overdue by {(i + 1) * 2} day(s)
                  </p>
                </div>
                <div className="ml-auto text-xs">
                  <span className="bg-red-100 text-red-700 py-1 px-2 rounded-full">
                    Action needed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
