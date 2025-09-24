export default function SidebarCard({ title, children }) {
  return (
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </section>
  );
}
