'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { assetPath } from '../site-path';

type Service = {
  key: string;
  group: 'outsourcing' | 'business' | 'talent';
  no: string;
  title: string;
  en: string;
  image: string;
  intro: string;
  challenges: string[];
  capabilities: string[];
  value: string[];
};

const services: Service[] = [
  {
    key: 'bpo', group: 'outsourcing', no: '01', title: 'บริหารกระบวนการธุรกิจ', en: 'BPO', image: '/assets/bpo.webp',
    intro: 'รับผิดชอบการเดินไลน์การผลิตแบบครบวงจร วัดผลจากผลลัพธ์จริง พร้อมทีมบริหารสองภาษาในพื้นที่',
    challenges: ['ขาดกำลังคนช่วงเริ่มผลิต', 'ความต่างทางวัฒนธรรมทำให้อัตราออกสูง', 'ข้อจำกัดกฎหมายแรงงานไทย'],
    capabilities: ['บริหารทั้งไลน์และรับผิดชอบผลผลิต', 'ทีมบริหารจีน–ไทยถ่ายทอดมาตรฐาน', 'Engma Thailand เป็นนายจ้างตามกฎหมาย'],
    value: ['ทีมหลักโฟกัส R&D และตลาด', 'รองรับความผันผวนช่วงเร่งกำลังผลิต', 'ต้นทุนเชื่อมโยงกับผลลัพธ์'],
  },
  {
    key: 'job', group: 'outsourcing', no: '02', title: 'เอาต์ซอร์สตามตำแหน่ง', en: 'JOB OUTSOURCING', image: '/assets/outsourcing.webp',
    intro: 'ดูแลพนักงานบลูคอลลาร์และงานบุคคลหน้างาน ตั้งแต่สรรหา จ้าง บริหาร จนถึงการจัดการข้อพิพาท',
    challenges: ['โครงสร้างคนใหญ่และต้นทุนบริหารสูง', 'ช่องทางสรรหากระจัดกระจาย', 'คำสั่งผลิตขึ้นลงตามฤดูกาล'],
    capabilities: ['รับผิดชอบบทบาทนายจ้าง', 'ระดมคนผ่านเครือข่ายจีน–ไทย', 'ทีมมืออาชีพดูแลอุบัติเหตุและข้อพิพาท'],
    value: ['HR โฟกัสกลยุทธ์องค์กร', 'ลดเวลาสรรหาและปัญหาไลน์สะดุด', 'เพิ่มความยืดหยุ่นของต้นทุน'],
  },
  {
    key: 'staffing', group: 'outsourcing', no: '03', title: 'บุคลากรเทคนิคมืออาชีพ', en: 'STAFFING', image: '/assets/staffing.webp',
    intro: 'เชื่อมวิศวกร ช่างเทคนิค และผู้เชี่ยวชาญเข้ากับโครงการ ผ่านเครือข่ายบุคลากรสองประเทศ',
    challenges: ['แรงงานทักษะและวิศวกรไม่เพียงพอ', 'รอบสรรหานาน กระทบแผนงาน', 'ความคาดหวังค่าตอบแทนไม่ตรงงบ'],
    capabilities: ['จับคู่ผู้สมัครจากฐานจีน–ไทย', 'เทียบตลาดและออกแบบแพ็กเกจค่าจ้าง', 'ผู้ประสานงานเทคนิคสองภาษา'],
    value: ['ลดเวลาหาคนจากเดือนเหลือสัปดาห์', 'ลดต้นทุนและความเสี่ยงการจ้างตรง', 'ทดลองร่วมงานก่อนบรรจุได้'],
  },
  {
    key: 'hro', group: 'outsourcing', no: '04', title: 'บริหารงานบุคคลครบวงจร', en: 'HRO', image: '/assets/hro.webp',
    intro: 'โอนงานเงินเดือน ประกันสังคม ภาษี สัญญา และระเบียบ ให้ทีมที่เข้าใจกฎหมายไทยดูแลครบวงจร',
    challenges: ['ไม่คุ้นกฎหมายและการคำนวณค่าจ้างไทย', 'ความพึงพอใจพนักงานต่ำ', 'ไม่มีประสบการณ์รับตรวจแรงงาน'],
    capabilities: ['ดูแล Payroll, Social Security และ Tax', 'จัดทำสัญญาและข้อบังคับให้ถูกกฎหมาย', 'ออกแบบขั้นตอน OT วันลา และค่าชดเชย'],
    value: ['ลดความคลาดเคลื่อนงานเงินเดือน', 'ลดข้อร้องเรียนและการลาออก', 'เปลี่ยนจากรับมือเป็นป้องกันความเสี่ยง'],
  },
  {
    key: 'visa', group: 'business', no: '05', title: 'วีซ่าและใบอนุญาตทำงาน', en: 'VISA SERVICE', image: '/assets/visa.webp',
    intro: 'วางกลยุทธ์โควตา เอกสาร ต่ออายุ เปลี่ยนประเภท และแผนครอบครัวผู้บริหารต่างชาติ',
    challenges: ['นโยบายและโควตาซับซ้อน', 'การล่าช้ากระทบการเริ่มโครงการ', 'ไม่มีแผนรองรับครอบครัวผู้เดินทาง'],
    capabilities: ['วางแผนตามคุณสมบัติบริษัทและตำแหน่ง', 'ดูแลโควตา ต่ออายุ เปลี่ยน และขยายวีซ่า', 'วางแผนวีซ่าครอบครัวและการศึกษา'],
    value: ['เพิ่มอัตราเข้าปฏิบัติงานตรงเวลา', 'ไม่ต้องมีทีมวีซ่าประจำ', 'ช่วยให้ครอบครัวตั้งถิ่นฐานได้มั่นคง'],
  },
  {
    key: 'consulting', group: 'business', no: '06', title: 'ที่ปรึกษาการลงทุนและองค์กร', en: 'CONSULTING', image: '/assets/consulting.webp',
    intro: 'ที่ปรึกษาจุดเดียวสำหรับการจัดตั้งธุรกิจ โครงสร้างทุน ภาษี BOI ระบบค่าตอบแทน และการบริหารข้ามวัฒนธรรม',
    challenges: ['ขาดภาพรวมกฎหมาย หุ้น และภาษี', 'ต้องประสานหลายหน่วยงานพร้อมกัน', 'ระบบบริหารจีน–ไทยไม่ตรงกัน'],
    capabilities: ['รวมทรัพยากรสำหรับธุรกิจจีนเข้าไทย', 'ออกแบบค่าตอบแทน ผลงาน และระดับตำแหน่ง', 'ระบุความเสี่ยงทุกสถานการณ์'],
    value: ['ลดระยะเวลาตั้งต้นธุรกิจ', 'เชื่อมสำนักงานใหญ่กับทีมไทยอย่างราบรื่น', 'ยกระดับ BOI และการกำกับความเสี่ยง'],
  },
  {
    key: 'rpo', group: 'talent', no: '07', title: 'สรรหาแบบโครงการ', en: 'RPO', image: '/assets/rpo.webp',
    intro: 'ส่งมอบการสรรหาจำนวนมากและเฮดฮันต์ ด้วยกระบวนการมาตรฐาน ภาพตำแหน่งชัด และเกณฑ์ประเมินเดียวกัน',
    challenges: ['ช่องทางท้องถิ่นแยกส่วนและช้า', 'มาตรฐานประเมินจีน–ไทยต่างกัน', 'นายจ้างใหม่ยังไม่มีแบรนด์ในไทย'],
    capabilities: ['ช่องทางสรรหาสองประเทศรองรับปริมาณมาก', 'กำหนด Job Profile และระบบประเมิน', 'ใช้เครือข่ายท้องถิ่นเสริม Employer Brand'],
    value: ['ลดเวลาปิดกำลังคนจำนวนมาก', 'แม่นยำกับตำแหน่งหลักมากขึ้น', 'สร้างช่องทางสรรหาระยะยาว'],
  },
  {
    key: 'education', group: 'talent', no: '08', title: 'อาชีวศึกษาและหลักสูตรร่วม', en: 'VOCATIONAL + SCHOOL', image: '/assets/education.webp',
    intro: 'ร่วมกับสถานศึกษาไทยสร้างชั้นเรียนเฉพาะทาง ฝังมาตรฐานไลน์ผลิต และล็อกกำลังคนล่วงหน้า',
    challenges: ['ทักษะบัณฑิตไม่ตรงมาตรฐานโรงงาน', 'ศูนย์ฝึกเองใช้เงินและเวลาสูง', 'กำลังคนทักษะไม่สม่ำเสมอ'],
    capabilities: ['ร่วมสถาบันสร้างหลักสูตรเฉพาะ', 'ข้อตกลงส่งมอบบุคลากรก่อน', 'กิจกรรมมหาวิทยาลัยและเยี่ยมชมโรงงาน'],
    value: ['ได้ Talent Pool โดยไม่ลงทุนหนัก', 'รับประกันกำลังคนช่วงพีก', 'สร้างแบรนด์และความสัมพันธ์กับสถาบัน'],
  },
];

