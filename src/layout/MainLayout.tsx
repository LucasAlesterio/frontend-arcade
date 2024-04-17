interface Props {
  children: React.ReactNode;
}

export default function MainLayout({children}: Props) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      {children}
    </div>
  );
}