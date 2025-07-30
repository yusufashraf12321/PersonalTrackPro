import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  GraduationCap, 
  Users, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Plus
} from "lucide-react";

interface TrainingProgram {
  id: number;
  title: string;
  description: string;
  duration: string;
  cost: number;
  isMandatory: boolean;
  isActive: boolean;
}

interface EmployeeTraining {
  id: number;
  employeeName: string;
  programTitle: string;
  enrollmentDate: string;
  completionDate: string;
  status: string;
  score: number;
}

export default function Training() {
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([]);
  const [employeeTraining, setEmployeeTraining] = useState<EmployeeTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const fetchTrainingData = async () => {
    try {
      const [programsResponse, trainingResponse] = await Promise.all([
        fetch('/api/training-programs'),
        fetch('/api/employee-training')
      ]);
      
      const programsData = await programsResponse.json();
      const trainingData = await trainingResponse.json();
      
      setTrainingPrograms(programsData);
      setEmployeeTraining(trainingData);
    } catch (error) {
      console.error('Failed to fetch training data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = trainingPrograms.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'enrolled':
        return <Badge className="bg-yellow-100 text-yellow-800">Enrolled</Badge>;
      case 'dropped':
        return <Badge className="bg-red-100 text-red-800">Dropped</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const trainingStats = {
    totalPrograms: trainingPrograms.length,
    activePrograms: trainingPrograms.filter(p => p.isActive).length,
    totalEnrollments: employeeTraining.length,
    completedTraining: employeeTraining.filter(t => t.status === 'completed').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training</h1>
          <p className="text-muted-foreground">
            Manage employee training programs and enrollments
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Program
        </Button>
      </div>

      {/* Training Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingStats.totalPrograms}</div>
            <p className="text-xs text-muted-foreground">
              Training programs available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingStats.activePrograms}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingStats.totalEnrollments}</div>
            <p className="text-xs text-muted-foreground">
              Employee enrollments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingStats.completedTraining}</div>
            <p className="text-xs text-muted-foreground">
              Completed training
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Training Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>
            Available training programs for employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="text-sm font-medium">{program.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cost:</span>
                      <span className="text-sm font-medium">${program.cost}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {program.isMandatory && (
                        <Badge className="bg-red-100 text-red-800">Mandatory</Badge>
                      )}
                      {program.isActive ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employee Training Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Training</CardTitle>
          <CardDescription>
            Employee training progress and enrollments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead>Completion Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeTraining.map((training) => (
                <TableRow key={training.id}>
                  <TableCell>
                    <div className="font-medium">{training.employeeName}</div>
                  </TableCell>
                  <TableCell>{training.programTitle}</TableCell>
                  <TableCell>{new Date(training.enrollmentDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {training.completionDate ? new Date(training.completionDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>{getStatusBadge(training.status)}</TableCell>
                  <TableCell>
                    {training.score ? `${training.score}%` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      {training.status === 'enrolled' && (
                        <Button size="sm">
                          Start
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}