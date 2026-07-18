/**
 * /admin layout — just provides the chrome. Per-page auth guard so the
 * /admin/login page stays public without weird layout tricks.
 */
export const metadata = {
  title: "Admin · IYF Sylhet",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="paper">
      <main className="mx-auto max-w-6xl px-5 pt-16 pb-24 sm:pt-24">
        {children}
      </main>
    </div>
  );
}
