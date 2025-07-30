import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  UserPlus,
  FileText,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  totalDepartments: number;
  openJobPostings: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    totalDepartments: 0,
    openJobPostings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample data for charts
  const departmentData = [
    { name: 'Engineering', employees: 45 },
    { name: 'Sales', employees: 32 },
    { name: 'Marketing', employees: 28 },
    { name: 'HR', employees: 12 },
    { name: 'Finance', employees: 18 },
  ];

  const leaveData = [
    { name: 'Approved', value: 65, color: '#10B981' },
    { name: 'Pending', value: 25, color: '#F59E0B' },
    { name: 'Rejected', value: 10, color: '#EF4444' },
  ];

  const recentActivities = [
    { id: 1, type: 'employee', action: 'New employee hired', name: 'John Doe', time: '2 hours ago' },
    { id: 2, type: 'leave', action: 'Leave request approved', name: 'Jane Smith', time: '4 hours ago' },
    { id: 3, type: 'payroll', action: 'Payroll processed', name: 'Finance Team', time: '1 day ago' },
    { id: 4, type: 'training', action: 'Training completed', name: 'Mike Johnson', time: '2 days ago' },
  ];

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
          <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your HR management dashboard
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.activeEmployees} active employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDepartments}</div>
            <p className="text-xs text-muted-foreground">
              Active departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openJobPostings}</div>
            <p className="text-xs text-muted-foreground">
              Job postings active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Present employees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Requests Status</CardTitle>
            <CardDescription>Current leave request distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leaveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common HR tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Users className="h-8 w-8 mb-2" />
              <span>Manage Employees</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Calendar className="h-8 w-8 mb-2" />
              <span>Attendance</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <DollarSign className="h-8 w-8 mb-2" />
              <span>Payroll</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <FileText className="h-8 w-8 mb-2" />
              <span>Leave Requests</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <TrendingUp className="h-8 w-8 mb-2" />
              <span>Performance</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <GraduationCap className="h-8 w-8 mb-2" />
              <span>Training</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Briefcase className="h-8 w-8 mb-2" />
              <span>Recruitment</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Building2 className="h-8 w-8 mb-2" />
              <span>Departments</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest HR system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Badge variant="secondary">
                    {activity.type === 'employee' && <Users className="h-3 w-3 mr-1" />}
                    {activity.type === 'leave' && <Calendar className="h-3 w-3 mr-1" />}
                    {activity.type === 'payroll' && <DollarSign className="h-3 w-3 mr-1" />}
                    {activity.type === 'training' && <GraduationCap className="h-3 w-3 mr-1" />}
                    {activity.type}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.name} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}