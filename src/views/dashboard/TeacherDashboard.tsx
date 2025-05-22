import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Calendar, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const TeacherDashboard = () => {
  // Mock data for upcoming classes
  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', grade: '10th Grade', time: '09:00 AM', room: 'Room 101' },
    { id: 2, subject: 'Physics', grade: '12th Grade', time: '11:30 AM', room: 'Lab 3' },
    {
      id: 3,
      subject: 'Computer Science',
      grade: '11th Grade',
      time: '02:15 PM',
      room: 'Computer Lab',
    },
  ];

  // Mock data for assignments
  const pendingAssignments = [
    { id: 1, title: 'Algebra Quiz', dueDate: 'May 15, 2023', submissions: 18, totalStudents: 25 },
    {
      id: 2,
      title: 'Physics Lab Report',
      dueDate: 'May 18, 2023',
      submissions: 12,
      totalStudents: 30,
    },
    {
      id: 3,
      title: 'Programming Project',
      dueDate: 'May 22, 2023',
      submissions: 5,
      totalStudents: 22,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Across 5 classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 active, 2 upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next class in 45 minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 due this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map(cls => (
                <div key={cls.id} className="flex items-start border-l-4 border-primary pl-4 py-2">
                  <div className="flex-1">
                    <h3 className="font-medium">{cls.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cls.grade} • {cls.room}
                    </p>
                    <p className="text-sm font-medium mt-1">{cls.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Assignment Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingAssignments.map(assignment => (
                <div key={assignment.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{assignment.title}</h3>
                    <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Submissions</span>
                      <span>
                        {assignment.submissions}/{assignment.totalStudents}
                      </span>
                    </div>
                    <Progress value={(assignment.submissions / assignment.totalStudents) * 100} />
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

export default TeacherDashboard;
