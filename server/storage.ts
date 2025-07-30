import { db } from "./db";
import * as schema from "@shared/schema";
import { eq, and, desc, asc, count, sql } from "drizzle-orm";

export const storage = {
  // Employee Management
  async getAllEmployees() {
    const result = await db
      .select({
        id: schema.employees.id,
        employeeId: schema.employees.employeeId,
        firstName: schema.employees.firstName,
        lastName: schema.employees.lastName,
        email: schema.employees.email,
        phone: schema.employees.phone,
        position: schema.positions.title,
        department: schema.departments.name,
        hireDate: schema.employees.hireDate,
        status: schema.employees.status,
        salary: schema.employees.salary,
      })
      .from(schema.employees)
      .leftJoin(schema.positions, eq(schema.employees.positionId, schema.positions.id))
      .leftJoin(schema.departments, eq(schema.employees.departmentId, schema.departments.id))
      .orderBy(asc(schema.employees.lastName));
    
    return result;
  },

  async getEmployeeById(id: number) {
    const result = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, id))
      .limit(1);
    
    return result[0];
  },

  async createEmployee(data: any) {
    const result = await db.insert(schema.employees).values(data).returning();
    return result[0];
  },

  async updateEmployee(id: number, data: any) {
    const result = await db
      .update(schema.employees)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.employees.id, id))
      .returning();
    return result[0];
  },

  async deleteEmployee(id: number) {
    await db.delete(schema.employees).where(eq(schema.employees.id, id));
  },

  // Department Management
  async getAllDepartments() {
    const result = await db
      .select({
        id: schema.departments.id,
        name: schema.departments.name,
        description: schema.departments.description,
        budget: schema.departments.budget,
        managerName: sql<string>`CONCAT(${schema.employees.firstName}, ' ', ${schema.employees.lastName})`,
        employeeCount: count(schema.employees.id),
      })
      .from(schema.departments)
      .leftJoin(schema.employees, eq(schema.departments.managerId, schema.employees.id))
      .leftJoin(schema.employees, eq(schema.departments.id, schema.employees.departmentId))
      .groupBy(schema.departments.id, schema.employees.firstName, schema.employees.lastName);
    
    return result;
  },

  async createDepartment(data: any) {
    const result = await db.insert(schema.departments).values(data).returning();
    return result[0];
  },

  // Position Management
  async getAllPositions() {
    const result = await db
      .select({
        id: schema.positions.id,
        title: schema.positions.title,
        description: schema.positions.description,
        department: schema.departments.name,
        salaryRange: schema.positions.salaryRange,
        isActive: schema.positions.isActive,
      })
      .from(schema.positions)
      .leftJoin(schema.departments, eq(schema.positions.departmentId, schema.departments.id))
      .where(eq(schema.positions.isActive, true))
      .orderBy(asc(schema.positions.title));
    
    return result;
  },

  async createPosition(data: any) {
    const result = await db.insert(schema.positions).values(data).returning();
    return result[0];
  },

  // Attendance Management
  async getAttendanceByEmployee(employeeId: number, startDate: string, endDate: string) {
    const result = await db
      .select()
      .from(schema.attendance)
      .where(
        and(
          eq(schema.attendance.employeeId, employeeId),
          sql`${schema.attendance.date} >= ${startDate}`,
          sql`${schema.attendance.date} <= ${endDate}`
        )
      )
      .orderBy(desc(schema.attendance.date));
    
    return result;
  },

  async createAttendance(data: any) {
    const result = await db.insert(schema.attendance).values(data).returning();
    return result[0];
  },

  async updateAttendance(id: number, data: any) {
    const result = await db
      .update(schema.attendance)
      .set(data)
      .where(eq(schema.attendance.id, id))
      .returning();
    return result[0];
  },

  // Leave Management
  async getAllLeaveTypes() {
    const result = await db.select().from(schema.leaveTypes).orderBy(asc(schema.leaveTypes.name));
    return result;
  },

  async getLeaveRequestsByEmployee(employeeId: number) {
    const result = await db
      .select({
        id: schema.leaveRequests.id,
        leaveType: schema.leaveTypes.name,
        startDate: schema.leaveRequests.startDate,
        endDate: schema.leaveRequests.endDate,
        daysRequested: schema.leaveRequests.daysRequested,
        reason: schema.leaveRequests.reason,
        status: schema.leaveRequests.status,
        createdAt: schema.leaveRequests.createdAt,
      })
      .from(schema.leaveRequests)
      .leftJoin(schema.leaveTypes, eq(schema.leaveRequests.leaveTypeId, schema.leaveTypes.id))
      .where(eq(schema.leaveRequests.employeeId, employeeId))
      .orderBy(desc(schema.leaveRequests.createdAt));
    
    return result;
  },

  async createLeaveRequest(data: any) {
    const result = await db.insert(schema.leaveRequests).values(data).returning();
    return result[0];
  },

  async updateLeaveRequest(id: number, data: any) {
    const result = await db
      .update(schema.leaveRequests)
      .set(data)
      .where(eq(schema.leaveRequests.id, id))
      .returning();
    return result[0];
  },

  // Payroll Management
  async getPayrollByEmployee(employeeId: number, year: number) {
    const result = await db
      .select()
      .from(schema.payroll)
      .where(
        and(
          eq(schema.payroll.employeeId, employeeId),
          eq(schema.payroll.year, year)
        )
      )
      .orderBy(desc(schema.payroll.month));
    
    return result;
  },

  async createPayroll(data: any) {
    const result = await db.insert(schema.payroll).values(data).returning();
    return result[0];
  },

  async updatePayroll(id: number, data: any) {
    const result = await db
      .update(schema.payroll)
      .set(data)
      .where(eq(schema.payroll.id, id))
      .returning();
    return result[0];
  },

  // Performance Reviews
  async getPerformanceReviewsByEmployee(employeeId: number) {
    const result = await db
      .select({
        id: schema.performanceReviews.id,
        reviewPeriod: schema.performanceReviews.reviewPeriod,
        reviewDate: schema.performanceReviews.reviewDate,
        rating: schema.performanceReviews.rating,
        status: schema.performanceReviews.status,
        reviewerName: sql<string>`CONCAT(${schema.employees.firstName}, ' ', ${schema.employees.lastName})`,
      })
      .from(schema.performanceReviews)
      .leftJoin(schema.employees, eq(schema.performanceReviews.reviewerId, schema.employees.id))
      .where(eq(schema.performanceReviews.employeeId, employeeId))
      .orderBy(desc(schema.performanceReviews.reviewDate));
    
    return result;
  },

  async createPerformanceReview(data: any) {
    const result = await db.insert(schema.performanceReviews).values(data).returning();
    return result[0];
  },

  // Training Management
  async getAllTrainingPrograms() {
    const result = await db
      .select()
      .from(schema.trainingPrograms)
      .where(eq(schema.trainingPrograms.isActive, true))
      .orderBy(asc(schema.trainingPrograms.title));
    
    return result;
  },

  async getEmployeeTraining(employeeId: number) {
    const result = await db
      .select({
        id: schema.employeeTraining.id,
        programTitle: schema.trainingPrograms.title,
        enrollmentDate: schema.employeeTraining.enrollmentDate,
        completionDate: schema.employeeTraining.completionDate,
        status: schema.employeeTraining.status,
        score: schema.employeeTraining.score,
      })
      .from(schema.employeeTraining)
      .leftJoin(schema.trainingPrograms, eq(schema.employeeTraining.trainingProgramId, schema.trainingPrograms.id))
      .where(eq(schema.employeeTraining.employeeId, employeeId))
      .orderBy(desc(schema.employeeTraining.enrollmentDate));
    
    return result;
  },

  // Recruitment
  async getAllJobPostings() {
    const result = await db
      .select({
        id: schema.jobPostings.id,
        title: schema.jobPostings.title,
        department: schema.departments.name,
        location: schema.jobPostings.location,
        type: schema.jobPostings.type,
        status: schema.jobPostings.status,
        postedDate: schema.jobPostings.postedDate,
        closingDate: schema.jobPostings.closingDate,
      })
      .from(schema.jobPostings)
      .leftJoin(schema.departments, eq(schema.jobPostings.departmentId, schema.departments.id))
      .orderBy(desc(schema.jobPostings.postedDate));
    
    return result;
  },

  async createJobPosting(data: any) {
    const result = await db.insert(schema.jobPostings).values(data).returning();
    return result[0];
  },

  async getJobApplications(jobPostingId: number) {
    const result = await db
      .select()
      .from(schema.jobApplications)
      .where(eq(schema.jobApplications.jobPostingId, jobPostingId))
      .orderBy(desc(schema.jobApplications.appliedDate));
    
    return result;
  },

  async createJobApplication(data: any) {
    const result = await db.insert(schema.jobApplications).values(data).returning();
    return result[0];
  },

  // Dashboard Statistics
  async getDashboardStats() {
    const totalEmployees = await db.select({ count: count() }).from(schema.employees);
    const activeEmployees = await db
      .select({ count: count() })
      .from(schema.employees)
      .where(eq(schema.employees.status, "active"));
    
    const totalDepartments = await db.select({ count: count() }).from(schema.departments);
    const openJobPostings = await db
      .select({ count: count() })
      .from(schema.jobPostings)
      .where(eq(schema.jobPostings.status, "open"));
    
    return {
      totalEmployees: totalEmployees[0].count,
      activeEmployees: activeEmployees[0].count,
      totalDepartments: totalDepartments[0].count,
      openJobPostings: openJobPostings[0].count,
    };
  },

  // User Management (HR Staff)
  async createUser(data: any) {
    const result = await db.insert(schema.users).values(data).returning();
    return result[0];
  },

  async getUserByUsername(username: string) {
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username))
      .limit(1);
    
    return result[0];
  },
};