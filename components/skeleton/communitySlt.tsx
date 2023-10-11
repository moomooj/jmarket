export default function CommunitySltCard() {
  return (
    <div className="space-y-4 divide-y-[2px]">
      <div className="flex cursor-pointer flex-col items-start pt-4">
        <div className="ml-2 flex h-4 w-12 animate-pulse rounded-full bg-slate-200" />
        <div className="ml-2 mt-2 h-6 w-9/12 animate-pulse rounded-md bg-slate-200 px-4" />
        <div className="ml-2 mt-2 h-6 w-7/12 animate-pulse rounded-md bg-slate-200 px-4" />
        <div className="mt-1 flex w-full" />
        <div className="ml-2 mt-1 flex w-full space-x-5 border-t py-2.5  text-gray-700">
          <div className=" h-6 w-4/12 animate-pulse rounded-md bg-slate-200 " />
        </div>
      </div>
    </div>
  );
}
