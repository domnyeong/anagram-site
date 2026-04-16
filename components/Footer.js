import { useApp } from '../context/AppContext';

export default function Footer() {
  const { openSubscribeModal } = useApp();

  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-top">
          <div>
            <p className="foot-logo">Anagram Communications, Inc.</p>
            <p className="foot-tagline ko">영화와 AI로 안전 교육을 재정의합니다.<br />Seoul, Republic of Korea · Est. 2026</p>
            <p className="foot-tagline en">Redefining Safety Education<br />through Cinema and AI.<br />Seoul, Republic of Korea · Est. 2026</p>
          </div>
          <div>
            <p className="foot-col-h ko">페이지</p>
            <p className="foot-col-h en">Pages</p>
            <ul className="foot-list">
              <li><a href="/#about"><span className="ko">회사 소개</span><span className="en">About</span></a></li>
              <li><a href="/#expertise"><span className="ko">전문 분야</span><span className="en">Expertise</span></a></li>
              <li><a href="/#solutions"><span className="ko">솔루션</span><span className="en">Solutions</span></a></li>
              <li><a href="/#process"><span className="ko">진행 방식</span><span className="en">Process</span></a></li>
              <li><a href="/#leadership"><span className="ko">리더십</span><span className="en">Leadership</span></a></li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); openSubscribeModal(); }}>
                  <span className="ko">지원사업 알림</span><span className="en">Gov. Alerts</span>
                </a>
              </li>
              <li><a href="/education"><span className="ko">안전 교육</span><span className="en">Education</span></a></li>
              <li><a href="/#contact"><span className="ko">문의하기</span><span className="en">Contact</span></a></li>
            </ul>
          </div>
          <div>
            <p className="foot-col-h ko">연락처</p>
            <p className="foot-col-h en">Contact</p>
            <ul className="foot-list">
              <li><a href="/#contact" className="ko">문의 양식 보내기</a></li>
              <li><a href="/#contact" className="en">Send an inquiry</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <p className="foot-copy">© 2026 Anagram Communications, Inc. All rights reserved.</p>
          <div className="foot-legal">
            <a href="#"><span className="ko">개인정보처리방침</span><span className="en">Privacy Policy</span></a>
            <a href="#"><span className="ko">이용약관</span><span className="en">Terms</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
