import { getSpecificBrand } from "@/api/services/routemisr.service";
import Link from "next/link";

export default async function BrandDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brand = await getSpecificBrand(id);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 py-12">
        <div className="w-[90%] mx-auto">
          <div className="flex items-center gap-2 text-purple-200 text-sm mb-3">
            <Link href="/Home" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/Brands" className="hover:text-white">Brands</Link>
            <span>/</span>
            <span className="text-white">{brand?.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{brand?.name}</h1>
        </div>
      </div>

      <div className="w-[90%] mx-auto py-12">
        {!brand ? (
          <p className="text-gray-500 text-center">Brand not found.</p>
        ) : (
          <div className="max-w-sm mx-auto text-center">
            <div className="border border-gray-100 rounded-2xl p-10 shadow-sm bg-white">
              <img
                src={brand.image}
                alt={brand.name}
                className="max-h-32 mx-auto object-contain mb-6"
              />
              <h2 className="text-2xl font-bold text-gray-800">{brand.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{brand.slug}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}