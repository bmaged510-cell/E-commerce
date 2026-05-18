import { getSubCategory } from "@/api/services/routemisr.service";
import Link from "next/link";

export default async function SubCategoryDetails({ params }: { params: Promise<{ id: string; subId: string }> }) {
  const { id, subId } = await params;
  const subcategory = await getSubCategory(subId);

  return (
    <div className="w-[90%] mx-auto py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/Categories" className="text-gray-400 hover:text-[#16A34A] transition-all">
          Categories
        </Link>
        <span className="text-gray-400">/</span>
        <Link href={`/Categories/${id}`} className="text-gray-400 hover:text-[#16A34A] transition-all">
          Back
        </Link>
        <span className="text-gray-400">/</span>
        <h1 className="text-2xl font-bold">{subcategory?.name || "Subcategory"}</h1>
      </div>

      {!subcategory ? (
        <p className="text-gray-500">Subcategory not found.</p>
      ) : (
        <div className="border rounded-xl p-8 text-center max-w-sm mx-auto hover:shadow-md transition-all">
          <h2 className="text-xl font-bold text-[#16A34A]">{subcategory.name}</h2>
          <p className="text-gray-400 text-sm mt-2">Slug: {subcategory.slug}</p>
        </div>
      )}
    </div>
  );
}