import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Employee Management API routes
  app.get("/api/employees", async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  app.get("/api/employees/:id", async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      
      const employee = await storage.getEmployeeById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employee" });
    }
  });

  app.post("/api/employees", async (req, res) => {
    try {
      const employee = await storage.createEmployee(req.body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ message: "Failed to create employee" });
    }
  });

  app.put("/api/employees/:id", async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      
      const employee = await storage.updateEmployee(employeeId, req.body);
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Failed to update employee" });
    }
  });

  app.delete("/api/employees/:id", async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      
      await storage.deleteEmployee(employeeId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete employee" });
    }
  });

  // Department Management API routes
  app.get("/api/departments", async (req, res) => {
    try {
      const departments = await storage.getAllDepartments();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch departments" });
    }
  });

  app.post("/api/departments", async (req, res) => {
    try {
      const department = await storage.createDepartment(req.body);
      res.status(201).json(department);
    } catch (error) {
      res.status(500).json({ message: "Failed to create department" });
    }
  });

  // Position Management API routes
  app.get("/api/positions", async (req, res) => {
    try {
      const positions = await storage.getAllPositions();
      res.json(positions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch positions" });
    }
  });

  app.post("/api/positions", async (req, res) => {
    try {
      const position = await storage.createPosition(req.body);
      res.status(201).json(position);
    } catch (error) {
      res.status(500).json({ message: "Failed to create position" });
    }
  });

  // Attendance Management API routes
  app.get("/api/employees/:id/attendance", async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      
      const startDate = req.query.startDate as string || new Date().toISOString().split('T')[0];
      const endDate = req.query.endDate as string || new Date().toISOString().split('T')[0];
      
      const attendance = await storage.getAttendanceByEmployee(employeeId, startDate, endDate);
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch attendance" });
    }
  });

  app.post("/api/attendance", async (req, res) => {
    try {
      const attendance = await storage.createAttendance(req.body);
      res.status(201).json(attendance);
    } catch (error) {
      res.status(500).json({ message: "Failed to create attendance record" });
    }
  });

  app.put("/api/attendance/:id", async (req, res) => {
    try {
      const attendanceId = parseInt(req.params.id);
      if (isNaN(attendanceId)) {
        return res.status(400).json({ message: "Invalid attendance ID" });
      }
      
      const attendance = await storage.updateAttendance(attendanceId, req.body);
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ message: "Failed to update attendance" });
    }
  });

  // Leave Management API routes
  app.get("/api/leave-types", async (req, res) => {
    try {
      const leaveTypes = await storage.getAllLeaveTypes();
      res.json(leaveTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leave types" });
    }
  });

  app.get("/api/employees/:id/leave-requests", async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      
      const leaveRequests = await storage.getLeaveRequestsByEmployee(employeeId);
      res.json(leaveRequests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leave requests" });
    }
  });

  app.post("/api/leave-requests", async (req, res) => {
    try {
      const leaveRequest = await storage.createLeaveRequest(req.body);
      res.status(201).json(leaveRequest);
    } catch (error) {
      res.status(500).json({ message: "Failed to create leave request" });
    }
  });

  app.put("/api/leave-requests/:id", async (req, res) => {
    try {
      const leaveRequestId = parseInt(req.params.id);
      if (isNaN(leaveRequestId)) {
        return res.status(400).json({ message: "Invalid leave request ID" });
      }
      
      const leaveRequest = await storage.updateLeaveRequest(leaveRequestId, req.body);
      res.json(leaveRequest);
    } catch (error) {
      res.status(500).json({ message: "Failed to update leave request" });
    }
  });

  // Payroll Management API routes
  app.get("/api/employees/:id/payroll", async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      
      const year = parseInt(req.query.year as string) || new Date().getFullYear();
      const payroll = await storage.getPayrollByEmployee(employeeId, year);
      res.json(payroll);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payroll" });
    }
  });

  app.post("/api/payroll", async (req, res) => {
    try {
      const payroll = await storage.createPayroll(req.body);
      res.status(201).json(payroll);
    } catch (error) {
      res.status(500).json({ message: "Failed to create payroll record" });
    }
  });

  app.put("/api/payroll/:id", async (req, res) => {
    try {
      const payrollId = parseInt(req.params.id);
      if (isNaN(payrollId)) {
        return res.status(400).json({ message: "Invalid payroll ID" });
      }
      
      const payroll = await storage.updatePayroll(payrollId, req.body);
      res.json(payroll);
    } catch (error) {
      res.status(500).json({ message: "Failed to update payroll" });
    }
  });

  // Performance Reviews API routes
  app.get("/api/employees/:id/performance-reviews", async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      
      const reviews = await storage.getPerformanceReviewsByEmployee(employeeId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch performance reviews" });
    }
  });

  app.post("/api/performance-reviews", async (req, res) => {
    try {
      const review = await storage.createPerformanceReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to create performance review" });
    }
  });

  // Training Management API routes
  app.get("/api/training-programs", async (req, res) => {
    try {
      const programs = await storage.getAllTrainingPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch training programs" });
    }
  });

  app.get("/api/employees/:id/training", async (req, res) => {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      
      const training = await storage.getEmployeeTraining(employeeId);
      res.json(training);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employee training" });
    }
  });

  // Recruitment API routes
  app.get("/api/job-postings", async (req, res) => {
    try {
      const jobPostings = await storage.getAllJobPostings();
      res.json(jobPostings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job postings" });
    }
  });

  app.post("/api/job-postings", async (req, res) => {
    try {
      const jobPosting = await storage.createJobPosting(req.body);
      res.status(201).json(jobPosting);
    } catch (error) {
      res.status(500).json({ message: "Failed to create job posting" });
    }
  });

  app.get("/api/job-postings/:id/applications", async (req, res) => {
    try {
      const jobPostingId = parseInt(req.params.id);
      if (isNaN(jobPostingId)) {
        return res.status(400).json({ message: "Invalid job posting ID" });
      }
      
      const applications = await storage.getJobApplications(jobPostingId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job applications" });
    }
  });

  app.post("/api/job-applications", async (req, res) => {
    try {
      const application = await storage.createJobApplication(req.body);
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ message: "Failed to create job application" });
    }
  });

  // Dashboard API routes
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // User Management API routes
  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
