import { Card, CardContent, CardHeader, CardTitle, Button, Progress } from '@/components';
import { BookOpen, Calendar, Clock, FileText } from 'lucide-react';

const AcademicsDashboard = () => {
  // Mock data for courses
  const courses = [
    {
      id: 1,
      name: 'Mathematics',
      progress: 75,
      teacher: 'Dr. Smith',
      nextClass: 'Tomorrow, 9:00 AM',
    },
    { id: 2, name: 'Physics', progress: 60, teacher: 'Prof. Johnson', nextClass: 'Today, 2:30 PM' },
    {
      id: 3,
      name: 'Literature',
      progress: 85,
      teacher: 'Ms. Davis',
      nextClass: 'Wednesday, 11:15 AM',
    },
    {
      id: 4,
      name: 'Computer Science',
      progress: 90,
      teacher: 'Mr. Wilson',
      nextClass: 'Thursday, 1:00 PM',
    },
  ];

  // Mock data for upcoming assignments
  const assignments = [
    { id: 1, title: 'Math Problem Set', course: 'Mathematics', dueDate: 'May 15, 2023' },
    { id: 2, title: 'Physics Lab Report', course: 'Physics', dueDate: 'May 18, 2023' },
    { id: 3, title: 'Essay on Shakespeare', course: 'Literature', dueDate: 'May 20, 2023' },
  ];

  return (
    <div className="mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Academic Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next class in 30 minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{course.name}</h3>
                    <span className="text-sm">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{course.teacher}</span>
                    <span>{course.nextClass}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map(assignment => (
                <div key={assignment.id} className="border-l-4 border-primary pl-4 py-2">
                  <h3 className="font-medium">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Due: {assignment.dueDate}</span>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicsDashboard;
