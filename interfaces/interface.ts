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

export interface CoursesInputData{
  id:string;
  title:string
}
 export interface CourseShortInfo{
  id:string;
  slug:string;
  title:string;
  shortDesc:string;
  duration:string;
  fees:number;
  active:boolean;
 }

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}
 

export type StudentStatus = "ACTIVE" | "INACTIVE" | "COMPLETED";

export interface StudentSummary {
  id: string;
  enrollmentId: string;
  fullName: string;
  mobileNumber: string;
  courses: string[];
  status: StudentStatus;
  admissionDate: string; // ISO date
}

export interface CourseEnrollmentInfo {
  enrollmentId: string;
  courseId: string;
  courseTitle: string;
  enrolledDate: string;
  enrollmentStatus: "ACTIVE" | "COMPLETED" | "DROPPED";
}

export interface StudentDetail {
  id: string;
  enrollmentId: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  mobileNumber: string;
  email: string;
  aadhaarNumber: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  qualification: string;
  admissionDate: string;
  status: StudentStatus;
  courses: string[];
  profilePhotoUrl: string;
  aadhaarCardUrl: string;
  signatureUrl: string;
}

export interface StudentStats {
  total: number;
  active: number;
  completed: number;
  inactive: number;
}

export interface UpdateStudentPayload {
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  qualification: string;
  status: StudentStatus;
}

export interface CreateStudentPayload {
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  mobileNumber: string;
  email: string;
  aadhaarNumber: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  qualification: string;
  admissionDate: string;
  courseIds: string[];
}

export interface CourseOption {
  id: string;
  title: string;
}

export interface PagedResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface AdmitCardSummary {
  id: string;
  admitCardNumber: string;
  studentId:string;
  studentName: string;
  examPlace: string;
  examTime: string;
  examDate: string;
}