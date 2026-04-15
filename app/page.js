'use client';

export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <p style={styles.badge}>Setup Request App</p>
          <h1 style={styles.title}>セットアップ依頼</h1>
        </header>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>セットアップ依頼</h2>

          <div style={styles.placeholder}>
            ここにあとで入力項目を追加
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Preview</h2>

          <div style={styles.preview}>
            プレビュー表示エリア
          </div>

          <div style={styles.buttons}>
            <button style={styles.reset}>リセット</button>
            <button style={styles.copy}>コピー</button>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f7fb',
    padding: '30px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    background: '#fff',
    padding: '20px',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  badge: {
    fontSize: '12px',
    color: '#888',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  placeholder: {
    height: '150px',
    border: '2px dashed #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    height: '150px',
    background: '#f9f9f9',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  reset: {
    padding: '10px',
  },
  copy: {
    padding: '10px',
    background: '#0070f3',
    color: '#fff',
    border: 'none',
  },
};
