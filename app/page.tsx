const concepts = [
  {
    no: '01', href: '/design-1', title: 'แบบที่ 1', subtitle: 'Corporate Immersive',
    description: 'ภาพเต็มจอ โทนเข้ม และการเล่าเรื่องเชิงองค์กร เหมาะกับการนำเสนอภาพรวมบริษัทแบบครบถ้วน',
    image: '/assets/bangkok.webp', className: 'selector-card-dark',
  },
  {
    no: '02', href: '/design-2', title: 'แบบที่ 2', subtitle: 'Editorial Gateway',
    description: 'โทนฟ้าโปร่งแบบ Company Profile จัดข้อมูลเป็นบท อ่านง่าย และเน้นเส้นทางธุรกิจจีน–ไทย',
    image: '/assets/team.webp', className: 'selector-card-light',
  },
];

export default function DesignSelector() {
  return (
    <main className="selector-page">
      <div className="selector-orb selector-orb-one" />
      <div className="selector-orb selector-orb-two" />
      <header className="selector-header">
        <img src="/assets/engma-logo.png" alt="Engma 英格玛" />
        <span>THAILAND · WEBSITE CONCEPTS</span>
      </header>
      <section className="selector-intro">
        <p>ENGMA THAILAND / DESIGN PREVIEW</p>
        <h1>เลือกแนวทาง<br />สำหรับเว็บไซต์</h1>
        <div><span>02 CONCEPTS</span><p>ทั้งสองแบบใช้ข้อมูล ชุดสี และภาพลักษณ์จาก Engma Profile ชุดเดียวกัน แต่ใช้จังหวะการเล่าเรื่องต่างกัน</p></div>
      </section>
      <section className="selector-grid" aria-label="ตัวเลือกแบบเว็บไซต์">
        {concepts.map((concept) => (
          <a className={`selector-card ${concept.className}`} href={concept.href} key={concept.no}>
            <img src={concept.image} alt="" />
            <span className="selector-card-shade" />
            <span className="selector-card-number">{concept.no}</span>
            <span className="selector-card-copy"><small>{concept.subtitle}</small><strong>{concept.title}</strong><span>{concept.description}</span></span>
            <span className="selector-open">เปิดดู <i>↗</i></span>
          </a>
        ))}
      </section>
      <footer className="selector-footer"><span>PEOPLE CONNECT A BRIGHTER TOMORROW</span><span>ENGMA THAILAND © 2026</span></footer>
    </main>
  );
}
