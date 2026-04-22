import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useApp } from '../context/AppContext';

export default function Nav() {
  const { lang, setLang, openSubscribeModal } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const router = useRouter();
  const isEducation = router.pathname === '/education';

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMobile = () => {
    setMenuOpen(false);
  };

  const homeHref = (hash) => isEducation ? `/${hash}` : hash;

  return (
    <>
      <nav>
        <Link className="logo" href="/">
          <span className="logo-full">Anagram Communications, Inc</span>
          <span className="logo-short">Anagram</span>
        </Link>
        <ul className="nav-links">
          <li>
            <a href={homeHref('#about')} className="ko" onClick={closeMobile}>회사 소개</a>
            <a href={homeHref('#about')} className="en" onClick={closeMobile}>About</a>
          </li>
          <li>
            <a href={homeHref('#expertise')} className="ko" onClick={closeMobile}>전문 분야</a>
            <a href={homeHref('#expertise')} className="en" onClick={closeMobile}>Expertise</a>
          </li>
          <li>
            <a href={homeHref('#solutions')} className="ko" onClick={closeMobile}>솔루션</a>
            <a href={homeHref('#solutions')} className="en" onClick={closeMobile}>Solutions</a>
          </li>
          <li>
            <a href={homeHref('#process')} className="ko" onClick={closeMobile}>진행 방식</a>
            <a href={homeHref('#process')} className="en" onClick={closeMobile}>Process</a>
          </li>
          <li>
            <a href={homeHref('#leadership')} className="ko" onClick={closeMobile}>리더십</a>
            <a href={homeHref('#leadership')} className="en" onClick={closeMobile}>Leadership</a>
          </li>
          <li>
            <Link href="/education" className={`ko${isEducation ? ' active-tab' : ''}`}>안전 교육</Link>
            <Link href="/education" className={`en${isEducation ? ' active-tab' : ''}`}>Education</Link>
          </li>
        </ul>
        <div className="nav-right">
          <div className="lang-wrap">
            <button
              className={`lang-btn${lang === 'ko' ? ' active' : ''}`}
              onClick={() => setLang('ko')}
            >KO</button>
            <button
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
            >EN</button>
          </div>
          <button className="btn-subscribe ko" onClick={openSubscribeModal}>지원사업 알림</button>
          <button className="btn-subscribe en" onClick={openSubscribeModal}>Gov. Alerts</button>
          <a href={homeHref('#contact')} className="btn-contact ko">문의하기</a>
          <a href={homeHref('#contact')} className="btn-contact en">Contact</a>
          <button
            className="hamburger"
            ref={hamburgerRef}
            aria-label="메뉴 열기"
            onClick={toggleMenu}
          >
            <span style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}} />
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href={homeHref('#about')} className="ko" onClick={closeMobile}>회사 소개</a>
        <a href={homeHref('#about')} className="en" onClick={closeMobile}>About</a>
        <a href={homeHref('#expertise')} className="ko" onClick={closeMobile}>전문 분야</a>
        <a href={homeHref('#expertise')} className="en" onClick={closeMobile}>Expertise</a>
        <a href={homeHref('#solutions')} className="ko" onClick={closeMobile}>솔루션</a>
        <a href={homeHref('#solutions')} className="en" onClick={closeMobile}>Solutions</a>
        <a href={homeHref('#process')} className="ko" onClick={closeMobile}>진행 방식</a>
        <a href={homeHref('#process')} className="en" onClick={closeMobile}>Process</a>
        <a href={homeHref('#leadership')} className="ko" onClick={closeMobile}>리더십</a>
        <a href={homeHref('#leadership')} className="en" onClick={closeMobile}>Leadership</a>
        <Link href="/education" className={`ko${isEducation ? ' active-tab' : ''}`} onClick={closeMobile}>안전 교육</Link>
        <Link href="/education" className={`en${isEducation ? ' active-tab' : ''}`} onClick={closeMobile}>Education</Link>
        <button className="m-subscribe ko" onClick={() => { closeMobile(); openSubscribeModal(); }}>지원사업 알림 신청</button>
        <button className="m-subscribe en" onClick={() => { closeMobile(); openSubscribeModal(); }}>Gov. Support Alerts</button>
        <a href={homeHref('#contact')} className="m-contact ko" onClick={closeMobile}>문의하기</a>
        <a href={homeHref('#contact')} className="m-contact en" onClick={closeMobile}>Contact Us</a>
      </div>
    </>
  );
}
