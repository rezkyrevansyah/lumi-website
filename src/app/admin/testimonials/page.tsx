export const dynamic = "force-dynamic";

import { getTestimonials } from "@/actions/testimonials";
import TestimonialList from "@/components/admin/testimonials/TestimonialList";

export default async function AdminTestimonialsPage() {
  const items = await getTestimonials();
  return (
    <div className="max-w-5xl mx-auto">
      <TestimonialList initialItems={items} />
    </div>
  );
}
