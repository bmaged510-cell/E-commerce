import { getAllBrands } from "@/api/services/routemisr.service";
import Link from "next/link";

export default async function Brands() {
  const brands = await getAllBrands();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 py-12">
        <div className="w-[90%] mx-auto">
          <div className="flex items-center gap-2 text-purple-200 text-sm mb-3">
            <Link href="/Home" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Brands</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl">🏷</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Top Brands</h1>
              <p className="text-purple-200 text-sm mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto py-10">
        {!brands || brands.length === 0 ? (
          <div className="text-center text-gray-400 py-20">No brands found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map((brand: any) => (
              <Link href={`/Brands/${brand._id}`} key={brand._id}>
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group">
                  <div className="w-full h-20 flex items-center justify-center">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center font-medium group-hover:text-purple-600 transition-colors">
                    {brand.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}