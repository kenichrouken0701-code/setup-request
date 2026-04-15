export const metadata = {
  title: 'セットアップシート',
  description: 'セットアップシートアプリ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f5f7fb' }}>
        {children}
      </body>
    </html>
  );
}
