export const TableboxWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="h-[280px] max-w-[400px] md:max-w-[1900px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
