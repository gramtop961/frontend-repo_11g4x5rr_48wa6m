export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image || "https://images.unsplash.com/photo-1585386959984-a4155223168f"}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">${product.price?.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="rounded-md bg-gray-900 text-white px-3 py-1.5 text-sm font-semibold hover:bg-black">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
