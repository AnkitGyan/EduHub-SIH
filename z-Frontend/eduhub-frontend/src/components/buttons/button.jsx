export const Button = ({
  variant = "yellow",
  size = "md",
  text,
  startIcon,
  endIcon,
  onClick,
}) => {
  const variantClasses = {
    yellow: "bg-yellow-400 text-black hover:opacity-90",
    green: "bg-green-500 text-white hover:opacity-90",
    transparent:
      "bg-transparent text-black border border-gray-300 hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-sm rounded",
    md: "px-4 py-2 text-base rounded-md",
    lg: "px-6 py-3 text-lg rounded-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${sizeClasses[size]} flex gap-2 font-light items-center transition cursor-pointer`}
    >
      {startIcon && <span className="icon-start">{startIcon}</span>}
      {text}
      {endIcon && <span className="icon-end">{endIcon}</span>}
    </button>
  );
};
