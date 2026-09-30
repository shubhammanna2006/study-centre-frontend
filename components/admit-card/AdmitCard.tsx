// "use client";

// import React from "react";

// export interface AdmitCardData {
//   admitCardNumber: string;
//     name: string;
//     registrationNumber: string;
//     course?: string;
//     dateOfBirth: string;
//     profilePhotoUrl?: string;
//     date: string;
//     time: string;
//     center: string;
// }

// interface Props {
//   data: AdmitCardData;
// }

// export default function AdmitCard({ data }: Props) {
//   return (
//     <div id="admit-card" className="admit-card">

//       {/* ================= HEADER ================= */}

//       <div className="admit-header">

//         <div className="logo-wrapper">
//           <img
//             src="/assets/logo/studycentrelogo.png"
//             alt="Study Centre"
//           />
//         </div>

//         <div className="centre-info">
//           <h1>STUDY CENTRE</h1>

//           <p>
//             POTKA-KUDADA MAIN ROAD, POTKA THANACHOWK
//           </p>
//         </div>

//         <div className="logo-wrapper">
//           <img
//             src="/assets/logo/studycentrelogo.pngq  az"
//             alt="Study Centre"
//           />
//         </div>

//       </div>


//       {/* ================= TITLE ================= */}

//       <div className="admit-title">
//         ADMIT CARD {Date.now()}
//       </div>



//       {/* ================= STUDENT DETAILS ================= */}

//       <div className="student-section">

//         <div className="student-details">

//           <p>
//             <strong>Course :</strong>{" "}
//             {data.student.course}
//           </p>

//           <p>
//             <strong>Admit Card No :</strong>{" "}
//             {data.admitCardNumber}
//           </p>

//           <p>
//             <strong>Name :</strong>{" "}
//             {data.student.name}
//           </p>

//           <p>
//             <strong>Registration No :</strong>{" "}
//             {data.student.registrationNumber}
//           </p>

//           <p>
//             <strong>DOB :</strong>{" "}
//             {formatDate(data.student.dateOfBirth)}
//           </p>

//           <p>
//             <strong>Exam Date & Time :</strong>{" "}
//             {formatDate(data.exam.date)}{" "}
//             {formatTime(data.exam.time)}
//           </p>

//           <p>
//             <strong>Examination Center :</strong>{" "}
//             {data.exam.center}
//           </p>

//         </div>


//         {/* ================= PHOTO + SIGNATURE ================= */}

//         <div className="candidate-side">

//           <div className="photo-box">

//             {data.student.profilePhotoUrl && (
//               <img
//                 src={data.student.profilePhotoUrl}
//                 alt={data.student.name}
//               />
//             )}

//           </div>

//           <div className="signature-box"></div>

//           <p className="signature-label">
//             Signature of the Candidate
//           </p>

//         </div>

//       </div>


//       {/* ================= INSTRUCTIONS ================= */}

//       <div className="instructions">

//         <div className="instructions-title">
//           INSTRUCTIONS
//         </div>

//         <ol>

//           <li>
//             Candidate should report for written examination
//             at least 20 minutes prior to commencement of
//             examinations. No candidates will be allowed under
//             any circumstance to appear in a written examination
//             later than 10 minutes prior to the commencement of
//             the examination.
//           </li>

//           <li>
//             No Candidates shall be allowed to appear in the
//             examination centre without this ADMIT CARD.
//           </li>

//           <li>
//             In addition to the Admit Card, the candidate must
//             carry Identity Proof documents such as Aadhaar
//             and Voter during the written, oral, and signal
//             examination.
//           </li>

//           <li>
//             Candidate to read, understand and follow the
//             instruction provided in the Answer booklet for
//             written examination.
//           </li>

//           <li>
//             Candidate should occupy the correct seat as
//             arranged and intimated by the examination centre.
//           </li>

//           <li>
//             The candidate must ensure that the instructions
//             provided on the front page and last page of the
//             answer booklet are read and understood.
//           </li>

//           <li>
//             The candidate should start the answer to each
//             question on a new page and write the corresponding
//             question number in the margin.
//           </li>

//         </ol>

//       </div>

//     </div>
//   );
// }


// /* ================= HELPERS ================= */

// function formatDate(date: string) {
//   const d = new Date(date);

//   return d.toLocaleDateString("en-GB");
// }

// function formatTime(time: string) {
//   const [hours, minutes] = time.split(":");

//   const hour = Number(hours);

//   const suffix = hour >= 12 ? "PM" : "AM";

//   const hour12 = hour % 12 || 12;

//   return `${hour12}:${minutes} ${suffix}`;
// }