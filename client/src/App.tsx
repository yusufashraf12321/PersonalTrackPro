import { Switch, Route, Router } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
import Employees from "@/pages/employees";
import Attendance from "@/pages/attendance";
import Payroll from "@/pages/payroll";
import LeaveManagement from "@/pages/leave-management";
import PerformanceReviews from "@/pages/performance-reviews";
import Training from "@/pages/training";
import Recruitment from "@/pages/recruitment";
import Departments from "@/pages/departments";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/employees" component={Employees} />
      <Route path="/attendance" component={Attendance} />
      <Route path="/payroll" component={Payroll} />
      <Route path="/leave-management" component={LeaveManagement} />
      <Route path="/performance-reviews" component={PerformanceReviews} />
      <Route path="/training" component={Training} />
      <Route path="/recruitment" component={Recruitment} />
      <Route path="/departments" component={Departments} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
