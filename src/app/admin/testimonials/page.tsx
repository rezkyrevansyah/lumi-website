import TestimonialList from "@/components/admin/testimonials/TestimonialList";
import { ADMIN_TESTIMONIALS } from "@/lib/admin-data";

export default function AdminTestimonialsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <TestimonialList initialItems={ADMIN_TESTIMONIALS} />
    </div>
  );
}
