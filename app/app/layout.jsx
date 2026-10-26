
export const metadata = {
  title: "STUDIO WEAR | متجر التيشيرتات",
  description: "تجربة تفاعلية لعرض أربعة تيشيرتات"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