const groups = [
  { key: 'all', no: '00', label: 'ทั้งหมด' },
  { key: 'outsourcing', no: '01', label: 'Outsourcing' },
  { key: 'business', no: '02', label: 'Business Services' },
  { key: 'talent', no: '03', label: 'Talent Supply Chain' },
];

const industries = ['ยานยนต์และชิ้นส่วน', 'อิเล็กทรอนิกส์และเซมิคอนดักเตอร์', 'เครื่องจักรกลหนัก', 'อุปกรณ์การผลิต', 'โลจิสติกส์', 'พลังงาน', 'เคมีภัณฑ์', 'IT และอินเทอร์เน็ต', 'การสื่อสาร', 'การแพทย์และสุขภาพ', 'ธนาคารและการเงิน', 'ค้าปลีก', 'สินค้าอุปโภคบริโภค', 'เกษตรอัจฉริยะ', 'สิ่งแวดล้อม'];

const advantages = [
  ['01', 'Government Access', 'เชื่อมภาครัฐและภาคธุรกิจ', 'เปิดช่องทางประสานภาครัฐ ตีความนโยบาย และสื่อสารหน่วยงานกำกับได้ในจุดเดียว'],
  ['02', 'Risk Advisory', 'มองความเสี่ยงก่อนเกิด', 'ตรวจหาความเสี่ยงด้านแรงงานและการบริหารล่วงหน้า ลดปัญหาจากความต่างทางวัฒนธรรม'],
  ['03', 'Industry Gateway', 'ทางลัดสู่อุตสาหกรรมไทย', 'เชื่อมผู้ผลิตรถยนต์ผ่าน Namyong Group และเข้าถึงบุคลากรท้องถิ่นผ่าน Taiding ASEAN'],
  ['04', 'China Insight', 'เข้าใจความต้องการจีนโดยไม่ต้องแปล', 'ประสบการณ์กว่า 20 ปี ทำให้เข้าใจโครงสร้าง การตัดสินใจ และจังหวะการขยายธุรกิจของบริษัทจีน'],
  ['05', 'Local Standard', 'มาตรฐานที่ทำซ้ำและลงพื้นที่ได้', 'กระบวนการที่ผ่านโครงการจริงจำนวนมาก และปรับให้สอดคล้องกับกฎหมายไทยแล้ว'],
  ['06', 'Talent Platform', 'ฐานบุคลากรและระบบดิจิทัล', 'ฐานพนักงาน 200,000+ คน เสริมด้วยแพลตฟอร์มดิจิทัลสำหรับการสรรหาและบริหาร'],
];

