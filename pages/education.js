import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';

const vidData = [
  { tag: 'MANUFACTURING', title: '생산 라인 끼임 사고 예방', desc: '생산 설비 주변에서 발생할 수 있는 끼임 사고의 원인과 예방 수칙을 실제 사례 기반 시네마틱 영상으로 전달합니다.', views: '조회 3,218회', bg: '#1a1612' },
  { tag: 'CONSTRUCTION', title: '고소 작업 추락 방지 실무', desc: '고소 작업 시 안전대 착용법, 안전 발판 설치 기준, 추락 방지 체크리스트를 현장 재연 영상으로 설명합니다.', views: '조회 2,740회', bg: '#101618' },
  { tag: 'HEAVY INDUSTRY', title: '밀폐 공간 진입 전 체크리스트', desc: '밀폐 공간 작업의 위험성과 진입 전 산소 농도 측정, 환기 절차, 감시인 배치 요령을 다룹니다.', views: '조회 1,965회', bg: '#141210' },
  { tag: 'FIRE SAFETY', title: '화재 대피 경로 실습 시나리오', desc: '실제 화재 상황을 가정한 대피 시나리오를 시네마틱 연출로 재현해 기억에 남는 화재 대응 행동을 교육합니다.', views: '조회 2,100회', bg: '#0e1410' },
  { tag: 'HAZMAT', title: '위험물 취급 안전 수칙', desc: '화학물질 및 위험물 취급 시 보호구 착용, 보관 기준, 누출 대응 절차를 사례 영상으로 안내합니다.', views: '조회 1,430회', bg: '#161210' },
  { tag: 'ELECTRICAL', title: '전기 작업 안전 기초', desc: '전기 작업 전 차단 확인, 접지, 절연 장갑 착용 등 기본 안전 수칙과 감전 사고 예방법을 소개합니다.', views: '조회 1,580회', bg: '#101416' },
];

const galleryFill = ['rgba(200,169,110,0.6)', 'rgba(74,124,111,0.6)', 'rgba(150,109,42,0.6)', 'rgba(60,130,80,0.6)', 'rgba(180,90,40,0.6)', 'rgba(50,100,160,0.6)'];

const courseNames = ['산업 현장 안전 기초', '고위험 작업 안전 심화', '화재 대피 실습 집중 과정', '기업 맞춤형 안전 교육'];

const popupData = {
  '안전기초2기':  { tag: 'LEVEL 1 · 모집중', title: '산업 현장 안전 기초 — 2기', details: ['기간', '2026.04.08 ~ 05.31', '일정', '주 2회 (화·목)', '대상', '제조 / 건설 종사자', '잔여석', '5석'] },
  '고위험심화1기': { tag: 'LEVEL 2 · 모집중', title: '고위험 작업 안전 심화 — 1기', details: ['기간', '2026.04.10 ~ 05.15', '일정', '주 3회 (월·수·금)', '대상', '플랜트 / 시공사 종사자', '잔여석', '3석'] },
  '안전기초3기':  { tag: 'LEVEL 1 · 신청예정', title: '산업 현장 안전 기초 — 3기', details: ['기간', '2026.04.16 ~ 06.04', '일정', '주 2회 (화·목)', '대상', '제조 / 건설 종사자', '잔여석', '12석'] },
  '화재대피실습': { tag: 'INTENSIVE · 신청예정', title: '화재 대피 실습 집중 과정', details: ['기간', '2026.04.25 ~ 05.09', '일정', '주 2회 (화·토)', '대상', '전 산업군', '잔여석', '18석'] },
};

