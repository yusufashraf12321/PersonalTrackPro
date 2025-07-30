import { pgTable, text, serial, integer, boolean, timestamp, uniqueIndex, decimal, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users (HR Staff)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  role: text("role").notNull().default("hr_staff"), // hr_staff, hr_manager, admin
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Departments
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  managerId: integer("manager_id"),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
  createdAt: true,
});

// Positions/Job Titles
export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  departmentId: integer("department_id").notNull(),
  salaryRange: text("salary_range"),
  requirements: text("requirements"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPositionSchema = createInsertSchema(positions).omit({
  id: true,
  createdAt: true,
});

// Employees
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  employeeId: text("employee_id").notNull().unique(), // Employee number
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),
  dateOfBirth: date("date_of_birth"),
  gender: text("gender"),
  maritalStatus: text("marital_status"),
  emergencyContact: text("emergency_contact"),
  emergencyPhone: text("emergency_phone"),
  positionId: integer("position_id").notNull(),
  departmentId: integer("department_id").notNull(),
  managerId: integer("manager_id"),
  hireDate: date("hire_date").notNull(),
  terminationDate: date("termination_date"),
  salary: decimal("salary", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("active"), // active, terminated, on_leave
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Attendance
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  date: date("date").notNull(),
  clockIn: timestamp("clock_in"),
  clockOut: timestamp("clock_out"),
  totalHours: decimal("total_hours", { precision: 4, scale: 2 }),
  status: text("status").notNull().default("present"), // present, absent, late, half_day
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
  createdAt: true,
});

// Leave Types
export const leaveTypes = pgTable("leave_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  defaultDays: integer("default_days").notNull(),
  isPaid: boolean("is_paid").default(true),
  color: text("color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeaveTypeSchema = createInsertSchema(leaveTypes).omit({
  id: true,
  createdAt: true,
});

// Leave Requests
export const leaveRequests = pgTable("leave_requests", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  leaveTypeId: integer("leave_type_id").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  daysRequested: integer("days_requested").notNull(),
  reason: text("reason"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  approvedBy: integer("approved_by"),
  approvedAt: timestamp("approved_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeaveRequestSchema = createInsertSchema(leaveRequests).omit({
  id: true,
  createdAt: true,
});

// Payroll
export const payroll = pgTable("payroll", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  basicSalary: decimal("basic_salary", { precision: 10, scale: 2 }).notNull(),
  allowances: decimal("allowances", { precision: 10, scale: 2 }).default("0"),
  deductions: decimal("deductions", { precision: 10, scale: 2 }).default("0"),
  netSalary: decimal("net_salary", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, processed, paid
  paymentDate: date("payment_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPayrollSchema = createInsertSchema(payroll).omit({
  id: true,
  createdAt: true,
});

// Performance Reviews
export const performanceReviews = pgTable("performance_reviews", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  reviewerId: integer("reviewer_id").notNull(),
  reviewPeriod: text("review_period").notNull(), // e.g., "Q1 2024"
  reviewDate: date("review_date").notNull(),
  rating: integer("rating"), // 1-5 scale
  strengths: text("strengths"),
  areasForImprovement: text("areas_for_improvement"),
  goals: text("goals"),
  comments: text("comments"),
  status: text("status").notNull().default("draft"), // draft, submitted, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPerformanceReviewSchema = createInsertSchema(performanceReviews).omit({
  id: true,
  createdAt: true,
});

// Training Programs
export const trainingPrograms = pgTable("training_programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  duration: text("duration"),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  isMandatory: boolean("is_mandatory").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTrainingProgramSchema = createInsertSchema(trainingPrograms).omit({
  id: true,
  createdAt: true,
});

// Employee Training
export const employeeTraining = pgTable("employee_training", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  trainingProgramId: integer("training_program_id").notNull(),
  enrollmentDate: date("enrollment_date").notNull(),
  completionDate: date("completion_date"),
  status: text("status").notNull().default("enrolled"), // enrolled, in_progress, completed, dropped
  score: integer("score"),
  certificate: text("certificate"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEmployeeTrainingSchema = createInsertSchema(employeeTraining).omit({
  id: true,
  createdAt: true,
});

// Recruitment/Job Postings
export const jobPostings = pgTable("job_postings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  departmentId: integer("department_id").notNull(),
  positionId: integer("position_id").notNull(),
  salaryRange: text("salary_range"),
  location: text("location"),
  type: text("type").notNull(), // full_time, part_time, contract, internship
  status: text("status").notNull().default("open"), // open, closed, draft
  postedDate: date("posted_date").notNull(),
  closingDate: date("closing_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobPostingSchema = createInsertSchema(jobPostings).omit({
  id: true,
  createdAt: true,
});

// Job Applications
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobPostingId: integer("job_posting_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  resume: text("resume"),
  coverLetter: text("cover_letter"),
  status: text("status").notNull().default("applied"), // applied, reviewing, shortlisted, interviewed, offered, rejected
  appliedDate: timestamp("applied_date").defaultNow().notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  appliedDate: true,
  createdAt: true,
});

// Common Types
export interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  status: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  managerName: string;
  employeeCount: number;
}

export interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  status: string;
}

export interface LeaveRequest {
  id: number;
  employeeId: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  daysRequested: number;
  status: string;
}

export interface Payroll {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  basicSalary: number;
  netSalary: number;
  status: string;
}

export interface PerformanceReview {
  id: number;
  employeeId: number;
  reviewerId: number;
  reviewPeriod: string;
  rating: number;
  status: string;
}

export interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  status: string;
  postedDate: string;
}