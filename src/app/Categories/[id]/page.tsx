import { getSubCategories, getAllCategories } from "@/api/services/routemisr.service";
import Link from "next/link";

export default async function SubCategories({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const [subcategories, categories] = await Promise.all([
    getSubCategories(id),
    getAllCategories(),
  ]);

  const currentCategory = categories?.find((cat) => cat._id === id);

  return (
    <div className="w-[90%] mx-auto py-10">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/Categories" className="text-gray-400 hover:text-[#16A34A] transition-all text-sm">
          Categories
        </Link>
        <span className="text-gray-400">/</span>
        <h1 className="text-2xl font-bold">{currentCategory?.name || "Subcategories"}</h1>
      </div>

      {!subcategories || subcategories.length === 0 ? (
        <p className="text-gray-500">No subcategories found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {subcategories.map((sub) => (
            <Link href={`/Categories/${id}/subcategory/${sub._id}`} key={sub._id}>
              <div className="border rounded-xl p-4 text-center hover:shadow-md hover:border-[#16A34A] transition-all cursor-pointer">
                <h2 className="font-semibold text-sm">{sub.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}