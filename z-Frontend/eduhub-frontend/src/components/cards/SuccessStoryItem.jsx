const SuccessStoryItem = ({
  avatar,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
    >
      <img
        src={avatar}
        alt={title}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{title}</span>
        <span className="text-xs text-gray-500">{subtitle}</span>
      </div>
    </div>
  );
};

export default SuccessStoryItem;