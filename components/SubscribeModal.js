import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function SubscribeModal() {
  const { lang, modalOpen, closeSubscribeModal } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeSubscribeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeSubscribeModal]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeSubscribeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    const payload = {
      name,
      email,
      company: '',
      inquiryType: '정부 지원사업 알림 신청',
      message: 'AI 영상 제작 관련 정부 지원사업 알림 신청',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || '전송 실패');
      setStatus(lang === 'ko'
        ? '신청이 완료되었습니다. 내일 아침부터 받아보실 수 있습니다.'
        : "Successfully subscribed. You'll start receiving updates tomorrow morning.");
      setName('');
      setEmail('');
      setTimeout(closeSubscribeModal, 1800);
    } catch (err) {
      setStatus(err.message || (lang === 'ko' ? '신청 중 오류가 발생했습니다.' : 'An error occurred. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  if (!modalOpen) return null;

  return (
    <div className="sub-overlay open" onClick={handleOverlayClick}>
      <div className="sub-modal">
        <button className="sub-close" onClick={closeSubscribeModal} aria-label="닫기">&#x2715;</button>

        <p className="s-label ko" style={{ marginBottom: '6px' }}>정부 지원사업 알림</p>
        <p className="s-label en" style={{ marginBottom: '6px' }}>Government Support Alerts</p>
        <h2 className="sub-modal-title ko">AI 영상 관련 지원사업,<br />매일 받아보세요</h2>
        <h2 className="sub-modal-title en">Stay Updated on<br />AI Video Support Programs</h2>
        <p className="sub-modal-desc ko">AI 영상 제작 관련 정부 지원사업 정보를 매일 아침 이메일로 보내드립니다.</p>
        <p className="sub-modal-desc en">Get daily email updates on government support programs related to AI video production.</p>

        <form onSubmit={handleSubmit}>
          <div className="fg">
            <label className="flabel ko">이름</label>
            <label className="flabel en">Name</label>
            <input
              type="text"
              className="finput"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="fg">
            <label className="flabel">Email</label>
            <input
              type="email"
              className="finput"
              placeholder="email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="fsubmit"
            disabled={loading}
            style={{ marginTop: '10px', opacity: loading ? 0.7 : 1 }}
          >
            <span className="ko">신청하기</span>
            <span className="en">Subscribe</span>
          </button>
          {status && (
            <p style={{
              marginTop: '12px',
              fontSize: '13px',
              color: status.includes('완료') || status.includes('Successfully') ? '#1d4ed8' : '#dc2626'
            }}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
