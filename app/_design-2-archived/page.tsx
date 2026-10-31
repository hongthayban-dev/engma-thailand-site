import Link from 'next/link';
import { assetPath } from '../site-path';

const solutions = [
  { no: '01', title: 'Outsourcing', thai: 'วางกำลังคนให้พร้อมเดินงาน', copy: 'ดูแลตั้งแต่แรงงานหน้างานจนถึงการบริหารกระบวนการผลิต พร้อมทีมสองภาษาและระบบนายจ้างที่สอดคล้องกับกฎหมายไทย', items: ['BPO', 'Job Outsourcing', 'Professional Staffing', 'HRO'], image: '/assets/factory.webp' },
  { no: '02', title: 'Business Services', thai: 'ตั้งธุรกิจและเริ่มงานในไทยอย่างมั่นใจ', copy: 'ประสานการลงทุน โครงสร้างองค์กร ภาษี BOI วีซ่า และใบอนุญาตทำงานผ่านทีมที่เข้าใจบริบทจีน–ไทย', items: ['Visa & Work Permit', 'Investment Consulting', 'Compliance', 'Organization Design'], image: '/assets/legal.webp' },
  { no: '03', title: 'Talent Supply Chain', thai: 'สร้างแหล่งบุคลากรระยะยาว', copy: 'เชื่อมการสรรหาแบบโครงการกับสถานศึกษาไทย เพื่อเติมตำแหน่งสำคัญและสร้างกำลังคนที่ตรงกับมาตรฐานโรงงาน', items: ['RPO', 'Executive Search', 'Vocational Program', 'School Partnership'], image: '/assets/education.webp' },
];

const strengths = [
  ['01', 'Government Access', 'เชื่อมภาครัฐและภาคธุรกิจ พร้อมช่วยตีความนโยบายที่เกี่ยวข้อง'],
  ['02', 'China Insight', 'เข้าใจจังหวะการลงทุนและรูปแบบการตัดสินใจของบริษัทจีน'],
  ['03', 'Local Delivery', 'ทีมไทยลงพื้นที่จริงและปรับมาตรฐานให้เข้ากับกฎหมายท้องถิ่น'],
  ['04', 'Talent Platform', 'เครือข่ายบุคลากรและโครงสร้างบริการของ Engma Group'],
];

const steps = [
  ['01', 'วิเคราะห์โจทย์', 'โครงสร้างคน กำลังผลิต และความเสี่ยง'],
  ['02', 'ออกแบบบริการ', 'เลือกโมเดลและขอบเขตความรับผิดชอบ'],
  ['03', 'เริ่มส่งมอบ', 'เชื่อมระบบ จัดทีม และเตรียมบุคลากร'],
  ['04', 'บริหารต่อเนื่อง', 'ติดตามต้นทุน ผลลัพธ์ และข้อกำกับ'],
];

