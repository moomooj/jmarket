import Button from "@components/button";

export default function ProductDetail() {
  return (
    <div className="px-4  py-4">
      <div className="mb-8  items-center">
        <div className="h-96 w-full animate-pulse bg-slate-300" />
        <div className="flex cursor-pointer items-center space-x-3 border-b border-t py-3">
          <div className="h-12 w-12 animate-pulse rounded-full bg-slate-300" />
          <div>
            <p className="e text-sm font-medium text-gray-300" />
            <span className=" text-xs font-medium text-gray-300"></span>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="pb-1 text-3xl font-bold text-gray-900" />
          <span className="mt-3 block pb-1 text-2xl text-gray-900" />
          <p className=" my-6 pb-1 text-gray-700" />
          <div className="flex items-center justify-between space-x-2">
            <div className="w-full animate-pulse rounded-md border border-transparent bg-slate-300  p-6" />
          </div>
        </div>
      </div>
      <div>
        <div className="pb-2 text-2xl font-bold text-slate-300" />
        <div className=" mt-6 grid grid-cols-2 gap-4">
          <div className="mb-4 h-56 w-full animate-pulse bg-slate-300" />
          <div className="mb-4 h-56 w-full animate-pulse bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
