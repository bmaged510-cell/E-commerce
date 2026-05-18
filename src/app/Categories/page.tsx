import { getAllCategories } from "@/api/services/routemisr.service";
import Link from "next/link";

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>

      {!categories ? (
        <p className="text-gray-500">Failed to load categories.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link href={`/Categories/${cat._id}`} key={cat._id}>
              <div className="border rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3 text-center">
                  <h2 className="font-semibold text-sm">{cat.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}