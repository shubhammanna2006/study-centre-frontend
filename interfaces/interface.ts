export interface LoginCrediancial{
    email:string;
    password:string;
}
export type RegistrationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface RegistrationCourseRef {
  courseId: string;
  title: string;
}

// Row shape for the table — matches GET /api/registrations
export interface RegistrationSummary {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  course: string;
  status: string;
  createdAt: string; // ISO date
}

// Full shape for the "view details" dialog — matches GET /api/registrations/{id}
export interface RegistrationDetail extends RegistrationSummary {
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  mobileNumber:string;
  email:string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
  city: string;
  state: string;
  pinCode: string;
  aadhaarNumber: string;
  qualification: string;
  admissionDate: string | null;
  profilePhoto: string | null;
  aadhaarDocument: string | null;
  signature: string | null;
  status: string;
}

export interface RegistrationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

// Payload for admin manually creating an admission (e.g. walk-in student)
export interface CreateRegistrationPayload {
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  qualification: string;
  courseIds: string[];
  preferredAdmissionDate?: string;
}

export interface PagedResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Row shape for the table — matches GET /api/courses (admin list)
export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  duration: string;
  fees: number;
  active: boolean;
}

// Full shape for view/edit — matches GET /api/courses/{id}
export interface CourseDetail extends CourseSummary {
  shortDesc: string;
  eligibility: string;
  syllabus: string[];
  benefits: string[];
  // icon: string | null;
  // color: string | null;
}

export interface CourseStats {
  total: number;
  active: number;
  // totalStudents: number;
  inactive: number;
}

export interface CourseFormPayload {
  title: string;
  slug: string;
  shortDesc: string;
  duration: string;
  fees: number;
  eligibility: string;
  syllabus: string[];
  benefits: string[];
  active: boolean;
}

export interface PagedResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}