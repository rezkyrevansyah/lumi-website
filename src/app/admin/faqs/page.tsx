import { getFaqs } from "@/actions/faqs";
import FAQList from "@/components/admin/faqs/FAQList";

export default async function AdminFaqsPage() {
  const items = await getFaqs();
  return (
    <div className="max-w-4xl mx-auto">
      <FAQList initialItems={items} />
    </div>
  );
}
