import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Assignments = () => {
  // Mock data for pending assignments
  const pendingAssignments = [
    {
      id: 1,
      title: 'Math Problem Set',
      course: 'Mathematics',
      dueDate: 'May 15, 2023',
      status: 'Not Started',
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      course: 'Physics',
      dueDate: 'May 18, 2023',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Essay on Shakespeare',
      course: 'Literature',
      dueDate: 'May 20, 2023',
      status: 'Not Started',
    },
    {
      id: 4,
      title: 'Programming Project',
      course: 'Computer Science',
      dueDate: 'May 25, 2023',
      status: 'In Progress',
    },
  ];

  // Mock data for completed assignments
  const completedAssignments = [
    {
      id: 5,
      title: 'Algebra Quiz',
      course: 'Mathematics',
      submittedDate: 'May 5, 2023',
      grade: 'A',
    },
    {
      id: 6,
      title: 'Chemistry Lab Report',
      course: 'Chemistry',
      submittedDate: 'May 8, 2023',
      grade: 'B+',
    },
    {
      id: 7,
      title: 'History Essay',
      course: 'History',
      submittedDate: 'May 10, 2023',
      grade: 'A-',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Not Started':
        return <Badge variant="outline">Not Started</Badge>;
      case 'In Progress':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getGradeBadge = (grade: string) => {
    if (grade.startsWith('A')) {
      return <Badge className="bg-green-500">{grade}</Badge>;
    } else if (grade.startsWith('B')) {
      return <Badge className="bg-blue-500">{grade}</Badge>;
    } else if (grade.startsWith('C')) {
      return <Badge className="bg-yellow-500">{grade}</Badge>;
    } else {
      return <Badge className="bg-red-500">{grade}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assignments</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search assignments..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAssignments.map(assignment => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedAssignments.map(assignment => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{assignment.submittedDate}</TableCell>
                      <TableCell>{getGradeBadge(assignment.grade)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assignments;
