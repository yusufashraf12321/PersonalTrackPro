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
  Briefcase, 
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

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  status: string;
  postedDate: string;
  closingDate: string;
}

interface JobApplication {
  id: number;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  appliedDate: string;
}

export default function Recruitment() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRecruitmentData();
  }, []);

  const fetchRecruitmentData = async () => {
    try {
      const [postingsResponse, applicationsResponse] = await Promise.all([
        fetch('/api/job-postings'),
        fetch('/api/job-applications')
      ]);
      
      const postingsData = await postingsResponse.json();
      const applicationsData = await applicationsResponse.json();
      
      setJobPostings(postingsData);
      setApplications(applicationsData);
    } catch (error) {
      console.error('Failed to fetch recruitment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPostings = jobPostings.filter(posting =>
    posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    posting.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800">Open</Badge>;
      case 'closed':
        return <Badge className="bg-red-100 text-red-800">Closed</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case 'applied':
        return <Badge className="bg-blue-100 text-blue-800">Applied</Badge>;
      case 'reviewing':
        return <Badge className="bg-yellow-100 text-yellow-800">Reviewing</Badge>;
      case 'shortlisted':
        return <Badge className="bg-green-100 text-green-800">Shortlisted</Badge>;
      case 'interviewed':
        return <Badge className="bg-purple-100 text-purple-800">Interviewed</Badge>;
      case 'offered':
        return <Badge className="bg-green-100 text-green-800">Offered</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const recruitmentStats = {
    totalPostings: jobPostings.length,
    openPostings: jobPostings.filter(p => p.status === 'open').length,
    totalApplications: applications.length,
    newApplications: applications.filter(a => a.status === 'applied').length,
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
          <h1 className="text-3xl font-bold tracking-tight">Recruitment</h1>
          <p className="text-muted-foreground">
            Manage job postings and candidate applications
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Job Posting
        </Button>
      </div>

      {/* Recruitment Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Postings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recruitmentStats.totalPostings}</div>
            <p className="text-xs text-muted-foreground">
              Job postings created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recruitmentStats.openPostings}</div>
            <p className="text-xs text-muted-foreground">
              Currently accepting applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recruitmentStats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              Candidate applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Applications</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recruitmentStats.newApplications}</div>
            <p className="text-xs text-muted-foreground">
              Require review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Job Postings */}
      <Card>
        <CardHeader>
          <CardTitle>Job Postings</CardTitle>
          <CardDescription>
            Active job postings and positions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Closing Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPostings.map((posting) => (
                <TableRow key={posting.id}>
                  <TableCell>
                    <div className="font-medium">{posting.title}</div>
                  </TableCell>
                  <TableCell>{posting.department}</TableCell>
                  <TableCell>{posting.location}</TableCell>
                  <TableCell>{posting.type}</TableCell>
                  <TableCell>{getStatusBadge(posting.status)}</TableCell>
                  <TableCell>{new Date(posting.postedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {posting.closingDate ? new Date(posting.closingDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>
            Candidate applications and hiring pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div className="font-medium">
                      {application.firstName} {application.lastName}
                    </div>
                  </TableCell>
                  <TableCell>{application.jobTitle}</TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>{getApplicationStatusBadge(application.status)}</TableCell>
                  <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      {application.status === 'applied' && (
                        <Button size="sm">
                          Review
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