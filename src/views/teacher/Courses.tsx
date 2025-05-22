import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Clock, Calendar, BookOpen } from 'lucide-react';

const Courses = () => {
  // Mock data for active courses
  const activeCourses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      grade: '10th Grade',
      students: 28,
      schedule: 'Mon, Wed, Fri • 9:00 AM',
      room: 'Room 101',
      progress: 65,
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      grade: '12th Grade',
      students: 32,
      schedule: 'Tue, Thu • 11:30 AM',
      room: 'Lab 3',
      progress: 48,
    },
    {
      id: 3,
      title: 'Computer Science',
      grade: '11th Grade',
      students: 24,
      schedule: 'Mon, Wed • 2:15 PM',
      room: 'Computer Lab',
      progress: 72,
    },
  ];

  // Mock data for upcoming courses
  const upcomingCourses = [
    {
      id: 4,
      title: 'Calculus',
      grade: '12th Grade',
      students: 0,
      schedule: 'Starting Sep 5, 2023',
      room: 'Room 205',
      progress: 0,
    },
    {
      id: 5,
      title: 'Programming with Python',
      grade: '10th Grade',
      students: 0,
      schedule: 'Starting Sep 7, 2023',
      room: 'Computer Lab',
      progress: 0,
    },
  ];

  // Mock data for archived courses
  const archivedCourses = [
    {
      id: 6,
      title: 'Algebra Fundamentals',
      grade: '9th Grade',
      students: 30,
      schedule: 'Completed May 15, 2023',
      room: 'Room 103',
      progress: 100,
    },
    {
      id: 7,
      title: 'Introduction to Programming',
      grade: '10th Grade',
      students: 26,
      schedule: 'Completed May 20, 2023',
      room: 'Computer Lab',
      progress: 100,
    },
  ];

  const renderCourseCards = (courses: any[]) => {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.grade}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{course.students} Students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{course.schedule}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{course.room}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Course</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          View Schedule
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {renderCourseCards(activeCourses)}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {renderCourseCards(upcomingCourses)}
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          {renderCourseCards(archivedCourses)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
