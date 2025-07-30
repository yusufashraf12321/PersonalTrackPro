
# HR System

A comprehensive Human Resources Management System built with modern web technologies. This system provides complete HR functionality including employee management, attendance tracking, payroll processing, leave management, performance reviews, training programs, and recruitment.

## Features

### 🏢 Employee Management
- Complete employee directory with detailed profiles
- Department and position management
- Employee onboarding and offboarding workflows
- Employee search and filtering capabilities

### ⏰ Attendance Tracking
- Real-time clock in/out functionality
- Attendance reports and analytics
- Leave request management
- Time tracking and overtime calculation

### 💰 Payroll Management
- Automated payroll processing
- Salary calculations with allowances and deductions
- Payroll reports and tax management
- Payment tracking and history

### 📋 Leave Management
- Leave request submission and approval workflows
- Leave balance tracking
- Multiple leave types (sick, vacation, personal)
- Leave calendar and scheduling

### 📊 Performance Reviews
- Performance evaluation system
- Goal setting and tracking
- Review cycles and scheduling
- Performance analytics and reporting

### 🎓 Training & Development
- Training program management
- Employee enrollment tracking
- Course completion certificates
- Training analytics and ROI tracking

### 👥 Recruitment
- Job posting management
- Applicant tracking system
- Interview scheduling
- Hiring pipeline management

### 📈 Analytics & Reporting
- Comprehensive HR analytics dashboard
- Employee statistics and trends
- Department performance metrics
- Custom report generation

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI, Lucide React Icons
- **Charts**: Recharts
- **Routing**: Wouter
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hr-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── contexts/     # React contexts
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
├── server/                # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Database operations
│   └── db.ts            # Database connection
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema definitions
└── prisma/              # Database migrations
```

## API Endpoints

### Employee Management
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Attendance
- `GET /api/employees/:id/attendance` - Get employee attendance
- `POST /api/attendance` - Create attendance record
- `PUT /api/attendance/:id` - Update attendance record

### Payroll
- `GET /api/employees/:id/payroll` - Get employee payroll
- `POST /api/payroll` - Create payroll record
- `PUT /api/payroll/:id` - Update payroll record

### Leave Management
- `GET /api/leave-types` - Get leave types
- `GET /api/employees/:id/leave-requests` - Get employee leave requests
- `POST /api/leave-requests` - Create leave request
- `PUT /api/leave-requests/:id` - Update leave request

### Performance Reviews
- `GET /api/employees/:id/performance-reviews` - Get employee reviews
- `POST /api/performance-reviews` - Create performance review

### Training
- `GET /api/training-programs` - Get training programs
- `GET /api/employees/:id/training` - Get employee training

### Recruitment
- `GET /api/job-postings` - Get job postings
- `POST /api/job-postings` - Create job posting
- `GET /api/job-postings/:id/applications` - Get job applications
- `POST /api/job-applications` - Create job application

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@hrsystem.com or create an issue in the repository.
