import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, User, Calendar, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Courses = () => {
  // Mock data for current courses
  const currentCourses = [
    {
      id: 1,
      title: 'Mathematics',
      teacher: 'Dr. Smith',
      schedule: 'Mon, Wed, Fri • 9:00 AM',
      room: 'Room 101',
      progress: 75,
      grade: 'A-',
    },
    {
      id: 2,
      title: 'Physics',
      teacher: 'Prof. Johnson',
      schedule: 'Tue, Thu • 11:30 AM',
      room: 'Lab 3',
      progress: 60,
      grade: 'B+',
    },
    {
      id: 3,
      title: 'Literature',
      teacher: 'Ms. Davis',
      schedule: 'Mon, Wed • 2:15 PM',
      room: 'Room 205',
      progress: 85,
      grade: 'A',
    },
    {
      id: 4,
      title: 'Computer Science',
      teacher: 'Mr. Wilson',
      schedule: 'Tue, Thu • 1:00 PM',
      room: 'Computer Lab',
      progress: 90,
      grade: 'A+',
    },
  ];

  // Mock data for completed courses
  const completedCourses = [
    {
      id: 5,
      title: 'Biology',
      teacher: 'Dr. Martinez',
      schedule: 'Completed Dec 15, 2022',
      room: 'Lab 2',
      progress: 100,
      grade: 'B+',
    },
    {
      id: 6,
      title: 'History',
      teacher: 'Prof. Thompson',
      schedule: 'Completed Dec 20, 2022',
      room: 'Room 304',
      progress: 100,
      grade: 'A-',
    },
  ];

  const renderCourseCards = (courses: any[]) => {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>Current Grade: {course.grade}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{course.teacher}</span>
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

      <Tabs defaultValue="current">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-6">
          {renderCourseCards(currentCourses)}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {renderCourseCards(completedCourses)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
