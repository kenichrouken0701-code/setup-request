'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'setup-sheet-data';

const todayString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const initialForm = {
  myName: '',
  date: todayString(),
  targetName: '',
  condition: '',
  talkedContent: '',
  closingAp: '',
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setForm({
          ...initialForm,
          ...parsed,
          date: parsed.date || todayString(),
        });
      } catch (error) {
        console.error('保存データの読み込みに失敗しました', error);
      }
    }
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCopied(false);
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const resetData = {
      ...initialForm,
      date: todayString(),
    };
    setForm(resetData);
    localStorage.removeItem(STORAGE_KEY);
    setCopied(false);
    setSaved(false);
  };

  const formatDateForDisplay = (dateValue) => {
    if (!dateValue) return '';
    const [year, month, day] = dateValue.split('-');
    return `${year}年${month}月${day}日`;
  };

  const previewText = `【セットアップシート】
自分の名前：${form.myName}
何月何日：${formatDateForDisplay(form.date)}
セットアップ対象者：${form.targetName}

【表情・状態】
${form.condition}

【話した内容（ホットスポット・ネガスポット）】
${form.talkedContent}

【どういう着地APになったか】
${form.closingAp}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('コピーに失敗しました', error);
    }
  };

  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <p className="badge">Setup Sheet App</p>
          <h1 className="title">セットアップシート</h1>
          <p className="subtitle">
            セットアップ内容を記録して、保存・コピーできるシート
          </p>
        </header>

        <section className="mainCard">
          <div className="tabArea">
            <button className="activeTab">セットアップシート</button>
          </div>

          <div className="contentArea">
            <div className="inputCard">
              <h2 className="sectionTitle">入力エリア</h2>

              <div className="formGrid">
                <div className="field">
                  <label className="label">自分の名前</label>
                  <input
                    type="text"
                    className="input"
                    value={form.myName}
                    onChange={(e) => handleChange('myName', e.target.value)}
                    placeholder="名前を入力"
                  />
                </div>

                <div className="field">
                  <label className="label">何月何日</label>
                  <input
                    type="date"
                    className="input"
                    value={form.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">セットアップ対象者</label>
                <input
                  type="text"
                  className="input"
                  value={form.targetName}
                  onChange={(e) => handleChange('targetName', e.target.value)}
                  placeholder="対象者の名前を入力"
                />
              </div>

              <div className="field">
                <label className="label">表情・状態</label>
                <textarea
                  className="textarea"
                  value={form.condition}
                  onChange={(e) => handleChange('condition', e.target.value)}
                  placeholder="複数行で入力できます"
                />
              </div>

              <div className="field">
                <label className="label">
                  話した内容（ホットスポット・ネガスポット）
                </label>
                <textarea
                  className="textarea"
                  value={form.talkedContent}
                  onChange={(e) => handleChange('talkedContent', e.target.value)}
                  placeholder="複数行で入力できます"
                />
              </div>

              <div className="field">
                <label className="label">どういう着地APになったか</label>
                <textarea
                  className="textarea"
                  value={form.closingAp}
                  onChange={(e) => handleChange('closingAp', e.target.value)}
                  placeholder="複数行で入力できます"
                />
              </div>
            </div>

            <div className="previewCard">
              <h2 className="sectionTitle">Preview & Copy</h2>

              <div className="previewBox">
                <pre className="previewText">{previewText}</pre>
              </div>

              <div className="buttonRow">
                <button className="saveButton" onClick={handleSave}>
                  保存
                </button>
                <button className="resetButton" onClick={handleReset}>
                  リセット
                </button>
                <button className="copyButton" onClick={handleCopy}>
                  コピー
                </button>
              </div>

              <div className="statusArea">
                {saved && <p className="status saved">保存しました</p>}
                {copied && <p className="status copied">コピーしました</p>}
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          © 2026 セットアップシート. All rights reserved.
        </footer>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%);
          padding: 32px 16px;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .header {
          background: #ffffff;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          margin-bottom: 24px;
        }

        .badge {
          display: inline-block;
          margin: 0 0 10px 0;
          padding: 6px 12px;
          background: #e8f0ff;
          color: #2f5fd7;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }

        .title {
          margin: 0;
          font-size: 34px;
          font-weight: 700;
          color: #1c2434;
        }

        .subtitle {
          margin-top: 10px;
          margin-bottom: 0;
          font-size: 15px;
          color: #5f6b85;
          line-height: 1.7;
        }

        .mainCard {
          background: #ffffff;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .tabArea {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          border-bottom: 1px solid #e5ecf6;
          padding-bottom: 16px;
        }

        .activeTab {
          border: none;
          background: #2f5fd7;
          color: #ffffff;
          padding: 12px 18px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .contentArea {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 20px;
        }

        .inputCard,
        .previewCard {
          background: #f8fbff;
          border: 1px solid #dbe5f4;
          border-radius: 20px;
          padding: 20px;
        }

        .sectionTitle {
          margin: 0 0 16px 0;
          font-size: 20px;
          font-weight: 700;
          color: #1c2434;
        }

        .formGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .field {
          margin-bottom: 16px;
        }

        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #33415c;
        }

        .input,
        .textarea {
          width: 100%;
          border: 1px solid #cfd8ea;
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 14px;
          background: #ffffff;
          color: #1c2434;
          box-sizing: border-box;
          outline: none;
        }

        .input:focus,
        .textarea:focus {
          border-color: #2f5fd7;
          box-shadow: 0 0 0 3px rgba(47, 95, 215, 0.12);
        }

        .textarea {
          min-height: 130px;
          resize: vertical;
          line-height: 1.6;
        }

        .previewBox {
          min-height: 420px;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid #dbe5f4;
          padding: 20px;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .previewText {
          margin: 0;
          font-size: 14px;
          line-height: 1.8;
          color: #33415c;
          font-family: Arial, sans-serif;
          white-space: pre-wrap;
        }

        .buttonRow {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .saveButton,
        .resetButton,
        .copyButton {
          padding: 12px 18px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .saveButton {
          border: none;
          background: #16a34a;
          color: #ffffff;
        }

        .resetButton {
          border: 1px solid #cfd8ea;
          background: #ffffff;
          color: #33415c;
        }

        .copyButton {
          border: none;
          background: #2f5fd7;
          color: #ffffff;
        }

        .statusArea {
          margin-top: 12px;
          min-height: 24px;
        }

        .status {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
        }

        .saved {
          color: #15803d;
        }

        .copied {
          color: #1d4ed8;
        }

        .footer {
          text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: #7b86a0;
        }

        @media (max-width: 900px) {
          .contentArea {
            grid-template-columns: 1fr;
          }

          .previewBox {
            min-height: 280px;
          }
        }

        @media (max-width: 640px) {
          .page {
            padding: 20px 12px;
          }

          .header,
          .mainCard,
          .inputCard,
          .previewCard {
            border-radius: 18px;
          }

          .header {
            padding: 20px;
          }

          .mainCard {
            padding: 16px;
          }

          .inputCard,
          .previewCard {
            padding: 16px;
          }

          .title {
            font-size: 28px;
          }

          .formGrid {
            grid-template-columns: 1fr;
          }

          .buttonRow {
            justify-content: stretch;
          }

          .saveButton,
          .resetButton,
          .copyButton {
            width: 100%;
          }

          .activeTab {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