const processSteps = [
  ['01', 'วิเคราะห์ความต้องการ', 'ลงพื้นที่ ทำความเข้าใจโครงสร้างคน จุดเสี่ยง และช่วงพีกของกำลังผลิต'],
  ['02', 'ออกแบบโซลูชัน', 'ผสาน Recruitment + Outsourcing + Consulting ให้เหมาะกับโจทย์และงบ'],
  ['03', 'กำหนดขอบเขต', 'ระบุบทบาทนายจ้าง ความรับผิดชอบ เงื่อนไขบริการ และความปลอดภัยข้อมูล'],
  ['04', 'เริ่มส่งมอบ', 'ทีมเข้าพื้นที่ เชื่อมระบบ และจัดคนเข้าทำงานตาม Milestone'],
  ['05', 'บริหารต่อเนื่อง', 'ดูแลสรรหา เงินเดือน ประกันสังคม สวัสดิการ และแจ้งเตือนความเสี่ยง'],
  ['06', 'ประเมินและพัฒนา', 'ทบทวนต้นทุน ประสิทธิภาพ และ Compliance เพื่อปรับแผนอย่างต่อเนื่อง'],
];

export default function Home() {
  const [activeGroup, setActiveGroup] = useState('all');
  const [activeService, setActiveService] = useState('bpo');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visibleServices = useMemo(
    () => activeGroup === 'all' ? services : services.filter((service) => service.group === activeGroup),
    [activeGroup],
  );
  const selected = services.find((service) => service.key === activeService) ?? services[0];

  const chooseGroup = (key: string) => {
    setActiveGroup(key);
    const first = key === 'all' ? services[0] : services.find((service) => service.group === key);
    if (first) setActiveService(first.key);
  };

  return (
    <main>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Engma Thailand home">
          <img src={assetPath('/assets/engma-logo.png')} alt="Engma 英格玛" />
          <span>THAILAND</span>
        </a>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="เมนูหลัก">
          <a href="#about" onClick={() => setMenuOpen(false)}>เกี่ยวกับเรา</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>บริการ</a>
          <a href="#advantages" onClick={() => setMenuOpen(false)}>จุดแข็ง</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>ขั้นตอน</a>
        </nav>
        <a className="header-cta" href="#contact">ปรึกษาผู้เชี่ยวชาญ <span>↗</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="เปิดเมนู" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src={assetPath('/assets/bangkok.webp')} alt="ทิวทัศน์กรุงเทพมหานครยามเย็น" />
        <div className="hero-shade" />
        <div className="hero-grid" />
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-content">
          <p className="eyebrow"><span /> ENGMA THAILAND · PEOPLE / BUSINESS / BEYOND</p>
          <h1>เชื่อมคน<br />ขับเคลื่อน<span>ความเป็นไปได้</span></h1>
          <p className="hero-copy">พันธมิตรทรัพยากรบุคคลครบวงจร เชื่อมต่อจีน–ไทย<br />ให้ธุรกิจของคุณลงทุน เติบโต และดำเนินงานในไทยได้อย่างมั่นใจ</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#services">สำรวจบริการ <span>↓</span></a>
            <a className="button button-ghost" href="#about"><i className="play">▶</i> รู้จัก Engma Thailand</a>
          </div>
        </div>
        <div className="hero-rail" aria-label="สถิติสำคัญ">
          <div><strong>24</strong><span>ปีของกลุ่ม Engma</span></div>
          <div><strong>20<span>หมื่น+</span></strong><span>พนักงานเอาต์ซอร์ส</span></div>
          <div><strong>240<span>+</span></strong><span>สาขาทั่วประเทศจีน</span></div>
          <div><strong>500<span>ล้าน+</span></strong><span>คนที่ผ่านการฝึกและจัดหางาน</span></div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="เลื่อนไปส่วนถัดไป"><span /> SCROLL TO EXPLORE</a>
      </section>

      <section className="intro section" id="about">
        <div className="section-heading">
          <p className="section-kicker">01 / ABOUT ENGMA</p>
          <h2>ความเชี่ยวชาญจากจีน<br />เชื่อมกับพลังท้องถิ่นไทย</h2>
        </div>
        <div className="intro-copy">
          <p className="lead">Engma (Thailand) เกิดจากความร่วมมือของสองเครือข่ายที่แข็งแรง เพื่อสร้างบริการ HR ข้ามพรมแดนที่เข้าใจทั้งกฎหมาย วัฒนธรรม และการปฏิบัติงานจริง</p>
          <a className="text-link" href="#shareholders">รู้จักสองพันธมิตร <span>↘</span></a>
        </div>
      </section>

      <section className="shareholders" id="shareholders">
        <article className="shareholder-card shareholder-thai">
          <img src={assetPath('/assets/thai-port.webp')} alt="ท่าเรือและเครือข่ายธุรกิจของ Namyong Group" />
          <div className="card-overlay" />
          <div className="shareholder-content">
            <p>THAILAND PARTNER</p>
            <h3>Taiding ASEAN</h3>
            <p className="description">ผู้เชื่อมโยงภาครัฐ ธุรกิจ สื่อ และการศึกษาไทย–จีน ภายใต้ระบบนิเวศของ Namyong Group</p>
            <div className="micro-stats"><span><b>2016</b>ก่อตั้ง</span><span><b>5</b>กลุ่มธุรกิจหลัก</span><span><b>#2</b>ท่าเรือ RoRo ในเอเชีย</span></div>
          </div>
        </article>
        <article className="shareholder-card shareholder-china">
          <img src={assetPath('/assets/team.webp')} alt="อุตสาหกรรมที่ Engma ให้บริการ" />
          <div className="card-overlay" />
          <div className="shareholder-content">
            <p>CHINA PARTNER</p>
            <h3>Engma Group</h3>
            <p className="description">ผู้ให้บริการทรัพยากรบุคคลชั้นนำของจีน ครอบคลุมการผลิต บริการ อินเทอร์เน็ต การเงิน และรัฐวิสาหกิจ</p>
            <div className="micro-stats"><span><b>2002</b>ก่อตั้ง</span><span><b>90+</b>เมือง</span><span><b>5,400+</b>ลูกค้าองค์กร</span></div>
          </div>
        </article>
      </section>

      <section className="numbers section" aria-label="ข้อมูลสำคัญของกลุ่ม Engma">
        <div className="numbers-title"><p className="section-kicker">GROUP AT A GLANCE</p><h2>ความเชื่อมั่น<br />ที่วัดผลได้</h2><small>ข้อมูล ณ มกราคม 2026</small></div>
        {[
          ['1,200+', 'ทีมบริหารมืออาชีพ'], ['250,000', 'บุคลากรฝึกอบรม/จัดหาต่อปี'], ['30+', 'รางวัลระดับประเทศ'],
          ['Top 10', 'แบรนด์ HR จีน ปี 2025'], ['10.2B', 'รายได้กลุ่มต่อปี (RMB)'], ['427M', 'ภาษีกลุ่มต่อปี (RMB)'],
        ].map(([value, label]) => <div className="number-item" key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <section className="pain-section">
        <div className="pain-photo"><img src={assetPath('/assets/bangkok.webp')} alt="กรุงเทพมหานคร ศูนย์กลางธุรกิจของประเทศไทย" /></div>
        <div className="pain-content">
          <p className="section-kicker light">WHY ENGMA THAILAND</p>
          <h2>เปลี่ยน 5 ความท้าทาย<br />ให้เป็นทางเติบโต</h2>
          <div className="pain-list">
            {['เตรียมพร้อมก่อนเข้าตลาดไทย', 'สรรหาคนจำนวนมากให้ทันเวลา', 'เดินไลน์ผลิตให้ได้ตามเป้า', 'ควบคุมความเสี่ยงด้านกฎหมาย', 'เชื่อมวัฒนธรรมจีน–ไทย'].map((item, index) => (
              <div key={item}><b>0{index + 1}</b><span>{item}</span><i>↗</i></div>
            ))}
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading services-heading">
          <div><p className="section-kicker">02 / WHAT WE DO</p><h2>3 กลุ่มบริการ<br />แก้โจทย์ธุรกิจครบวงจร</h2></div>
          <p>ตั้งแต่การสรรหาและจ้างงาน ไปจนถึงบริหารไลน์ผลิต วีซ่า ที่ปรึกษา และการสร้างกำลังคนระยะยาว</p>
        </div>
        <div className="group-tabs" role="tablist" aria-label="กลุ่มบริการ">
          {groups.map((group) => (
            <button key={group.key} role="tab" aria-selected={activeGroup === group.key} className={activeGroup === group.key ? 'active' : ''} onClick={() => chooseGroup(group.key)}>
              <small>{group.no}</small>{group.label}
            </button>
          ))}
        </div>
        <div className="service-explorer">
          <div className="service-nav">
            {visibleServices.map((service) => (
              <button key={service.key} className={activeService === service.key ? 'active' : ''} onClick={() => setActiveService(service.key)}>
                <span>{service.no}</span><div><b>{service.title}</b><small>{service.en}</small></div><i>↗</i>
              </button>
            ))}
          </div>
          <article className="service-feature" key={selected.key}>
            <div className="service-visual"><img src={assetPath(selected.image)} alt={selected.title} /><span>{selected.en}</span></div>
            <div className="service-detail">
              <p className="detail-no">SERVICE / {selected.no}</p>
              <h3>{selected.title}</h3>
              <p className="service-intro">{selected.intro}</p>
              <div className="detail-columns">
                <div><b>โจทย์ธุรกิจ</b>{selected.challenges.map((item) => <span key={item}>— {item}</span>)}</div>
                <div><b>สิ่งที่เราทำ</b>{selected.capabilities.map((item) => <span key={item}>— {item}</span>)}</div>
                <div><b>คุณค่าที่ได้รับ</b>{selected.value.map((item) => <span key={item}>— {item}</span>)}</div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="industry-section">
        <div className="industry-copy"><p className="section-kicker light">INDUSTRIES WE SERVE</p><h2>ลึกในอุตสาหกรรม<br />กว้างในโอกาส</h2><p>โซลูชันที่เริ่มจากบริบทจริงของธุรกิจ ไม่ใช่แพ็กเกจสำเร็จรูป</p></div>
        <div className="industry-marquee" aria-label="อุตสาหกรรมที่ให้บริการ">
          {[...industries, ...industries].map((industry, index) => <span key={`${industry}-${index}`}><i>{String((index % industries.length) + 1).padStart(2, '0')}</i>{industry}</span>)}
        </div>
      </section>

      <section className="advantages section" id="advantages">
        <div className="section-heading advantages-heading">
          <div><p className="section-kicker">03 / WHY US</p><h2>ความได้เปรียบ<br />จากพลังสองประเทศ</h2></div>
          <p>ประสบการณ์ระดับกลุ่มบริษัท ผสานเครือข่ายท้องถิ่นของไทย ให้ทุกการขยายธุรกิจเดินหน้าได้เร็วและปลอดภัยกว่า</p>
        </div>
        <div className="advantages-grid">
          {advantages.map(([no, en, title, copy]) => (
            <article key={no}><span>{no}</span><small>{en}</small><h3>{title}</h3><p>{copy}</p><i>↗</i></article>
          ))}
        </div>
      </section>

      <section className="resource-band">
        <img src={assetPath('/assets/factory.webp')} alt="โรงงานสมัยใหม่ในประเทศไทย" />
        <div className="resource-shade" />
        <div className="resource-copy"><p className="section-kicker light">TALENT INFRASTRUCTURE</p><h2>ทรัพยากรจีน–ไทย<br />พร้อมส่งมอบอย่างเสถียร</h2></div>
        <div className="resource-stats">
          {[['200+', 'สถานศึกษาพันธมิตร'], ['100+', 'พันธมิตรจัดหาทรัพยากร'], ['4', 'ฐานส่งมอบเฉพาะทาง'], ['200K+', 'ข้อมูลบุคลากรในเครือข่าย']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="expertise section">
        <div className="expertise-image"><img src={assetPath('/assets/legal.webp')} alt="การบริหารความเสี่ยงและการปฏิบัติตามกฎหมาย" /><div><span>CN</span><i>×</i><span>TH</span></div></div>
        <div className="expertise-copy"><p className="section-kicker">CROSS-BORDER COMPLIANCE</p><h2>ทีมลงมือจริง<br />มาตรฐานสองประเทศ</h2><p>ผสานความเชี่ยวชาญด้าน HR และ Risk Control ของ Engma กับกฎหมายและประสบการณ์ปฏิบัติการในไทย ครอบคลุมตั้งแต่สำนักงานใหญ่จีนถึงทีมงานในพื้นที่</p>
          <div className="team-stats">
            <span><b>10–15 ปี</b>ทีมบริหารโครงการ</span><span><b>10–20 ปี</b>ทีมที่ปรึกษาผู้เชี่ยวชาญ</span><span><b>100+</b>ทีมบริการลูกค้า</span><span><b>1,000+</b>ประสบการณ์วางแผนโครงการ</span>
          </div>
        </div>
      </section>

      <section className="comparison section">
        <div className="comparison-head"><div><p className="section-kicker">THE ENGMA DIFFERENCE</p><h2>มากกว่าการส่งคน<br />คือการส่งมอบผลลัพธ์</h2></div><p>หนึ่งทีมดูแลตั้งแต่กฎหมาย การสรรหา ไปจนถึงการบริหารหน้างาน</p></div>
        <div className="comparison-table" role="table" aria-label="เปรียบเทียบผู้ให้บริการ">
          <div className="table-row table-header" role="row"><span>มิติเปรียบเทียบ</span><strong>Engma Thailand</strong><span>บริษัทจัดหางานไทย</span><span>บริษัท HR ระดับโลก</span></div>
          {[
            ['รูปแบบบริการ', 'Outsource + Business + Talent ครบวงจร', 'เน้นแรงงานบลูคอลลาร์', 'เน้นสรรหา White-collar'],
            ['Compliance', 'ทีมกฎหมายจีน–ไทยดูแลเต็มรูปแบบ', 'ครอบคลุมแรงงานพื้นฐาน', 'ดูแลเฉพาะขั้นตอนสรรหา'],
            ['การทำงานข้ามประเทศ', 'ทีมจีน–ไทยและกลไกประสานสองฝั่ง', 'ไม่มีทรัพยากรจากจีน', 'สำนักงานใหญ่สากล แต่ลงพื้นที่ไทยจำกัด'],
            ['ทรัพยากรอุตสาหกรรม', 'เชื่อมเครือข่ายยานยนต์และการผลิตโดยตรง', 'ทรัพยากรแรงงานทั่วไป', 'ไม่มีเครือข่ายอุตสาหกรรมไทยเฉพาะทาง'],
            ['การส่งมอบ', 'สรรหา ฝึกอบรม จ้างงาน บริหาร และรับผิดชอบผลลัพธ์', 'ส่งคน ไม่บริหารหน้างาน', 'แนะนำประวัติและนัดสัมภาษณ์'],
          ].map((row) => <div className="table-row" role="row" key={row[0]}>{row.map((cell, index) => index === 1 ? <strong key={cell}>{cell}<i>✓</i></strong> : <span key={cell}>{cell}</span>)}</div>)}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-bg"><img src={assetPath('/assets/process-office.webp')} alt="สำนักงานและทีมปฏิบัติการของ Engma" /></div>
        <div className="process-content section"><p className="section-kicker light">04 / HOW WE WORK</p><div className="process-head"><h2>6 ขั้นตอนชัดเจน<br />จากโจทย์สู่ผลลัพธ์</h2><p>ทุกช่วงมีจุดตรวจวัดและเกณฑ์ส่งมอบที่ตกลงร่วมกัน</p></div>
          <div className="process-line">{processSteps.map(([no, title, copy]) => <article key={no}><span>{no}</span><div className="process-dot" /><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="closing" id="contact">
        <img src={assetPath('/assets/closing.webp')} alt="วัดอรุณ กรุงเทพมหานคร" />
        <div className="closing-shade" />
        <div className="closing-content"><p>OUR COMMITMENT</p><h2>ให้ทุกธุรกิจจีนที่เข้าสู่ตลาดไทย<br />ได้รับบริการ HR ที่ไว้วางใจได้</h2><div><a className="button button-primary" href="https://www.engmahro.com/lianxiwomen/" target="_blank" rel="noreferrer">เริ่มต้นพูดคุยกับเรา <span>↗</span></a><a className="button button-ghost" href="mailto:engmahro@engma.net">engmahro@engma.net</a></div></div>
      </section>

      <footer>
        <div className="footer-brand"><img src={assetPath('/assets/engma-logo.png')} alt="Engma" /><p>Professional · Collaborative · Win-win · Cross-cultural empowerment</p></div>
        <div className="footer-links"><a href="#about">เกี่ยวกับเรา</a><a href="#services">บริการ</a><a href="#advantages">จุดแข็ง</a><a href="#process">ขั้นตอน</a></div>
        <div className="footer-end"><span>ENGMA (THAILAND) COMPANY LIMITED</span><span>© 2026 ENGMA THAILAND</span></div>
      </footer>
      <Link className="concept-switcher" href="/" aria-label="กลับไปเลือกแบบเว็บไซต์"><span>⌂</span> เลือกแบบ</Link>
    </main>
  );
}
