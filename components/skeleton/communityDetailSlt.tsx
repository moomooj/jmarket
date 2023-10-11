export default function CommunityDtailSlt() {
  return (
    <div>
      <div className="my-3 ml-4 h-4 w-12 animate-pulse rounded-full bg-gray-100" />
      <div className="mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300" />
        <div className="w-4/5">
          <div className="h-4 w-2/12 animate-pulse rounded-md bg-slate-300" />
          <div className="mt-1 h-4 w-1/12 animate-pulse rounded-md bg-slate-300" />
        </div>
      </div>
      <div>
        <div className="mt-2 w-full px-4">
          <div className="h-6 w-3/6 animate-pulse rounded-md bg-slate-300" />
        </div>
        <div className="mt-3 flex w-full space-x-5 border-b-[2px] border-t px-4 py-2.5  text-gray-700">
          <div className="h-4 w-2/12 animate-pulse rounded-md bg-slate-300" />
        </div>
      </div>
      <div className="my-5 space-y-5 px-4">
        <div className="flex items-start space-x-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-slate-300 " />
          <div className="w-3/4">
            <div className="mt-1 h-6 w-14 animate-pulse rounded-md bg-slate-300" />
          </div>
        </div>
      </div>
      <form className="px-4">
        <div className="border pb-28" />
        <div className="mt-2 h-10 w-full animate-pulse rounded-md bg-slate-300" />
      </form>
    </div>
  );
}
