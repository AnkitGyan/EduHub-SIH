export const LeaderboardItem = ({
  avatar,
  name,
  score,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
    >
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <span className="text-gray-500 text-sm">{score}</span>
    </div>
  );
};
