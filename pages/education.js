import Head from 'next/head';
import { useState } from 'react';

const courseNames = ['산업 현장 안전 기초', '고위험 작업 안전 심화'];

function buildCal(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0 = 일요일
  const daysInMonth = new Date(year, month, 0).getDate();
  const trailingCells = (7 - (firstDay + daysInMonth) % 7) % 7;
  return { firstDay, daysInMonth, trailingCells };
}

export default function Education() {
  const [page, setPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [resultCourse, setResultCourse] = useState('');
  const [calView, setCalView] = useState('cal');
  const todayObj = new Date();
  const todayYear = todayObj.getFullYear();
  const todayMonth = todayObj.getMonth() + 1;
  const todayDate = todayObj.getDate();
  const [monthLabel, setMonthLabel] = useState(
    todayYear + ' / ' + String(todayMonth).padStart(2, '0')
  );
  const [enrollData, setEnrollData] = useState({ name: '', company: '', email: '', phone: '', msg: '' });

  const showPage = (name) => setPage(name);

  const changeMonth = (dir) => {
    const [y, mo] = monthLabel.split(' / ').map(Number);
    let nm = mo + dir, ny = y;
    if (nm > 12) { nm = 1; ny++; }
    if (nm < 1) { nm = 12; ny--; }
    setMonthLabel(ny + ' / ' + String(nm).padStart(2, '0'));
  };

  const submitEnroll = () => {
    if (!enrollData.name || !enrollData.email || !enrollData.phone) {
      alert('이름, 이메일, 연락처는 필수 입력 항목입니다.');
      return;
    }
    setResultCourse(courseNames[selectedCourse]);
    setEnrollSubmitted(true);
  };

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
            <div className={`lms-page${page === 'home' ? ' active' : ''}`} style={{ paddingTop: 0 }}>
              <div className="lms-hero">
                <div className="hero-eyebrow">Safety Education · LMS</div>
                <div className="hero-title">안전 교육,<br />이제는 다르게<em></em></div>
                <div className="hero-sub">시네마틱 스토리텔링과 AI 분석을 결합한 산업 안전 교육 <br />근로자가 실제로 보고, 기억하고, 행동을 바꾸는 콘텐츠입니다.</div>
                <div className="hero-cta">
                  <button className="lms-btn-primary" onClick={() => showPage('enroll')}>수강 신청하기</button>
                  <button className="lms-btn-outline" onClick={() => showPage('preview')}>맛보기 샘플 보기</button>
                </div>
              </div>

              {/* 맛보기 샘플 섹션 — 준비 중 (주석 처리)
              <div className="section-label">맛보기 샘플</div>
              <div className="section-title">추천 무료 샘플</div>
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--lms-muted)', fontSize: '16px' }}>
                맛보기 샘플 영상을 준비 중입니다. 곧 만나보실 수 있습니다.
              </div>
              */}

              <div className="two-col">
                <div>
                  <div className="section-label">교육 과정</div>
                  <div className="section-title">현재 개설 과정</div>
                  <div style={{ padding: '80px 0 32px', textAlign: 'center', color: 'var(--lms-muted)', fontSize: '16px' }}>
                    현재 개설 중인 과정이 없습니다. 곧 새로운 과정이 개설될 예정입니다.
                  </div>
                </div>
                <div>
                  <div className="section-label">교육 일정</div>
                  <div className="section-title">이달의 일정</div>
                  <div className="schedule-widget">
                    <div className="mini-calendar">
                      {['일','월','화','수','목','금','토'].map((d) => <div key={d} className="cal-day-label">{d}</div>)}
                      {(() => {
                        const { firstDay, daysInMonth, trailingCells } = buildCal(todayYear, todayMonth);
                        return [
                          ...Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} className="cal-day" />),
                          ...Array.from({ length: daysInMonth }, (_, i) => {
                            const d = i + 1;
                            return <div key={d} className={`cal-day${d === todayDate ? ' today' : ''}`}>{d}</div>;
                          }),
                          ...Array.from({ length: trailingCells }, (_, i) => <div key={`t${i}`} className="cal-day" />),
                        ];
                      })()}
                    </div>
                    <button style={{ marginTop: '14px', fontSize: '14px', padding: '7px 14px', background: 'none', border: '1px solid var(--lms-border)', color: 'var(--lms-text)', cursor: 'pointer' }} onClick={() => showPage('schedule')}>전체 일정 보기 →</button>
                  </div>
                </div>
              </div>
            </div>

            {/* PREVIEW */}
            <div className={`lms-page${page === 'preview' ? ' active' : ''}`} style={{ paddingTop: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans','Noto Sans KR',sans-serif", fontSize: '13px', letterSpacing: '0.15em', color: 'var(--lms-muted)', marginBottom: '16px' }}>COMING SOON</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '14px' }}>오픈 예정</div>
                <div style={{ fontSize: '16px', color: 'var(--lms-muted)' }}>샘플 영상을 준비 중입니다.</div>
              </div>
            </div>

            {/* SCHEDULE */}
            <div className={`lms-page${page === 'schedule' ? ' active' : ''}`} style={{ paddingTop: '2rem' }}>
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
                  {(() => {
                    const [calYear, calMonth] = monthLabel.split(' / ').map(Number);
                    const { firstDay, daysInMonth, trailingCells } = buildCal(calYear, calMonth);
                    const isCurrentMonth = calYear === todayYear && calMonth === todayMonth;
                    return [
                      ...Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} className="cal-cell empty" />),
                      ...Array.from({ length: daysInMonth }, (_, i) => {
                        const d = i + 1;
                        const isToday = isCurrentMonth && d === todayDate;
                        return (
                          <div key={d} className={`cal-cell${isToday ? ' today-cell' : ''}`}>
                            <div className="cal-num">{d}</div>
                          </div>
                        );
                      }),
                      ...Array.from({ length: trailingCells }, (_, i) => <div key={`t${i}`} className="cal-cell empty" />),
                    ];
                  })()}
                </div>
              )}

              {calView === 'list' && (
                <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--lms-muted)', fontSize: '16px' }}>
                  현재 개설 중인 과정이 없습니다. 곧 새로운 과정이 개설될 예정입니다.
                </div>
              )}
            </div>

            {/* ENROLL */}
            <div className={`lms-page${page === 'enroll' ? ' active' : ''}`} style={{ paddingTop: 0 }}>
              {!enrollSubmitted ? (
                <div>
                  <div className="enroll-intro">
                    <div className="enroll-intro-eyebrow">Course Enrollment</div>
                    <div className="enroll-intro-title">수강 신청</div>
                    <div className="enroll-intro-sub">원하시는 과정을 선택하고 정보를 입력해 주세요. 담당자가 확인 후 연락드립니다.</div>
                  </div>

                  <div className="section-label" style={{ marginBottom: '1rem' }}>과정 선택</div>
                  <div className="course-select-grid">
                    <div className={`course-option${selectedCourse === 0 ? ' selected' : ''}`} onClick={() => setSelectedCourse(0)}>
                      <div className="co-tag">LEVEL 1 · 제조 / 건설</div>
                      <div className="co-name">산업 현장 안전 기초</div>
                      <div className="co-meta"><span>8주 · 주 2회 (화·목)</span><span>개설 예정</span></div>
                      <div className="co-check"><div className="co-check-inner" /></div>
                    </div>
                    <div className="course-option" style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div className="co-tag" style={{ marginBottom: 0 }}>LEVEL 2 · 플랜트 / 시공사</div>
                        <span style={{ fontSize: '11px', padding: '2px 7px', border: '1px solid var(--lms-muted)', color: 'var(--lms-muted)', letterSpacing: '0.06em' }}>개설 예정</span>
                      </div>
                      <div className="co-name">고위험 작업 안전 심화</div>
                      <div className="co-meta"><span>6주 · 주 3회 (월·수·금)</span><span>개설 예정</span></div>
                      <div className="co-check"><div className="co-check-inner" /></div>
                    </div>
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

    </>
  );
}
