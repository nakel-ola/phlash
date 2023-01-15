const AuthTemplate = ({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="pt-2 w-full h-full overflow-hidden">
      {title ? (
        <div className="w-[98%] py-2 px-3 mx-auto flex items-center justify-between">
          <p className="text-base text-black dark:text-white text-center">
            {title}
          </p>
        </div>
      ) : null}

      {children}
    </div>
  );
};

export default AuthTemplate;