export default function Education() {
  const [page, setPage] = useState('home');
  const [playPct, setPlayPct] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [currentVid, setCurrentVid] = useState(0);
  const [playerLabel, setPlayerLabel] = useState('영상을 선택하거나 재생을 눌러주세요');
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [resultCourse, setResultCourse] = useState('');
  const [popup, setPopup] = useState(null);
  const [calView, setCalView] = useState('cal');
  const [monthLabel, setMonthLabel] = useState('2026 / 04');
  const [enrollData, setEnrollData] = useState({ name: '', company: '', email: '', phone: '', msg: '' });
  const timerRef = useRef(null);

  const showPage = (name) => {
    setPage(name);
    clearInterval(timerRef.current);
  };

  const startPlay = () => {
    clearInterval(timerRef.current);
    setPlaying(true);
    setPlayerLabel('재생 중...');
    setPlayPct(0);
    setShowCta(false);
    let pct = 0;
    timerRef.current = setInterval(() => {
      pct += 2;
      setPlayPct(pct);
      if (pct >= 100) {
        clearInterval(timerRef.current);
        setPlayerLabel('시청 완료');
        setShowCta(true);
      }
    }, 120);
  };

  const selectVid = (idx) => {
    clearInterval(timerRef.current);
    setPlayPct(0);
    setShowCta(false);
    setCurrentVid(idx);
    setPlayerLabel(vidData[idx].title);
    startPlay();
  };

  const goPreview = (idx) => {
    setPage('preview');
    selectVid(idx);
  };

  const changeMonth = (dir) => {
    const [y, mo] = monthLabel.split(' / ').map(Number);
    let nm = mo + dir, ny = y;
    if (nm > 12) { nm = 1; ny++; }
    if (nm < 1) { nm = 12; ny--; }
    setMonthLabel(ny + ' / ' + String(nm).padStart(2, '0'));
  };

  const showPopup = (key) => setPopup(popupData[key]);
  const closePopup = () => setPopup(null);

  const submitEnroll = () => {
    if (!enrollData.name || !enrollData.email || !enrollData.phone) {
      alert('이름, 이메일, 연락처는 필수 입력 항목입니다.');
      return;
    }
    setResultCourse(courseNames[selectedCourse]);
    setEnrollSubmitted(true);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const lnbPages = ['home', 'preview', 'schedule', 'enroll'];

  return (
    <>
      <Head>
        <title>안전 교육 · Anagram Communications, Inc.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="lms-wrap">
        <div className="lms-body">

          {/* LNB */}
          <div className="lnb">
            <div className="lnb-title">안전 교육</div>
            {[
              { key: 'home', label: '홈' },
              { key: 'preview', label: '맛보기 샘플' },
              { key: 'schedule', label: '교육 일정' },
              { key: 'enroll', label: '수강 신청' },
            ].map((item) => (
              <div
                key={item.key}
                className={`lnb-item${page === item.key ? ' active' : ''}`}
                onClick={() => showPage(item.key)}
              >
                <span className="lnb-dot" />
                {item.label}
              </div>
            ))}
          </div>

          {/* MAIN */}
          <div className="lms-main">

            {/* HOME */}
            <div className={`lms-page${page === 'home' ? ' active' : ''}`}>
              <div className="lms-hero">
                <div className="hero-eyebrow">Safety Education · LMS</div>
                <div className="hero-title">안전 교육,<br />이제는 다르게<em></em></div>
                <div className="hero-sub">시네마틱 스토리텔링과 AI 분석을 결합한 산업 안전 교육 — 근로자가 실제로 보고, 기억하고, 행동을 바꾸는 콘텐츠입니다.</div>
                <div className="hero-cta">
                  <button className="lms-btn-primary" onClick={() => showPage('enroll')}>수강 신청하기</button>
                  <button className="lms-btn-outline" onClick={() => showPage('preview')}>맛보기 샘플 보기</button>
                </div>
              </div>

              <div className="section-label">맛보기 샘플</div>
              <div className="section-title">추천 무료 샘플</div>
              <div className="vid-grid">
                {vidData.slice(0, 3).map((v, i) => (
                  <div key={i} className="vid-card" onClick={() => goPreview(i)}>
                    <div className="vid-thumb" style={{ background: v.bg }}>
                      <div className="vid-play">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <div className="vid-views">{v.views.replace('조회 ', '').replace('회', ' views')}</div>
                    </div>
                    <div className="vid-info">
                      <div className="vid-tag">{v.tag}</div>
                      <div className="vid-title">{v.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="two-col">
                <div>
                  <div className="section-label">교육 과정</div>
                  <div className="section-title">현재 개설 과정</div>
                  <div className="course-list">
                    {[
                      { level: 'LEVEL 1', name: '산업 현장 안전 기초', meta: ['8주', '주 2회', '제조 / 건설'] },
                      { level: 'LEVEL 2', name: '고위험 작업 안전 심화', meta: ['6주', '주 3회', '플랜트 / 시공사'] },
                    ].map((c) => (
                      <div key={c.level} className="course-card" onClick={() => showPage('enroll')}>
                        <div>
                          <div className="course-badge">{c.level}</div>
                          <div className="course-name" style={{ marginTop: '6px' }}>{c.name}</div>
                          <div className="course-meta">{c.meta.map((m) => <span key={m}>{m}</span>)}</div>
                        </div>
                        <div className="course-arrow">→</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="section-label">교육 일정</div>
                  <div className="section-title">이달의 일정</div>
                  <div className="schedule-widget">
                    <div className="mini-calendar">
                      {['일','월','화','수','목','금','토'].map((d) => <div key={d} className="cal-day-label">{d}</div>)}
                      <div className="cal-day" /><div className="cal-day" />
                      {[1,2,3,4,5].map((d) => <div key={d} className="cal-day">{d}</div>)}
                      {[6,7].map((d) => <div key={d} className="cal-day">{d}</div>)}
                      <div className="cal-day has-event">8</div>
                      <div className="cal-day">9</div>
                      <div className="cal-day has-event">10</div>
                      {[11,12,13].map((d) => <div key={d} className="cal-day">{d}</div>)}
                      <div className="cal-day today">14</div>
                      <div className="cal-day">15</div>
                      <div className="cal-day has-event">16</div>
                      {[17,18,19,20,21].map((d) => <div key={d} className="cal-day">{d}</div>)}
                      <div className="cal-day has-event">22</div>
                      <div className="cal-day">23</div>
                      <div className="cal-day">24</div>
                      <div className="cal-day has-event">25</div>
                      {[26,27,28,29,30].map((d) => <div key={d} className="cal-day">{d}</div>)}
                      <div className="cal-day" /><div className="cal-day" /><div className="cal-day" />
                    </div>
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--lms-border)' }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans','Noto Sans KR',sans-serif", fontSize: '12px', color: 'var(--lms-muted)', letterSpacing: '0.08em', marginBottom: '6px' }}>다가오는 과정</div>
                      <div style={{ fontSize: '16px', color: 'var(--lms-text)', padding: '6px 0', borderBottom: '1px solid var(--lms-border)' }}>
                        <span style={{ color: 'var(--lms-accent)', fontSize: '12px' }}>4/16</span>&nbsp;&nbsp;산업 안전 기초 — 3기 개강
                      </div>
                      <div style={{ fontSize: '16px', color: 'var(--lms-text)', padding: '6px 0' }}>
                        <span style={{ color: 'var(--lms-accent2)', fontSize: '12px' }}>4/22</span>&nbsp;&nbsp;고위험 안전 심화 — 1기 개강
                      </div>
                    </div>
                    <button style={{ marginTop: '14px', fontSize: '14px', padding: '7px 14px', background: 'none', border: '1px solid var(--lms-border)', color: 'var(--lms-text)', cursor: 'pointer' }} onClick={() => showPage('schedule')}>전체 일정 보기 →</button>
                  </div>
                </div>
              </div>
            </div>

            {/* PREVIEW */}
            <div className={`lms-page${page === 'preview' ? ' active' : ''}`}>
              <div className="section-label">맛보기 샘플</div>
              <div className="preview-player">
                <div style={{ textAlign: 'center' }}>
                  <div className="big-play" onClick={startPlay}>
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <div className="player-title-text">{playerLabel}</div>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: playPct + '%' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans','Noto Sans KR',sans-serif", fontSize: '12px', color: 'var(--lms-accent2)', letterSpacing: '0.1em', marginBottom: '4px' }}>{vidData[currentVid].tag}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '6px' }}>{vidData[currentVid].title}</div>
                  <div style={{ fontSize: '16px', color: 'var(--lms-muted)' }}>{vidData[currentVid].desc}</div>
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans','Noto Sans KR',sans-serif", fontSize: '13px', color: 'var(--lms-muted)', whiteSpace: 'nowrap' }}>{vidData[currentVid].views}</div>
              </div>

              {showCta && (
                <div className="cta-banner">
                  <div className="cta-banner-left">
                    <h3>이 영상이 포함된 정규 과정</h3>
                    <p>산업 현장 안전 기초 — 8주 과정</p>
                  </div>
                  <button className="lms-btn-primary" onClick={() => showPage('enroll')}>수강 신청하기 →</button>
                </div>
              )}

              <div className="section-label" style={{ marginTop: '2rem' }}>영상 목록</div>
              <div className="vid-gallery">
                {vidData.map((v, i) => (
                  <div key={i} className={`vid-item${currentVid === i ? ' playing' : ''}`} onClick={() => selectVid(i)}>
                    <div className="vid-item-thumb" style={{ background: v.bg }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={galleryFill[i]}><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <div className="vid-item-info">
                      <div className="vid-item-title">{v.title}</div>
                      <div className="vid-item-dur">{['05:12','06:48','04:30','07:05','05:55','04:22'][i]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SCHEDULE */}
            <div className={`lms-page${page === 'schedule' ? ' active' : ''}`}>
              <div className="cal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button className="cal-nav-btn" onClick={() => changeMonth(-1)}>‹</button>
                  <div className="cal-month-label">{monthLabel}</div>
                  <button className="cal-nav-btn" onClick={() => changeMonth(1)}>›</button>
                </div>
                <div className="view-toggle">
                  <button className={`view-btn${calView === 'cal' ? ' active' : ''}`} onClick={() => setCalView('cal')}>캘린더</button>
                  <button className={`view-btn${calView === 'list' ? ' active' : ''}`} onClick={() => setCalView('list')}>목록</button>
                </div>
              </div>

              {calView === 'cal' && (
                <div className="full-calendar">
                  {['SUN','MON','TUE','WED','THU','FRI','SAT'].map((d) => <div key={d} className="cal-head">{d}</div>)}
                  <div className="cal-cell empty" /><div className="cal-cell empty" />
                  <div className="cal-cell"><div className="cal-num">1</div></div>
                  <div className="cal-cell"><div className="cal-num">2</div></div>
                  <div className="cal-cell"><div className="cal-num">3</div></div>
                  <div className="cal-cell"><div className="cal-num">4</div></div>
                  <div className="cal-cell"><div className="cal-num">5</div></div>
                  <div className="cal-cell"><div className="cal-num">6</div></div>
                  <div className="cal-cell"><div className="cal-num">7</div></div>
                  <div className="cal-cell"><div className="cal-num">8</div><div className="cal-event ev-start" onClick={() => showPopup('안전기초2기')}>안전 기초 2기</div></div>
                  <div className="cal-cell"><div className="cal-num">9</div></div>
                  <div className="cal-cell"><div className="cal-num">10</div><div className="cal-event ev-class" onClick={() => showPopup('고위험심화1기')}>고위험 심화 1기</div></div>
                  <div className="cal-cell"><div className="cal-num">11</div></div>
                  <div className="cal-cell"><div className="cal-num">12</div></div>
                  <div className="cal-cell"><div className="cal-num">13</div></div>
                  <div className="cal-cell today-cell"><div className="cal-num">14</div><div className="cal-event ev-start" onClick={() => showPopup('안전기초2기')}>안전 기초 2기</div></div>
                  <div className="cal-cell"><div className="cal-num">15</div></div>
                  <div className="cal-cell"><div className="cal-num">16</div><div className="cal-event ev-start" onClick={() => showPopup('안전기초3기')}>안전 기초 3기</div></div>
                  <div className="cal-cell"><div className="cal-num">17</div></div>
                  <div className="cal-cell"><div className="cal-num">18</div></div>
                  <div className="cal-cell"><div className="cal-num">19</div></div>
                  <div className="cal-cell"><div className="cal-num">20</div></div>
                  <div className="cal-cell"><div className="cal-num">21</div></div>
                  <div className="cal-cell"><div className="cal-num">22</div><div className="cal-event ev-class" onClick={() => showPopup('고위험심화1기')}>고위험 심화 1기</div></div>
                  <div className="cal-cell"><div className="cal-num">23</div></div>
                  <div className="cal-cell"><div className="cal-num">24</div></div>
                  <div className="cal-cell"><div className="cal-num">25</div><div className="cal-event ev-start" onClick={() => showPopup('화재대피실습')}>화재 대피 실습</div></div>
                  <div className="cal-cell"><div className="cal-num">26</div></div>
                  <div className="cal-cell"><div className="cal-num">27</div></div>
                  <div className="cal-cell"><div className="cal-num">28</div></div>
                  <div className="cal-cell"><div className="cal-num">29</div></div>
                  <div className="cal-cell"><div className="cal-num">30</div></div>
                  <div className="cal-cell empty" /><div className="cal-cell empty" /><div className="cal-cell empty" />
                </div>
              )}

              {calView === 'list' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--lms-border)', border: '1px solid var(--lms-border)' }}>
                  {[
                    { date: '4/8 → 5/31', name: '산업 현장 안전 기초 — 2기', meta: '주 2회 (화·목) · 8주', color: 'var(--lms-accent)' },
                    { date: '4/10 → 5/15', name: '고위험 작업 안전 심화 — 1기', meta: '주 3회 (월·수·금) · 6주', color: 'var(--lms-accent2)' },
                    { date: '4/16 → 6/4', name: '산업 현장 안전 기초 — 3기', meta: '주 2회 (화·목) · 8주', color: 'var(--lms-accent)' },
                    { date: '4/25 → 5/9', name: '화재 대피 실습 집중 과정', meta: '주 2회 (화·토) · 2주', color: 'var(--lms-muted)' },
                  ].map((item) => (
                    <div key={item.name} style={{ background: 'var(--lms-card-bg)', padding: '14px 18px', display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: '16px', alignItems: 'center', fontSize: '16px' }}>
                      <div style={{ fontSize: '12px', color: item.color }}>{item.date}</div>
                      <div>
                        <div style={{ fontWeight: 500, marginBottom: '2px' }}>{item.name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--lms-muted)' }}>{item.meta}</div>
                      </div>
                      <button className="btn-sm" onClick={() => showPage('enroll')}>신청</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ENROLL */}
            <div className={`lms-page${page === 'enroll' ? ' active' : ''}`}>
              {!enrollSubmitted ? (
                <div>
                  <div className="enroll-intro">
                    <div className="enroll-intro-eyebrow">Course Enrollment</div>
                    <div className="enroll-intro-title">수강 신청</div>
                    <div className="enroll-intro-sub">원하시는 과정을 선택하고 정보를 입력해 주세요. 담당자가 확인 후 연락드립니다.</div>
                  </div>

                  <div className="section-label" style={{ marginBottom: '1rem' }}>과정 선택</div>
                  <div className="course-select-grid">
                    {[
                      { tag: 'LEVEL 1 · 제조 / 건설', name: '산업 현장 안전 기초', meta: ['8주 · 주 2회 (화·목)', '2026.04.16 개강 (3기)'] },
                      { tag: 'LEVEL 2 · 플랜트 / 시공사', name: '고위험 작업 안전 심화', meta: ['6주 · 주 3회 (월·수·금)', '2026.04.22 개강 (1기)'] },
                      { tag: 'INTENSIVE · 전 산업군', name: '화재 대피 실습 집중 과정', meta: ['2주 · 주 2회 (화·토)', '2026.04.25 개강'] },
                      { tag: 'CORPORATE · 기업 맞춤', name: '기업 맞춤형 안전 교육', meta: ['일정 협의', '별도 문의'] },
                    ].map((c, i) => (
                      <div key={i} className={`course-option${selectedCourse === i ? ' selected' : ''}`} onClick={() => setSelectedCourse(i)}>
                        <div className="co-tag">{c.tag}</div>
                        <div className="co-name">{c.name}</div>
                        <div className="co-meta">{c.meta.map((m) => <span key={m}>{m}</span>)}</div>
                        <div className="co-check"><div className="co-check-inner" /></div>
                      </div>
                    ))}
                  </div>

                  <div className="form-section-title">신청자 정보</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">이름 <span>*</span></label>
                      <input type="text" className="form-input" placeholder="홍길동" value={enrollData.name} onChange={(e) => setEnrollData(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">소속 회사</label>
                      <input type="text" className="form-input" placeholder="(주)Anagram" value={enrollData.company} onChange={(e) => setEnrollData(p => ({ ...p, company: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">이메일 <span>*</span></label>
                      <input type="email" className="form-input" placeholder="email@company.com" value={enrollData.email} onChange={(e) => setEnrollData(p => ({ ...p, email: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">연락처 <span>*</span></label>
                      <input type="text" className="form-input" placeholder="010-0000-0000" value={enrollData.phone} onChange={(e) => setEnrollData(p => ({ ...p, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">문의사항</label>
                    <textarea className="form-input" rows={3} placeholder="궁금한 점이나 특이 사항을 자유롭게 적어주세요." style={{ resize: 'vertical' }} value={enrollData.msg} onChange={(e) => setEnrollData(p => ({ ...p, msg: e.target.value }))} />
                    <div className="form-hint">담당자가 2영업일 이내에 연락드립니다.</div>
                  </div>
                  <div className="submit-area">
                    <div className="agree-txt">신청 시 <a href="#">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.</div>
                    <button className="btn-submit" onClick={submitEnroll}>신청하기</button>
                  </div>
                </div>
              ) : (
                <div className="enroll-result">
                  <div className="result-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#4a7c6f" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <div className="result-title">신청이 완료되었습니다</div>
                  <div className="result-sub">입력하신 이메일로 신청 확인 메일이 발송됩니다.<br />담당자가 2영업일 이내에 연락드리겠습니다.</div>
                  <div className="result-course-box">
                    <div className="rc-label">신청 과정</div>
                    <div className="rc-name">{resultCourse}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button className="btn-submit" onClick={() => { showPage('home'); setEnrollSubmitted(false); }}>홈으로 이동</button>
                    <button style={{ padding: '13px 36px', fontSize: '16px', background: 'none', border: '1px solid var(--lms-border)', color: 'var(--lms-text)', cursor: 'pointer' }} onClick={() => showPage('preview')}>맛보기 샘플 보기</button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <div className="popup-overlay show" onClick={(e) => { if (e.target === e.currentTarget) closePopup(); }}>
          <div className="popup">
            <button className="popup-close" onClick={closePopup}>✕</button>
            <div className="popup-tag">{popup.tag}</div>
            <div className="popup-title">{popup.title}</div>
            <dl className="popup-detail">
              {popup.details.reduce((acc, item, i) => {
                if (i % 2 === 0) acc.push([item]);
                else acc[acc.length - 1].push(item);
                return acc;
              }, []).map(([dt, dd]) => (
                <div key={dt} style={{ display: 'contents' }}>
                  <dt>{dt}</dt><dd>{dd}</dd>
                </div>
              ))}
            </dl>
            <button className="lms-btn-primary" style={{ width: '100%', padding: '12px' }} onClick={() => { showPage('enroll'); closePopup(); }}>수강 신청하기 →</button>
          </div>
        </div>
      )}
    </>
  );
}
