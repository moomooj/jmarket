export default function Products() {
  return (
    <div className="flex cursor-pointer justify-between px-4 pt-5">
      <div className="flex w-full space-x-4">
        <div className="h-20 w-20 animate-pulse rounded-md bg-slate-300" />
        <div className="pt- flex w-[300px] animate-pulse  flex-col">
          <div className="h-5 w-full animate-pulse rounded-md  bg-slate-300 " />
          <div className="mt-2 h-5 w-6/12 animate-pulse rounded-md  bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
