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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock as ClockIcon
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  status: string;
  notes: string;
}

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  useEffect(() => {
    fetchAttendanceRecords();
  }, [selectedDate, selectedEmployee]);

  const fetchAttendanceRecords = async () => {
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const response = await fetch(`/api/attendance?date=${dateStr}`);
      const data = await response.json();
      setAttendanceRecords(data);
    } catch (error) {
      console.error('Failed to fetch attendance records:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = attendanceRecords.filter(record =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      case 'half_day':
        return <Badge className="bg-orange-100 text-orange-800">Half Day</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleClockIn = async (employeeId: number) => {
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          date: format(selectedDate, 'yyyy-MM-dd'),
          clockIn: new Date().toISOString(),
          status: 'present',
        }),
      });
      
      if (response.ok) {
        fetchAttendanceRecords();
      }
    } catch (error) {
      console.error('Failed to clock in:', error);
    }
  };

  const handleClockOut = async (recordId: number) => {
    try {
      const response = await fetch(`/api/attendance/${recordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clockOut: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        fetchAttendanceRecords();
      }
    } catch (error) {
      console.error('Failed to clock out:', error);
    }
  };

  const attendanceStats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    total: attendanceRecords.length,
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
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track employee attendance and time records
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(selectedDate, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.present}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceStats.total > 0 ? Math.round((attendanceStats.present / attendanceStats.total) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.absent}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceStats.total > 0 ? Math.round((attendanceStats.absent / attendanceStats.total) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.late}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceStats.total > 0 ? Math.round((attendanceStats.late / attendanceStats.total) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Employees tracked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            Attendance for {format(selectedDate, 'PPP')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="font-medium">{record.employeeName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      {getStatusBadge(record.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.clockIn ? format(new Date(record.clockIn), 'HH:mm') : '-'}
                  </TableCell>
                  <TableCell>
                    {record.clockOut ? format(new Date(record.clockOut), 'HH:mm') : '-'}
                  </TableCell>
                  <TableCell>
                    {record.totalHours ? `${record.totalHours}h` : '-'}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {record.notes || '-'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {!record.clockIn && (
                        <Button
                          size="sm"
                          onClick={() => handleClockIn(record.employeeId)}
                        >
                          Clock In
                        </Button>
                      )}
                      {record.clockIn && !record.clockOut && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleClockOut(record.id)}
                        >
                          Clock Out
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common attendance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Clock className="h-8 w-8 mb-2" />
              <span>Bulk Clock In</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <CalendarIcon className="h-8 w-8 mb-2" />
              <span>Attendance Report</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Download className="h-8 w-8 mb-2" />
              <span>Export Records</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}