export default function DesignTwo() {
  return (
    <main className="concept-two">
      <header className="v2-header">
        <a className="v2-brand" href="#top" aria-label="Engma Thailand home"><img src={assetPath('/assets/engma-logo.png')} alt="Engma 英格玛" /><span>THAILAND</span></a>
        <div className="v2-links" role="navigation" aria-label="เมนูหลัก"><a href="#about">เกี่ยวกับเรา</a><a href="#solutions">บริการ</a><a href="#strengths">จุดแข็ง</a><a href="#process">ขั้นตอน</a></div>
        <a className="v2-contact" href="#contact">เริ่มต้นพูดคุย <span>↗</span></a>
      </header>

      <section className="v2-hero" id="top">
        <div className="v2-hero-map" aria-hidden="true" />
        <div className="v2-hero-copy">
          <p className="v2-kicker"><span>ENGMA THAILAND</span> / PEOPLE · BUSINESS · BEYOND</p>
          <h1>เส้นทางธุรกิจ<br />จีน–ไทย<br /><em>เริ่มจากคนที่ใช่</em></h1>
          <p className="v2-lead">บริการทรัพยากรบุคคลและที่ปรึกษาธุรกิจครบวงจร สำหรับองค์กรจีนที่ต้องการตั้งทีม เริ่มดำเนินงาน และเติบโตในประเทศไทย</p>
          <div className="v2-hero-actions"><a href="#solutions">ดูบริการทั้งหมด <span>↓</span></a><a href="#about">รู้จัก Engma Thailand</a></div>
        </div>
        <div className="v2-hero-visual">
          <div className="v2-photo-frame"><img src={assetPath('/assets/bangkok.webp')} alt="กรุงเทพมหานคร ศูนย์กลางธุรกิจของประเทศไทย" /></div>
          <div className="v2-visual-label">CHINA <i /> THAILAND</div>
          <div className="v2-vertical-copy">TALENT · PEOPLE · SOLUTIONS · GROWTH</div>
        </div>
        <div className="v2-hero-foot"><span>GLOBAL TALENT SOLUTIONS</span><span>SCROLL TO DISCOVER <i>↓</i></span></div>
      </section>

      <section className="v2-proof" aria-label="ตัวเลขสำคัญ">
        <div><strong>24</strong><span>ปีของกลุ่ม Engma</span></div><div><strong>200,000+</strong><span>พนักงานเอาต์ซอร์ส</span></div><div><strong>240+</strong><span>สาขาในเครือข่ายจีน</span></div><div><strong>15</strong><span>อุตสาหกรรมที่รองรับ</span></div>
      </section>

      <section className="v2-about" id="about">
        <div className="v2-section-label"><span>01</span> ABOUT ENGMA</div>
        <div className="v2-about-title"><p>LOCAL ROOTS<br />GLOBAL STANDARD</p><h2>เข้าใจจีน<br />ลงมือทำในไทย</h2></div>
        <div className="v2-about-copy">
          <p>Engma Thailand เกิดจากความร่วมมือของ Engma Group และ Taiding ASEAN เรานำประสบการณ์บริการบุคลากรจากจีนมารวมกับเครือข่ายธุรกิจและทีมปฏิบัติการในประเทศไทย</p>
          <div className="v2-partners"><article><span>CHINA</span><strong>Engma Group</strong><p>ความเชี่ยวชาญ HR และระบบส่งมอบโครงการที่พัฒนามากว่า 20 ปี</p></article><article><span>THAILAND</span><strong>Taiding ASEAN</strong><p>เครือข่ายภาครัฐ อุตสาหกรรม และความเข้าใจบริบทท้องถิ่น</p></article></div>
        </div>
      </section>

      <section className="v2-bridge">
        <img src={assetPath('/assets/ship.webp')} alt="เส้นทางโลจิสติกส์ระหว่างประเทศ" /><div className="v2-bridge-shade" />
        <div className="v2-bridge-copy"><span>ONE PARTNER · TWO MARKETS</span><h2>เชื่อมมาตรฐานจากจีน<br />เข้ากับการปฏิบัติงานในไทย</h2></div>
        <div className="v2-bridge-points"><div><span>01</span><strong>คน</strong><small>Recruitment & Workforce</small></div><div><span>02</span><strong>ระบบ</strong><small>Process & Compliance</small></div><div><span>03</span><strong>การเติบโต</strong><small>Business Advisory</small></div></div>
      </section>

      <section className="v2-solutions" id="solutions">
        <div className="v2-section-label"><span>02</span> SOLUTIONS</div>
        <div className="v2-solutions-head"><h2>บริการที่เดินไปพร้อม<br />ทุกช่วงของการลงทุน</h2><p>เลือกใช้บริการรายส่วน หรือออกแบบเป็นโซลูชันเดียวตั้งแต่เริ่มตั้งบริษัทจนถึงการบริหารกำลังคนระยะยาว</p></div>
        <div className="v2-solution-list">
          {solutions.map((solution) => <article key={solution.no}><div className="v2-solution-image"><img src={assetPath(solution.image)} alt="" /><span>{solution.no}</span></div><div className="v2-solution-copy"><p>{solution.title}</p><h3>{solution.thai}</h3><div className="v2-solution-detail"><p>{solution.copy}</p><ul>{solution.items.map((item) => <li key={item}>{item}</li>)}</ul></div></div></article>)}
        </div>
      </section>

      <section className="v2-strengths" id="strengths">
        <div className="v2-strengths-photo"><img src={assetPath('/assets/team.webp')} alt="ทีมงาน Engma Thailand" /></div>
        <div className="v2-strengths-copy"><div className="v2-section-label v2-label-light"><span>03</span> WHY ENGMA</div><h2>ทีมเดียวที่เชื่อม<br />ความเข้าใจสองประเทศ</h2><div className="v2-strength-list">{strengths.map(([no, title, copy]) => <article key={no}><span>{no}</span><div><strong>{title}</strong><p>{copy}</p></div></article>)}</div></div>
      </section>

      <section className="v2-process" id="process">
        <div className="v2-section-label"><span>04</span> DELIVERY PROCESS</div>
        <div className="v2-process-head"><h2>จากโจทย์ธุรกิจ<br />สู่ทีมที่พร้อมทำงาน</h2><p>ทุกโครงการมีเจ้าของงานชัดเจน พร้อมจุดตรวจสอบที่ช่วยให้สำนักงานใหญ่และทีมไทยเห็นความคืบหน้าร่วมกัน</p></div>
        <div className="v2-steps">{steps.map(([no, title, copy]) => <article key={no}><span>{no}</span><i /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="v2-cta" id="contact">
        <img src={assetPath('/assets/closing.webp')} alt="กรุงเทพมหานครยามค่ำ" /><div className="v2-cta-shade" /><div className="v2-cta-copy"><span>READY FOR THAILAND</span><h2>ให้การเริ่มต้นในไทย<br />มีทีมที่เข้าใจอยู่ข้างคุณ</h2><a href="mailto:engmahro@engma.net">พูดคุยกับทีม Engma <i>↗</i></a></div>
      </section>

      <footer className="v2-footer"><div><img src={assetPath('/assets/engma-logo.png')} alt="Engma 英格玛" /><span>THAILAND</span></div><p>PEOPLE CONNECT A BRIGHTER TOMORROW</p><div className="v2-footer-bottom"><span>© 2026 ENGMA THAILAND</span><Link href="/">เลือกแบบเว็บไซต์</Link></div></footer>
      <Link className="concept-switcher" href="/" aria-label="กลับไปเลือกแบบเว็บไซต์"><span>⌂</span> เลือกแบบ</Link>
    </main>
  );
}
