import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', inquiryType: '', message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Intersection Observer for .fu scroll animations
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fu').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || '전송 실패');
      setFormStatus('문의가 정상적으로 전송되었습니다.');
      setFormData({ name: '', company: '', email: '', inquiryType: '', message: '' });
    } catch (err) {
      setFormStatus(err.message || '문의 전송 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Anagram Communications, Inc.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg-img" />
        <div className="hero-overlay" />
        <div className="hero-lines" />

        <p className="hero-label">Cinematic Intelligence Safety Innovation</p>

        <h1 className="hero-h1">
          <span className="hero-white">Cinema</span><br />
          <span className="light-word">for</span><br />
          <span className="hero-white">Safety.</span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-desc ko">
            영화적 스토리텔링과 AI 분석을 결합해, 산업 현장에서 실제 행동 변화를 이끄는 안전교육 솔루션을 만듭니다.
          </p>
          <p className="hero-desc en">
            We combine cinematic storytelling and AI analytics to create safety education solutions that drive real behavioral change in industrial environments.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn-black ko">도입 문의하기</a>
            <a href="#contact" className="btn-black en">Get in Touch</a>
            <a href="#expertise" className="btn-line ko">전문 분야 보기</a>
            <a href="#expertise" className="btn-line en">Our Expertise</a>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* ABOUT */}
      <section id="about">
        <div className="wrap">
          <div className="about-center fu">
            <h2 className="about-title ko">안전 교육,<br />이제는 다르게 접근합니다</h2>
            <h2 className="about-title en">A new approach<br />to safety education</h2>
            <p className="about-body ko">전통적인 안전 교육은 규정 준수에 집중해 왔습니다. Anagram Communications는 영화제 수상 경력의 감독과 AI 전문가가 함께, 안전 교육을 진정한 스토리텔링의 영역으로 끌어올립니다.</p>
            <p className="about-body en">Traditional safety education has been about compliance. Anagram Communications, founded by an award-winning film director and AI specialist, elevates safety education into the realm of genuine storytelling.</p>
            <p className="about-body ko">직원들이 실제로 보고, 기억하고, 행동을 바꾸는 콘텐츠 - 그것이 우리의 목표입니다.</p>
            <p className="about-body en">Content that workers actually watch, remember, and act upon — that is our mission.</p>
            <div className="about-tags">
              <span className="atag ko">시네마틱 제작</span>
              <span className="atag en">Cinematic Production</span>
              <span className="atag ko">AI 행동 분석</span>
              <span className="atag en">AI Behavior Analysis</span>
              <span className="atag ko">전략 컨설팅</span>
              <span className="atag en">Strategic Consulting</span>
            </div>
          </div>

          <div className="about-quote ko fu d2">
            <p>&quot;안전 교육은 규정 준수가 아니라 참여에 관한 것이어야 합니다. 영화의 스토리텔링 기법과 AI의 정밀함을 결합해, 근로자들이 실제로 보고 기억하는 콘텐츠를 만듭니다.&quot;</p>
            <span>— Cho Yangil, Founder &amp; CEO</span>
          </div>
          <div className="about-quote en fu d2">
            <p>&quot;Safety education has traditionally been about compliance. We believe it should be about engagement — content that workers actually watch and remember.&quot;</p>
            <span>— Cho Yangil, Founder &amp; CEO</span>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* EXPERTISE */}
      <section id="expertise">
        <div className="wrap">
          <div className="s-head fu">
            <div>
              <p className="s-label ko">전문 분야</p>
              <p className="s-label en">Expertise</p>
              <h2 className="s-title ko">세 가지 핵심 역량</h2>
              <h2 className="s-title en">Three Core Competencies</h2>
            </div>
            <p className="s-head-right ko">영화, AI, 전략의 결합으로 안전 교육의 패러다임을 바꿉니다.</p>
            <p className="s-head-right en">Cinema, AI, and strategic consulting — redefining safety education together.</p>
          </div>
          <div className="exp-grid">
            <div className="ecard fu d1">
              <p className="ecard-num">01</p>
              <h3 className="ecard-title ko">시네마틱 프로덕션</h3>
              <h3 className="ecard-title en">Cinematic Production</h3>
              <span className="ecard-sub ko">Cinematic Production</span>
              <span className="ecard-sub en">시네마틱 프로덕션</span>
              <p className="ecard-body ko">영화제 수상 경력의 감독과 촬영감독이 직접 제작하는 감성적 안전 내러티브. 근로자의 마음을 움직이는 스토리텔링으로 안전 의식을 높입니다.</p>
              <p className="ecard-body en">Award-winning directing and cinematography to create emotionally resonant safety narratives that genuinely move workers and raise safety awareness.</p>
            </div>
            <div className="ecard fu d2">
              <p className="ecard-num">02</p>
              <h3 className="ecard-title ko">AI 행동 분석</h3>
              <h3 className="ecard-title en">AI Behavior Analysis</h3>
              <span className="ecard-sub ko">AI Behavior Analysis</span>
              <span className="ecard-sub en">AI 행동 분석</span>
              <p className="ecard-body ko">자체 개발 컴퓨터 비전 알고리즘으로 교육 참여도를 실시간 추적하고 안전 위험을 사전 예측합니다. 데이터 기반의 정밀한 인사이트를 제공합니다.</p>
              <p className="ecard-body en">Proprietary computer vision algorithms that track engagement in real-time and predict safety risks, delivering precise data-driven insights before incidents occur.</p>
            </div>
            <div className="ecard fu d3">
              <p className="ecard-num">03</p>
              <h3 className="ecard-title ko">전략 컨설팅</h3>
              <h3 className="ecard-title en">Strategic Consulting</h3>
              <span className="ecard-sub ko">Strategic Consulting</span>
              <span className="ecard-sub en">전략 컨설팅</span>
              <p className="ecard-body ko">Fortune 500 기업 전직 EHS 임원들이 기업 맞춤형 안전 전략을 수립합니다. 규정 준수를 넘어 조직 문화 변화까지 이끕니다.</p>
              <p className="ecard-body en">Tailored safety strategies by former EHS directors from Fortune 500 companies, driving transformation beyond compliance to genuine organizational culture change.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* SOLUTIONS */}
      <section id="solutions">
        <div className="wrap">
          <div className="s-head fu">
            <div>
              <p className="s-label ko">솔루션</p>
              <p className="s-label en">Solutions</p>
              <h2 className="s-title ko">우리가 제공하는 것</h2>
              <h2 className="s-title en">What We Deliver</h2>
            </div>
            <p className="s-head-right ko">Anagram Communications는 산업 현장에 맞춘 안전교육의 전 과정을 설계합니다.</p>
            <p className="s-head-right en">Anagram Communications designs the full workflow of safety education for real industrial environments.</p>
          </div>
          <div className="solutions-grid">
            <div className="solution-card fu d1">
              <p className="solution-num">01</p>
              <h3 className="solution-title ko">시네마틱 안전교육 콘텐츠 제작</h3>
              <h3 className="solution-title en">Cinematic Safety Content Production</h3>
              <p className="solution-body ko">산업 현장과 작업 환경에 맞춘 안전교육 영상과 스토리 기반 콘텐츠를 기획·제작합니다. 형식적인 전달을 넘어, 실제 근로자의 몰입과 기억에 남는 교육 경험을 만듭니다.</p>
              <p className="solution-body en">We produce safety education films and story-driven content tailored to industrial sites and working environments. Beyond formal instruction, we create engaging experiences that workers genuinely watch and remember.</p>
            </div>
            <div className="solution-card fu d2">
              <p className="solution-num">02</p>
              <h3 className="solution-title ko">AI 기반 참여도 및 행동 분석</h3>
              <h3 className="solution-title en">AI-Based Engagement &amp; Behavior Analysis</h3>
              <p className="solution-body ko">교육 과정에서의 참여도와 행동 데이터를 AI로 분석하여, 위험 신호와 개선 포인트를 도출합니다. 교육이 끝난 뒤에도 데이터 기반의 정밀한 인사이트를 제공합니다.</p>
              <p className="solution-body en">We analyze engagement and behavioral data through AI to identify risk signals and improvement points. Even after training is complete, we provide precise, data-driven insights for better safety decisions.</p>
            </div>
            <div className="solution-card fu d3">
              <p className="solution-num">03</p>
              <h3 className="solution-title ko">기업 맞춤형 도입 전략 설계</h3>
              <h3 className="solution-title en">Tailored Implementation Strategy</h3>
              <p className="solution-body ko">기업의 산업군, 현장 특성, 교육 목표에 맞춰 안전교육 운영 방식과 콘텐츠 적용 전략을 함께 설계합니다. 규정 준수를 넘어 조직의 안전 문화 정착까지 지원합니다.</p>
              <p className="solution-body en">We design implementation strategies based on each organization&apos;s industry, site conditions, and training goals. Our approach supports not only compliance, but also the long-term development of safety culture.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* PROCESS */}
      <section id="process">
        <div className="wrap">
          <div className="s-head fu">
            <div>
              <p className="s-label ko">프로젝트 진행 방식</p>
              <p className="s-label en">Process</p>
              <h2 className="s-title ko">협업 프로세스</h2>
              <h2 className="s-title en">How We Work</h2>
            </div>
            <p className="s-head-right ko">현장 이해부터 콘텐츠 제작, 분석과 개선까지 안전교육의 전 과정을 함께 설계합니다.</p>
            <p className="s-head-right en">From site diagnosis to content production, analysis, and optimization — we design the full safety education workflow together.</p>
          </div>
          <div className="process-list">
            {[
              {
                num: '01',
                titleKo: '현장 및 목표 분석', titleEn: 'Site & Goal Assessment',
                bodyKo: '산업 현장의 작업 환경, 위험 요소, 교육 대상, 조직의 안전 목표를 함께 파악합니다. 프로젝트의 방향성과 우선순위를 정의하는 첫 단계입니다.',
                bodyEn: 'We assess the industrial environment, risk factors, target audience, and organizational safety goals. This is the first step in defining project direction and priorities.',
                delay: 'd1',
              },
              {
                num: '02',
                titleKo: '교육 전략 및 스토리 설계', titleEn: 'Training Strategy & Story Design',
                bodyKo: '전달해야 할 메시지와 행동 변화를 기준으로 교육 전략을 수립하고, 스토리텔링 중심의 콘텐츠 구조와 시나리오를 설계합니다.',
                bodyEn: 'Based on the desired message and behavioral outcomes, we build the training strategy and design a story-driven content structure and scenario.',
                delay: 'd2',
              },
              {
                num: '03',
                titleKo: '시네마틱 콘텐츠 제작', titleEn: 'Cinematic Content Production',
                bodyKo: '감독, 촬영, 편집 등 영화 제작 방식으로 몰입도 높은 안전교육 콘텐츠를 제작합니다. 형식적인 교육 영상을 넘어 실제로 기억에 남는 장면을 만듭니다.',
                bodyEn: 'Using cinematic directing, cinematography, and editing, we produce immersive safety content. We go beyond formal training videos to create moments that workers genuinely remember.',
                delay: 'd3',
              },
              {
                num: '04',
                titleKo: 'AI 기반 참여도 및 행동 분석', titleEn: 'AI-Based Engagement & Behavior Analysis',
                bodyKo: '교육 참여도와 행동 데이터를 AI로 분석하여, 위험 신호와 개선 포인트를 도출합니다. 콘텐츠가 실제 현장에서 어떻게 작동하는지 정밀하게 파악합니다.',
                bodyEn: 'We analyze engagement and behavioral data through AI to identify risk signals and improvement opportunities. This helps us understand how the content performs in real working environments.',
                delay: '',
              },
              {
                num: '05',
                titleKo: '개선안 도출 및 확장 적용', titleEn: 'Optimization & Scaled Implementation',
                bodyKo: '분석 결과를 바탕으로 교육 방식과 운영 전략을 개선하고, 조직 전체로 확장 가능한 안전교육 체계를 함께 설계합니다.',
                bodyEn: 'Based on the findings, we refine training methods and operational strategy, then design a scalable safety education framework for broader implementation.',
                delay: 'd1',
              },
            ].map((item) => (
              <div key={item.num} className={`process-item fu${item.delay ? ' ' + item.delay : ''}`}>
                <div className="process-num">{item.num}</div>
                <div className="process-content">
                  <h3 className="process-title ko">{item.titleKo}</h3>
                  <h3 className="process-title en">{item.titleEn}</h3>
                  <p className="process-body ko">{item.bodyKo}</p>
                  <p className="process-body en">{item.bodyEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* INDUSTRIES */}
      <section id="industries">
        <div className="wrap">
          <div className="s-head fu">
            <div>
              <p className="s-label ko">적용 산업</p>
              <p className="s-label en">Industries</p>
              <h2 className="s-title ko">다양한 산업 현장에서 활용됩니다</h2>
              <h2 className="s-title en">Industries We Serve</h2>
            </div>
            <p className="s-head-right ko">제조, 건설, 공공기관 등 다양한 산업 현장에서 안전 교육과 위험 인식 개선을 지원합니다.</p>
            <p className="s-head-right en">Our solutions support safety education and risk awareness across multiple industrial sectors.</p>
          </div>
          <div className="industries-grid">
            {[
              { num: 'd1', titleKo: '제조 산업', titleEn: 'Manufacturing', bodyKo: '생산 라인과 설비 중심의 산업 환경에서 실제 작업 상황을 반영한 안전 교육 콘텐츠를 제작합니다.', bodyEn: 'Safety training tailored to real production environments, reflecting actual machinery operations and workflows.' },
              { num: 'd2', titleKo: '건설 산업', titleEn: 'Construction', bodyKo: '고위험 작업 환경에서 필요한 안전 인식과 행동 변화를 스토리 기반 교육 콘텐츠로 전달합니다.', bodyEn: 'Story-driven safety education designed for high-risk construction environments and field operations.' },
              { num: 'd3', titleKo: '공공기관', titleEn: 'Public Sector', bodyKo: '공공기관과 공기업의 안전 교육 프로그램을 보다 몰입도 높은 콘텐츠로 재설계합니다.', bodyEn: 'Reimagining safety education programs for public institutions and government organizations.' },
              { num: '', titleKo: '플랜트 / 중공업', titleEn: 'Heavy Industry & Plants', bodyKo: '복잡한 공정과 대형 설비가 있는 산업 현장에서 사고 예방 중심의 교육 콘텐츠를 제공합니다.', bodyEn: 'Safety education for complex industrial plants and heavy machinery environments.' },
            ].map((ind) => (
              <div key={ind.titleEn} className={`industry-card fu${ind.num ? ' ' + ind.num : ''}`}>
                <h3 className="industry-title ko">{ind.titleKo}</h3>
                <h3 className="industry-title en">{ind.titleEn}</h3>
                <p className="industry-body ko">{ind.bodyKo}</p>
                <p className="industry-body en">{ind.bodyEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* LEADERSHIP */}
      <section id="leadership">
        <div className="wrap">
          <div className="s-head fu">
            <div>
              <p className="s-label ko">리더십 &amp; 비전</p>
              <p className="s-label en">Leadership &amp; Vision</p>
              <h2 className="s-title ko">창업자 소개</h2>
              <h2 className="s-title en">Our Founder</h2>
            </div>
          </div>
          <div className="lead-grid">
            <div className="lead-left fu">
              <h2 className="lead-name">
                <span className="lead-name-ko ko">조양일</span>
                Cho Yangil
              </h2>
              <p className="lead-role">Founder &amp; CEO<br />Anagram Communications, Inc.</p>
            </div>
            <div className="lead-right fu d2">
              <div className="lead-quote-card">
                <p className="ko">&quot;안전 교육은 규정 준수가 아니라 참여에 관한 것이어야 합니다. 영화의 스토리텔링 기법과 AI의 정밀함을 결합해, 근로자들이 실제로 보고 기억하는 콘텐츠를 만듭니다.&quot;</p>
                <p className="en">&quot;Safety education has traditionally been about compliance. We believe it should be about engagement. By applying the storytelling techniques of cinema and the precision of AI, we create content that workers actually watch and remember.&quot;</p>
              </div>
              <p className="lead-bio ko">국제 영화제 수상 경력의 영화 감독 출신. AI와 영화 제작의 교차점에서 산업 안전 교육의 새로운 패러다임을 만들어가고 있습니다. 영화가 사람의 마음을 움직이듯, 안전 교육도 그럴 수 있다는 믿음으로 Anagram Communications를 창립했습니다.</p>
              <p className="lead-bio en">Award-winning film director and AI Director for major International Film Festivals. At the intersection of AI and cinema, he is building a new paradigm for industrial safety education — founded on the belief that safety content can move people the way great films do.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* CONTACT */}
      <section id="contact">
        <div className="wrap">
          <div className="contact-grid">
            <div className="fu">
              <p className="s-label ko">문의하기</p>
              <p className="s-label en">Contact</p>
              <h2 className="contact-title ko">산업 현장에 맞는 안전교육,<br />지금 함께 설계해보세요</h2>
              <h2 className="contact-title en">Design the right safety education<br />for your industrial environment</h2>
              <p className="contact-desc ko">도입 상담, 파트너십 문의, 솔루션 데모 신청 모두 환영합니다. 7 영업일 이내에 연락드리겠습니다.</p>
              <p className="contact-desc en">We welcome inquiries for consultations, partnerships, and demos. We&apos;ll respond within 2 business days.</p>
              <div className="c-info">
                <div className="c-info-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span className="c-info-text">준비중입니다.</span>
              </div>
              <div className="c-info">
                <div className="c-info-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <span className="c-info-text">Seoul, Republic of Korea</span>
              </div>
            </div>

            <form className="fu d2" onSubmit={handleSubmit}>
              <div className="frow">
                <div className="fg">
                  <label className="flabel ko">이름</label>
                  <label className="flabel en">Name</label>
                  <input type="text" className="finput" name="name" placeholder="홍길동" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="fg">
                  <label className="flabel ko">회사명</label>
                  <label className="flabel en">Company</label>
                  <input type="text" className="finput" name="company" placeholder="회사명" value={formData.company} onChange={handleChange} />
                </div>
              </div>
              <div className="fg">
                <label className="flabel">Email</label>
                <input type="email" className="finput" name="email" placeholder="email@company.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="fg">
                <label className="flabel ko">문의 유형</label>
                <label className="flabel en">Inquiry Type</label>
                <select className="fselect" name="inquiryType" value={formData.inquiryType} onChange={handleChange} required>
                  <option value="">선택해 주세요</option>
                  <option value="도입 상담">도입 상담</option>
                  <option value="파트너십">파트너십</option>
                  <option value="데모 신청">데모 신청</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div className="fg">
                <label className="flabel ko">문의 내용</label>
                <label className="flabel en">Message</label>
                <textarea className="ftextarea" name="message" placeholder="문의 내용을 입력해 주세요" value={formData.message} onChange={handleChange} required />
              </div>
              <button
                type="submit"
                className="fsubmit"
                disabled={submitting}
                style={{ opacity: submitting ? 0.7 : 1 }}
              >
                <span className="ko">보내기</span>
                <span className="en">Send Message</span>
              </button>
              {formStatus && (
                <p style={{
                  marginTop: '12px',
                  fontSize: '13px',
                  color: formStatus.includes('정상') ? '#1d4ed8' : '#dc2626'
                }}>
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
