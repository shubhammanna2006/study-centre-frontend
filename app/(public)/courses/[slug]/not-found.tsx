import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CourseNotFound() {
  return (
    <div className="mx-auto max-w-xl py-24 text-center">
      <h1 className="text-2xl font-bold">Course not found</h1>
      <Link href="/courses"><Button variant="outline" className="mt-4">Back to courses</Button></Link>
    </div>
  );
}
