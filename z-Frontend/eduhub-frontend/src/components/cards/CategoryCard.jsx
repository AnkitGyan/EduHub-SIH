export const CategoryCard = ({
  title,
  icon,
  bgColor = "bg-white",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center
                  w-40 h-48 rounded-2xl shadow-md cursor-pointer
                  p-4 transition-transform hover:scale-105 ${bgColor}`}
    >
      <div className="mb-4 w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-center">{title}</h3>
    </div>
  );
};
