'use client';

import { useEffect, useMemo, useState } from 'react';
import { assetPath } from './site-path';

// รูปทั้งหมดของหน้า — ไฟล์ใน /assets/placeholder/ เป็นภาพชั่วคราว รอเปลี่ยนเป็นภาพจริง
const images = {
  hero: '/assets/bangkok.webp',
  taiding: '/assets/thai-port.webp',
  engmaGroup: '/assets/team.webp',
  pain: '/assets/bangkok.webp',
  resources: '/assets/factory.webp',
  localResources: '/assets/placeholder/local-resources.svg',
  team: '/assets/placeholder/team.svg',
  compliance: '/assets/legal.webp',
  process: '/assets/process-office.webp',
  closing: '/assets/closing.webp',
};

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
    intro: 'รับบริหารไลน์การผลิตแทนทั้งหมด ตั้งแต่สรรหา ฝึกอบรม จนถึงบริหารหน้างาน และรับผิดชอบต่อผลผลิต',
    challenges: ['ช่วงเริ่มผลิตขาดคนจำนวนมาก สรรหาเองไม่ทัน', 'วัฒนธรรมจีน–ไทยต่างกัน พนักงานลาออกสูง', 'กฎหมายแรงงานไทยเข้มงวด ความเสี่ยงสูง'],
    capabilities: ['บริหารทั้งไลน์และรับผิดชอบผลการผลิต', 'ส่งทีมบริหารสองภาษาจีน–ไทยเข้าวางมาตรฐาน', 'Engma (Thailand) เป็นนายจ้าง แยกความเสี่ยงด้านแรงงานออกจากลูกค้า'],
    value: ['ทีมหลักโฟกัส R&D และการขยายตลาด', 'รองรับกำลังคนที่ขึ้นลงช่วงเร่งการผลิต ส่งมอบได้สม่ำเสมอ', 'คิดค่าบริการตามผลลัพธ์ ต้นทุนคนผูกกับผลผลิต'],
  },
  {
    key: 'job', group: 'outsourcing', no: '02', title: 'เอาต์ซอร์สตามตำแหน่ง', en: 'JOB OUTSOURCING', image: '/assets/outsourcing.webp',
    intro: 'ดูแลพนักงานบลูคอลลาร์แทนบริษัท พร้อมบริการด้านการจ้างงานที่หน้างาน',
    challenges: ['จ้างบลูคอลลาร์เอง โครงสร้างคนใหญ่ ต้นทุนบริหารสูง', 'ช่องทางสรรหาในไทยกระจัดกระจาย หาคนจำนวนมากยาก', 'คำสั่งซื้อขึ้นลงตามฤดูกาล คนว่างงานในช่วงซบ'],
    capabilities: ['Engma (Thailand) รับหน้าที่นายจ้าง', 'ระดมคนผ่านช่องทางจีน–ไทย และดูแลงานบุคคลแทน', 'ทีมมืออาชีพดูแลอุบัติเหตุจากงานและข้อพิพาทแรงงาน ปรับจำนวนคนได้ยืดหยุ่น'],
    value: ['โครงสร้างคนกระชับ HR โฟกัสการพัฒนาองค์กรและกลยุทธ์คน', 'รอบสรรหาสั้นลง แผนผลิตไม่ติดปัญหาขาดคน', 'โอนความเสี่ยงการจ้างงาน เพิ่มความยืดหยุ่น โครงสร้างต้นทุนดีขึ้น'],
  },
  {
    key: 'staffing', group: 'outsourcing', no: '03', title: 'บุคลากรเทคนิคมืออาชีพ', en: 'STAFFING', image: '/assets/staffing.webp',
    intro: 'บริการเอาต์ซอร์สบุคลากรสายเทคนิคและวิชาชีพ ผ่านเครือข่ายบุคลากรจีน–ไทย',
    challenges: ['ต้องการช่างและวิศวกรมาก แต่คนในไทยมีไม่พอ', 'สรรหาตำแหน่งเทคนิคใช้เวลานาน กระทบแผนโครงการ', 'ความคาดหวังค่าจ้างของคนเก่งสูงกว่างบ เสี่ยงเสียคนสำคัญ'],
    capabilities: ['ใช้เครือข่ายบุคลากรจีน–ไทยจับคู่ผู้สมัครได้รวดเร็ว', 'เทียบค่าจ้างกับตลาด เจรจา และออกแบบแพ็กเกจตามบริบทไทย', 'ส่งผู้ประสานงานโครงการเทคนิคสองภาษา เชื่อมทีมข้ามประเทศ'],
    value: ['ลดเวลาหาคนตำแหน่งเทคนิคจากหลายเดือนเหลือหลักสัปดาห์', 'ไม่ต้องจ้างช่างระดับสูงจำนวนมากเอง ลดต้นทุนและความเสี่ยง', 'คนเก่งบรรจุเป็นพนักงานได้ก่อน ลดต้นทุนการลองผิดลองถูก'],
  },
  {
    key: 'hro', group: 'outsourcing', no: '04', title: 'บริหารงานบุคคลครบวงจร', en: 'HRO', image: '/assets/hro.webp',
    intro: 'รับดูแลงานบุคคลแทน ทั้งคำนวณเงินเดือน ยื่นและจ่ายประกันสังคม และงานบุคคลที่ต้องถูกต้องตามกฎหมายไทย',
    challenges: ['ไม่คุ้นกฎหมายแรงงานไทย ไม่ชัดเรื่องคำนวณเงินเดือน ประกันสังคม และภาษี', 'ความพึงพอใจพนักงานต่ำ ความเสี่ยงด้านการจ้างงานสูง', 'ไม่มีประสบการณ์รับตรวจแรงงานและประกันสังคม ถูกปรับโดยไม่ทันตั้งตัว'],
    capabilities: ['ดูแลเงินเดือน ประกันสังคม และภาษีครบทุกขั้นตอนตามกฎหมาย', 'จัดทำสัญญาและข้อบังคับตามกฎหมายไทย', 'วางขั้นตอนคำนวณและอนุมัติค่าล่วงเวลา วันลา และค่าชดเชย'],
    value: ['งานยื่นเงินเดือนและประกันสังคมไม่ผิดพลาด', 'สัญญาและระเบียบถูกกฎหมาย ข้อร้องเรียนและการลาออกลดลง', 'HR หลุดจากงานเอกสาร รับตรวจแรงงานได้อย่างมั่นใจ'],
  },
  {
    key: 'visa', group: 'business', no: '05', title: 'วีซ่าและใบอนุญาตทำงาน', en: 'VISA SERVICE', image: '/assets/visa.webp',
    intro: 'ยื่นขอโควตาวีซ่าทำงานและดูแลครบทุกขั้นตอน รวมถึงวีซ่าผู้ติดตามและการศึกษาของบุตร',
    challenges: ['ไม่เข้าใจนโยบายวีซ่าไทย ขั้นตอนขอโควตาซับซ้อน เอกสารเปลี่ยนบ่อย', 'วีซ่าล่าช้าและเอกสารยุ่งยาก กระทบโครงการและธุรกิจ', 'ไม่มีแผนสำหรับครอบครัวผู้ติดตามและการเรียนของบุตร'],
    capabilities: ['วางกลยุทธ์และรายการเอกสารตามคุณสมบัติบริษัทและตำแหน่ง', 'ดำเนินการโควตาวีซ่าทำงาน ต่ออายุ เปลี่ยนประเภท และขยายเวลาแทน', 'วางแผนวีซ่าผู้ติดตามและการศึกษาของบุตร'],
    value: ['ผู้บริหารจากจีนเข้าทำงานตรงเวลามากขึ้น ถูกปฏิเสธน้อยลง', 'ไม่ต้องมีเจ้าหน้าที่วีซ่าประจำ ต้นทุนบริหารลดลง', 'ครอบครัวลงหลักปักฐานได้ไม่กังวล ผู้บริหารอยู่ครบวาระ'],
  },
  {
    key: 'consulting', group: 'business', no: '06', title: 'ที่ปรึกษาการลงทุนและองค์กร', en: 'CONSULTING', image: '/assets/consulting.webp',
    intro: 'ที่ปรึกษาจุดเดียว ตั้งแต่จดทะเบียนบริษัท วีซ่า วางระบบงานบุคคล การบริหารการจ้างงาน จนถึงการกำกับความเสี่ยงตามกฎหมายไทย',
    challenges: ['ขาดภาพรวมเรื่องจดทะเบียน โครงสร้างหุ้น และสิทธิประโยชน์ทางภาษี', 'ช่วงเริ่มต้นต้องประสานสำนักงานกฎหมาย บัญชี และหน่วยงานรัฐพร้อมกัน', 'วิธีคิดจีน–ไทยต่างกันมาก ปรับตัวได้ยาก'],
    capabilities: ['ที่ปรึกษาจุดเดียวสำหรับธุรกิจจีนที่เข้ามาไทย รวบรวมทรัพยากรทุกฝ่าย', 'ช่วยออกแบบระบบค่าตอบแทน ผลงาน และระดับตำแหน่งแบบไทย', 'ชี้จุดเสี่ยงทุกสถานการณ์ ให้คำปรึกษาด้านนโยบายและช่วยลงมือจริง'],
    value: ['ตั้งต้นธุรกิจได้เร็วขึ้น วางโครงสร้างหุ้นและภาษีไว้ล่วงหน้า', 'ระบบงานบุคคลไทยเชื่อมกับการบริหารแบบจีนได้ราบรื่น', 'ได้สิทธิประโยชน์ BOI ราบรื่น บริหารความเสี่ยงได้จริง'],
  },
  {
    key: 'rpo', group: 'talent', no: '07', title: 'สรรหาแบบโครงการ', en: 'RPO', image: '/assets/rpo.webp',
    intro: 'สรรหาบุคลากรจำนวนมาก พร้อมบริการเฮดฮันต์ผู้บริหารระดับกลาง–สูงและตำแหน่งเทคนิคหลัก ตามความต้องการแต่ละช่วงของธุรกิจ',
    challenges: ['ช่องทางสรรหาในไทยกระจัดกระจาย หาคนจำนวนมากยาก', 'ไม่มีกระบวนการมาตรฐาน เกณฑ์คัดเลือกจีน–ไทยไม่ตรงกัน', 'บริษัทใหม่ในไทยยังไม่มีแบรนด์นายจ้าง ผู้สมัครตอบรับน้อย'],
    capabilities: ['ใช้ช่องทางจีน–ไทยรองรับการส่งมอบจำนวนมาก', 'วางกระบวนการสรรหา Job Profile และระบบประเมินเดียวกันทั้งสองฝั่ง', 'ใช้แบรนด์นายจ้างท้องถิ่นและเครือข่ายภาครัฐ–ธุรกิจเสริมความน่าสนใจ'],
    value: ['ปิดตำแหน่งจำนวนมากได้เร็ว เติมกำลังคนทันเวลา', 'หาคนตำแหน่งสำคัญได้แม่นยำ สร้างทีมบริหารและทีมเทคนิคได้เร็วขึ้น', 'แบรนด์นายจ้างในไทยแข็งแรงขึ้น ช่องทางสรรหาระยะยาวคล่องตัว'],
  },
  {
    key: 'education', group: 'talent', no: '08', title: 'อาชีวศึกษาและหลักสูตรร่วม', en: 'VOCATIONAL + SCHOOL', image: '/assets/education.webp',
    intro: 'ร่วมกับสถานศึกษาไทยฝึกทักษะเฉพาะทาง เตรียมคนที่ตรงมาตรฐานไลน์ผลิตไว้ล่วงหน้า และส่งต่อให้บริษัทได้ก่อน',
    challenges: ['ทักษะผู้จบการศึกษาไม่ตรงมาตรฐานไลน์ผลิต', 'ตั้งศูนย์ฝึกเองลงทุนสูง ใช้เวลานาน และขอรับรองในไทยยาก', 'กำลังคนทักษะไม่สม่ำเสมอ'],
    capabilities: ['ร่วมสถานศึกษาไทย ประสานการอนุมัติ เปิดห้องเรียนเฉพาะที่ฝังมาตรฐานไลน์ผลิต', 'ทำข้อตกลงส่งตัวกับสถานศึกษา ล็อกกำลังคนตั้งแต่ระหว่างเรียน', 'จัดแนะแนวในสถานศึกษาและพาเยี่ยมชมโรงงาน ดึงดูดคนเพิ่ม'],
    value: ['มีแหล่งกำลังคนทักษะที่มั่นคง โดยไม่ต้องลงทุนศูนย์ฝึกเอง', 'ช่วงพีก ระบบส่งตัวก่อนช่วยให้ได้คนต่อเนื่อง', 'แบรนด์นายจ้างและความร่วมมือกับสถานศึกษาแน่นแฟ้นขึ้น'],
  },
];

const groups = [
  { key: 'all', no: '00', label: 'ทั้งหมด', intro: '8 บริการใน 3 กลุ่ม ใช้แยกหรือผสมกันได้ ครอบคลุมทั้งห่วงโซ่การจ้างงานของธุรกิจ' },
  { key: 'outsourcing', no: '01', label: 'Outsourcing', intro: 'ส่งงานที่ไม่ใช่ธุรกิจหลักให้ Engma (Thailand) ดูแล หรือให้เราดูแลงานบุคคลและความเสี่ยงของตำแหน่งงาน เพื่อปรับโครงสร้างกำลังคนและต้นทุน — 4 บริการใช้แยกหรือผสมกันได้ ครอบคลุมทั้งห่วงโซ่การจ้างงาน' },
  { key: 'business', no: '02', label: 'Business Services', intro: 'งานสนับสนุนสำหรับธุรกิจจีนที่ตั้งฐานในไทย ปลดล็อกขั้นตอนกฎหมายและเอกสารช่วงตั้งโรงงาน — วีซ่าคู่กับที่ปรึกษา ครอบคลุมก่อน ระหว่าง และหลังเข้ามาทำธุรกิจในไทย' },
  { key: 'talent', no: '03', label: 'Talent Supply Chain', intro: 'ช่องทางจัดหาบุคลากรท้องถิ่นในไทย ตั้งแต่แรงงานจำนวนมากถึงผู้บริหารระดับสูง — จัดหาจำนวนมากควบคู่การสร้างคนระยะยาว รองรับการเร่งกำลังผลิตและแผนกำลังคน' },
];

const pillars = [
  ['01', 'Engma Group', 'ถ่ายทอดความเชี่ยวชาญด้าน HR และประสบการณ์บริหารโครงการ'],
  ['02', 'Taiding ASEAN', 'ทรัพยากรอุตสาหกรรมท้องถิ่น และความสัมพันธ์ภาครัฐ–ธุรกิจไทย–จีน'],
  ['03', 'ทีมส่งมอบในไทย', 'ทีมท้องถิ่นที่ลงมือดูแลงานจริงในพื้นที่'],
  ['04', 'เคารพวัฒนธรรม', 'เคารพและสร้างสมดุลความแตกต่างทางวัฒนธรรมจีน–ไทย'],
];

const painPoints = [
  ['ตั้งต้นธุรกิจในไทยยาก', 'ไม่คุ้นนโยบาย กฎหมาย และระบบวีซ่าของไทย ช่วงเริ่มต้นจึงติดขั้นตอนเอกสารมาก'],
  ['สรรหาคนยาก', 'ช่องทางจำกัด ต้องการคนจำนวนมากในเวลาสั้น ขณะที่แรงงานทักษะมีไม่พอ'],
  ['บริหารไลน์ผลิตยาก', 'งานที่ไม่ใช่ธุรกิจหลักกินเวลา ขาดประสบการณ์จ้างงานในไทย ไลน์ผลิตไม่เสถียร'],
  ['คุมความเสี่ยงด้านกฎหมายยาก', 'ไม่คุ้นกฎหมายแรงงานและแนวปฏิบัติระหว่างนายจ้าง–ลูกจ้างไทย จึงมีความเสี่ยงแฝง'],
  ['ผสานวัฒนธรรมยาก', 'ระบบงาน ตรรกะธุรกิจ และวัฒนธรรมต่างกัน รูปแบบบริหารแบบจีนใช้ไม่ได้ผลเสมอไป'],
];

const focusSectors = [
  ['ยานยนต์พลังงานใหม่และชิ้นส่วนยานยนต์', 'บริษัทจีนเร่งตั้งโรงงานและขยายกำลังผลิตในไทย ต้องการคนมาก และต้องส่งมอบอย่างถูกกฎหมาย', ['BPO', 'Job Outsourcing']],
  ['อิเล็กทรอนิกส์อัจฉริยะและเซมิคอนดักเตอร์', 'ฐานการผลิตย้ายมาไทย ความต้องการสรรหาจำนวนมากและบุคลากรเทคนิคสูงขึ้น', ['Job Outsourcing', 'Staffing', 'RPO']],
  ['เศรษฐกิจดิจิทัล', 'บริษัทอินเทอร์เน็ตและ AI เร่งขยายฐานในไทย บุคลากรเทคนิคระดับสูงขาดแคลน', ['RPO', 'Headhunting', 'Visa']],
  ['โลจิสติกส์ คลังสินค้า และอีคอมเมิร์ซข้ามพรมแดน', 'การขนส่งข้ามแดนเติบโต ช่วงพีกและช่วงซบต่างกันมาก ต้องการการจ้างงานที่ยืดหยุ่น', ['BPO', 'RPO', 'Consulting']],
  ['อาหาร เกษตร และเศรษฐกิจชีวภาพ', 'บริษัทจีนลงทุนตั้งโรงงานในไทยต่อเนื่อง ต้องการเอาต์ซอร์สไลน์ผลิตและบริหารให้ถูกกฎหมาย', ['BPO', 'Job Outsourcing', 'HRO']],
] as const;

const industries = ['ยานยนต์และชิ้นส่วน', 'ขนส่งและโลจิสติกส์', 'เครื่องจักรกลหนัก', 'การสื่อสาร', 'การแพทย์และสุขภาพ', 'อิเล็กทรอนิกส์และเซมิคอนดักเตอร์', 'พลังงาน', 'IT และอินเทอร์เน็ต', 'อุปกรณ์การผลิต', 'เคมีภัณฑ์', 'สิ่งแวดล้อม', 'เกษตรอัจฉริยะ', 'ธนาคารและการเงิน', 'ค้าปลีก', 'สินค้าอุปโภคบริโภค'];

const advantageSides = [
  {
    mark: 'TH', title: 'จุดแข็งจากฝั่งไทย', partner: 'Taiding ASEAN · Namyong Group',
    items: [
      ['01', 'Government Access', 'เชื่อมภาครัฐ–ธุรกิจโดยตรง', 'เปิดช่องทางประสานภาครัฐ ตีความนโยบาย และสื่อสารกับหน่วยงานกำกับได้ในจุดเดียว'],
      ['02', 'Risk Advisory', 'มองความเสี่ยงก่อนเกิด', 'ระบุความเสี่ยงด้านการจ้างงานล่วงหน้า เลี่ยงปัญหาการบริหารที่ไม่เข้ากับบริบทไทย'],
      ['03', 'Industry Gateway', 'เชื่อมอุตสาหกรรมและคนโดยตรง', 'ผ่าน Namyong เชื่อมผู้ผลิตรถยนต์โดยตรง ผ่าน Taiding เข้าถึงบุคลากรท้องถิ่น'],
    ],
  },
  {
    mark: 'CN', title: 'จุดแข็งจากฝั่งจีน', partner: 'Engma Group',
    items: [
      ['01', 'China Insight', 'เข้าใจธุรกิจจีนโดยไม่ต้องแปล', 'สั่งสมประสบการณ์บริการภาคอุตสาหกรรมกว่า 20 ปี เข้าใจความต้องการของบริษัทจีนได้ทันที'],
      ['02', 'Proven Delivery', 'ระบบส่งมอบที่พิสูจน์แล้ว', 'กระบวนการมาตรฐานที่ผ่านโครงการจริงจำนวนมาก และปรับตามกฎหมายไทยแล้ว'],
      ['03', 'Talent Platform', 'ฐานกำลังที่แข็งแรง', 'ฐานพนักงานส่งตัว 200,000 คน เสริมด้วยแพลตฟอร์มดิจิทัลของกลุ่ม'],
    ],
  },
];

const teamStats = [
  ['10–15 ปี', 'ทีมบริหารโครงการ', 'ประสบการณ์บริหารโครงการเอาต์ซอร์สขนาดใหญ่'],
  ['10–20 ปี', 'ทีมที่ปรึกษาผู้เชี่ยวชาญ', 'ประสบการณ์บริหารในบริษัท Fortune Global 500 และบริษัทบริการขนาดใหญ่'],
  ['100+ คน', 'ทีมบริการลูกค้า', 'แพลตฟอร์มบริการและคอลเซ็นเตอร์ ดูแลงานบุคคลและงานสนับสนุนครบวงจร'],
  ['1,000+ โครงการ', 'ทีมวางแผนโครงการ', 'มาจากบริษัท Fortune Global 500 เข้าใจทั้งภาคการผลิตดั้งเดิมและภาคบริการสมัยใหม่'],
];

const clientMix = [
  ['30%', 'บริษัทจดทะเบียน'], ['25%', 'Fortune Global 500'], ['20%', 'ธุรกิจรูปแบบใหม่'], ['15%', 'รัฐวิสาหกิจจีน'], ['10%', 'อื่น ๆ'],
];

const processSteps = [
  ['01', 'วิเคราะห์ความต้องการ', 'ลงพื้นที่ ทำความเข้าใจโครงสร้างคน จุดเสี่ยงด้านกฎหมาย และจังหวะช่วงพีกของการจ้างงาน'],
  ['02', 'ออกแบบโซลูชัน', 'จับคู่บริการ 3 กลุ่ม ออกแบบชุด สรรหา + เอาต์ซอร์ส + ที่ปรึกษา พร้อมใบเสนอราคา'],
  ['03', 'ลงนามสัญญา', 'กำหนดขอบเขตบริการ ความรับผิดชอบด้านนายจ้าง และเงื่อนไขความปลอดภัยข้อมูล'],
  ['04', 'เริ่มส่งมอบ', 'ทีมเข้าพื้นที่ เชื่อมระบบ จัดคนเข้าทำงาน และตรวจรับตาม Milestone'],
  ['05', 'บริหารต่อเนื่อง', 'ดูแลสรรหา จ่ายเงินเดือน ยื่นประกันสังคมและสวัสดิการตามกฎหมาย และแจ้งเตือนความเสี่ยง'],
  ['06', 'ประเมินและพัฒนา', 'ทบทวนผลด้านต้นทุน ประสิทธิภาพ และการปฏิบัติตามกฎหมาย เพื่อปรับแผนต่อเนื่อง'],
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
  const selectedGroup = groups.find((group) => group.key === activeGroup) ?? groups[0];

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
          <a href="#sectors" onClick={() => setMenuOpen(false)}>อุตสาหกรรม</a>
          <a href="#advantages" onClick={() => setMenuOpen(false)}>จุดแข็ง</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>ขั้นตอน</a>
        </nav>
        <a className="header-cta" href="#contact">ปรึกษาผู้เชี่ยวชาญ <span>↗</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="เปิดเมนู" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src={assetPath(images.hero)} alt="ทิวทัศน์กรุงเทพมหานครยามเย็น" />
        <div className="hero-shade" />
        <div className="hero-grid" />
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-content">
          <p className="eyebrow"><span /> ENGMA THAILAND · PEOPLE / BUSINESS / BEYOND</p>
          <h1>เชื่อมคน<br />ขับเคลื่อน<span>ความเป็นไปได้</span></h1>
          <p className="hero-copy">ผู้ให้บริการทรัพยากรบุคคลสำหรับธุรกิจจีนที่ขยายสู่ประเทศไทยโดยเฉพาะ<br />ให้ทุกบริษัทหยั่งรากในไทยได้อย่างไร้กังวล และเติบโตได้เต็มที่</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#services">สำรวจบริการ <span>↓</span></a>
            <a className="button button-ghost" href="#about"><i className="play">▶</i> รู้จัก Engma Thailand</a>
          </div>
        </div>
        <div className="hero-rail" aria-label="สถิติสำคัญ">
          <div><strong>24</strong><span>ปีของกลุ่ม Engma</span></div>
          <div><strong>2<span>แสน+</span></strong><span>พนักงานที่ส่งตัวไปประจำ</span></div>
          <div><strong>240<span>+</span></strong><span>สาขาทั่วประเทศจีน</span></div>
          <div><strong>5<span>ล้าน</span></strong><span>คนที่ฝึกอบรมและจัดหางานสะสม</span></div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="เลื่อนไปส่วนถัดไป"><span /> SCROLL TO EXPLORE</a>
      </section>

      <section className="intro section" id="about">
        <div className="section-heading">
          <p className="section-kicker">01 / ABOUT ENGMA THAILAND</p>
          <h2>ความเชี่ยวชาญจากจีน<br />เชื่อมกับพลังท้องถิ่นไทย</h2>
        </div>
        <div className="intro-copy">
          <p className="lead">Engma (Thailand) เป็นบริษัทร่วมทุนระหว่าง Engma Group และ Taiding ASEAN ผู้ให้บริการ HR สำหรับธุรกิจจีนที่ขยายสู่ต่างประเทศโดยเฉพาะ มีรากฐานที่หลอมรวมวัฒนธรรมจีนและไทยไว้ด้วยกัน</p>
          <a className="text-link" href="#shareholders">รู้จักสองผู้ถือหุ้น <span>↘</span></a>
        </div>
      </section>

      <section className="pillars section" aria-label="ระบบสนับสนุนสี่ด้าน">
        <div className="pillars-grid">
          {pillars.map(([no, title, copy]) => (
            <article key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
        <div className="mission">
          <div>
            <small>OUR MISSION</small>
            <blockquote>รวมพลังภูมิปัญญาจีน–ไทย ด้วยบริการ HR ที่ไว้วางใจได้ ช่วยให้ทุกธุรกิจที่มาไทยหยั่งรากได้อย่างไร้กังวล และเติบโตได้เต็มที่</blockquote>
          </div>
          <div>
            <small>OUR VALUES</small>
            <ul>
              <li><b>01</b>ความเป็นมืออาชีพ</li>
              <li><b>02</b>ร่วมกันเติบโตอย่างยั่งยืน</li>
              <li><b>03</b>เคารพความต่างทางวัฒนธรรม</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="shareholders" id="shareholders">
        <article className="shareholder-card shareholder-thai">
          <img src={assetPath(images.taiding)} alt="ท่าเรือและเครือข่ายธุรกิจของ Namyong Group" />
          <div className="card-overlay" />
          <div className="shareholder-content">
            <p>THAI SHAREHOLDER</p>
            <h3>Taiding ASEAN</h3>
            <p className="description">ผู้ดำเนินงานเชิงลึกด้านความสัมพันธ์ภาครัฐ–ธุรกิจไทย–จีน องค์กรสื่อสารครบวงจรในเครือ Namyong Group ที่เน้นงานสื่อ ประชาสัมพันธ์ และกิจกรรมวัฒนธรรม–การศึกษา</p>
            <ul className="shareholder-points">
              <li>ผู้จัดทำนิตยสารเศรษฐกิจการค้ารายเดือนสองภาษาไทย–จีน 《东盟博览》</li>
              <li>ประสานงานกับหน่วยงานภาครัฐได้ เป็นสะพานเชื่อมสู่ประเทศไทย</li>
              <li>เชื่อมต่อหอการค้า สมาคม และทรัพยากรภาคอุตสาหกรรม</li>
            </ul>
            <div className="micro-stats"><span><b>2016</b>ก่อตั้ง</span><span><b>1974</b>Namyong Group</span><span><b>#2</b>ท่าเรือ RoRo ในเอเชีย</span><span><b>1.5M+</b>คันส่งออกต่อปี</span></div>
          </div>
        </article>
        <article className="shareholder-card shareholder-china">
          <img src={assetPath(images.engmaGroup)} alt="อุตสาหกรรมที่ Engma ให้บริการ" />
          <div className="card-overlay" />
          <div className="shareholder-content">
            <p>CHINESE SHAREHOLDER</p>
            <h3>Engma Group</h3>
            <p className="description">ผู้ให้บริการทรัพยากรบุคคลชั้นนำของจีน ครอบคลุมเอาต์ซอร์สภาคการผลิต ภาคบริการ อินเทอร์เน็ต เศรษฐกิจแพลตฟอร์ม การเงิน และงานบริการรัฐวิสาหกิจ</p>
            <ul className="shareholder-points">
              <li>สมาชิกองค์กรระดับโลกของ WEC (World Employment Confederation) รายแรกของจีน</li>
              <li>ติด 10 อันดับแบรนด์บริการ HR ของจีน ปี 2025</li>
              <li>ได้รับรางวัลระดับประเทศกว่า 30 รางวัล</li>
            </ul>
            <div className="micro-stats"><span><b>2002</b>ก่อตั้ง</span><span><b>90+</b>เมืองในจีน</span><span><b>240+</b>สาขา</span><span><b>5,400+</b>ลูกค้าองค์กร</span></div>
          </div>
        </article>
      </section>

      <section className="numbers section" aria-label="ข้อมูลสำคัญของกลุ่ม Engma">
        <div className="numbers-title"><p className="section-kicker">ENGMA GROUP AT A GLANCE</p><h2>ความเชื่อมั่น<br />ที่วัดผลได้</h2><small>ข้อมูล ณ มกราคม 2026</small></div>
        {[
          ['1,200+', 'ทีมบริหารมืออาชีพ'], ['250,000', 'บุคลากรที่ฝึกอบรมและจัดหาต่อปี'], ['5M', 'คนที่ฝึกอบรมและจัดหางานสะสม'],
          ['200,000+', 'พนักงานที่ส่งตัวไปประจำ'], ['5,400+', 'ลูกค้าองค์กร'], ['30+', 'รางวัลระดับประเทศ'],
          ['Top 10', 'แบรนด์บริการ HR จีน ปี 2025'], ['10.2B', 'รายได้กลุ่มต่อปี (หยวน)'], ['427M', 'ภาษีที่กลุ่มจ่ายต่อปี (หยวน)'],
        ].map(([value, label]) => <div className="number-item" key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <section className="pain-section">
        <div className="pain-photo"><img src={assetPath(images.pain)} alt="กรุงเทพมหานคร ศูนย์กลางธุรกิจของประเทศไทย" /></div>
        <div className="pain-content">
          <p className="section-kicker light">5 CHALLENGES IN THAILAND</p>
          <h2>5 โจทย์ยาก<br />ของธุรกิจจีนในไทย</h2>
          <div className="pain-list">
            {painPoints.map(([title, copy], index) => (
              <div key={title}><b>0{index + 1}</b><span><strong>{title}</strong><small>{copy}</small></span><i>↗</i></div>
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
        <p className="group-intro">{selectedGroup.intro}</p>
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

      <section className="focus section" id="sectors">
        <div className="section-heading">
          <div><p className="section-kicker">FOCUS SECTORS</p><h2>5 อุตสาหกรรม<br />ที่เราโฟกัส</h2></div>
          <p>อุตสาหกรรมที่บริษัทจีนเข้ามาลงทุนในไทยมากที่สุด พร้อมบริการหลักที่ตอบโจทย์แต่ละกลุ่ม</p>
        </div>
        <div className="focus-grid">
          {focusSectors.map(([title, trend, products], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{trend}</p>
              <small>บริการหลัก</small>
              <ul>{products.map((product) => <li key={product}>{product}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="advantages section" id="advantages">
        <div className="section-heading advantages-heading">
          <div><p className="section-kicker">03 / WHY US</p><h2>ความได้เปรียบ<br />จากผู้ถือหุ้นสองประเทศ</h2></div>
          <p>ประสบการณ์ระดับกลุ่มบริษัทจากจีน ผสานเครือข่ายท้องถิ่นของไทย ให้ทุกการขยายธุรกิจเดินหน้าได้เร็วและปลอดภัยกว่า</p>
        </div>
        {advantageSides.map((side) => (
          <div key={side.mark}>
            <div className="advantage-side"><b>{side.mark}</b><div><span>{side.title}</span><small>{side.partner}</small></div></div>
            <div className="advantages-grid">
              {side.items.map(([no, en, title, copy]) => (
                <article key={no}><span>{no}</span><small>{en}</small><h3>{title}</h3><p>{copy}</p><i>↗</i></article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="resource-band">
        <img src={assetPath(images.resources)} alt="โรงงานสมัยใหม่ในประเทศไทย" />
        <div className="resource-shade" />
        <div className="resource-copy"><p className="section-kicker light">TALENT INFRASTRUCTURE · รวมจีน–ไทย</p><h2>ทรัพยากรจีน–ไทย<br />พร้อมส่งมอบอย่างเสถียร</h2></div>
        <div className="resource-stats">
          {[['200+', 'สถานศึกษาพันธมิตร'], ['100+', 'พันธมิตรจัดหาทรัพยากร'], ['4', 'ฐานส่งมอบทรัพยากรเฉพาะทาง'], ['200K', 'ข้อมูลพนักงานและเครือข่ายสรรหาตรง']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="local section">
        <div className="local-image"><img src={assetPath(images.localResources)} alt="ท่าเรือ RoRo ของ Namyong Group (ภาพชั่วคราว)" /></div>
        <div className="local-copy">
          <p className="section-kicker">LOCAL NETWORK</p>
          <h2>ทรัพยากรท้องถิ่น<br />เชื่อมต่อได้รวดเร็ว</h2>
          <p>อาศัยทรัพยากรที่ Taiding ASEAN และ Namyong Group สั่งสมในไทย ช่วยให้ธุรกิจเข้าใจสภาพแวดล้อมอุตสาหกรรมไทย และเชื่อมต่อนิคมอุตสาหกรรม บริษัท บุคลากร และหน่วยงานบริการที่เกี่ยวข้องตามความต้องการจริง ลดเวลาและต้นทุนในการเริ่มหาทรัพยากรจากศูนย์</p>
          <div className="local-note">
            <b>Namyong Group</b>
            <p>กลุ่มธุรกิจหลากหลายของไทย ก่อตั้งปี 1974 ครอบคลุมขนส่งทางเรือและโลจิสติกส์ การค้า สื่อ การแพทย์ และพลังงาน เป็นเจ้าของท่าเรือ RoRo สำหรับรถยนต์โดยเฉพาะ อันดับ 4 ของโลก อันดับ 2 ของเอเชีย และแห่งเดียวในไทย เป็นศูนย์กลางสำคัญของการส่งออกและความร่วมมือเศรษฐกิจจีน–ไทย</p>
            <div className="local-stats"><span><strong>52 ปี</strong>ประสบการณ์</span><span><strong>5</strong>กลุ่มธุรกิจหลัก</span><span><strong>1.5M+</strong>รถยนต์ส่งออกต่อปี</span></div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-inner section">
          <div className="team-image"><img src={assetPath(images.team)} alt="ทีมงาน Engma (ภาพชั่วคราว)" /></div>
          <div className="team-copy">
            <p className="section-kicker light">EXPERIENCED TEAM</p>
            <h2>ทีมงานมากประสบการณ์<br />ลงมือได้จริง</h2>
            <div className="team-list">
              {teamStats.map(([value, title, copy]) => (
                <div key={title}><strong>{value}</strong><p><b>{title}</b><span>{copy}</span></p></div>
              ))}
            </div>
            <div className="client-mix">
              <p className="section-kicker light">CLIENT PORTFOLIO</p>
              <div className="client-grid">
                {clientMix.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise section">
        <div className="expertise-image"><img src={assetPath(images.compliance)} alt="การบริหารความเสี่ยงและการปฏิบัติตามกฎหมาย" /><div><span>CN</span><i>×</i><span>TH</span></div></div>
        <div className="expertise-copy"><p className="section-kicker">CROSS-BORDER COMPLIANCE</p><h2>บริหารความเสี่ยงข้ามพรมแดน<br />ถูกต้องตามกฎหมายสองประเทศ</h2><p>ผสานความเชี่ยวชาญด้านการบริหารทรัพยากรบุคคลและการควบคุมความเสี่ยงของ Engma กับกฎหมายและประสบการณ์ปฏิบัติงานในไทย ช่วยธุรกิจจีนเชื่อมข้อกำหนดของทั้งสองประเทศ ระบุ ป้องกัน และบริหารความเสี่ยงได้ครบ ตั้งแต่สำนักงานใหญ่ในจีนถึงหน่วยงานในไทย</p>
          <div className="books">
            <small>ผลงานของทีมกฎหมายและควบคุมความเสี่ยง Engma</small>
            <div><i>BOOK</i><p><b>《劳动关系管理——审判规则与指导案例》</b><span>การบริหารแรงงานสัมพันธ์ — หลักการพิจารณาคดีและคดีตัวอย่าง</span></p></div>
            <div><i>BOOK</i><p><b>《人力资源管理——最新法律法规汇编》</b><span>การบริหารทรัพยากรบุคคล — รวมกฎหมายและข้อบังคับล่าสุด</span></p></div>
          </div>
        </div>
      </section>

      <section className="comparison section">
        <div className="comparison-head"><div><p className="section-kicker">THE ENGMA DIFFERENCE</p><h2>มากกว่าการส่งคน<br />คือการส่งมอบผลลัพธ์</h2></div><p>หนึ่งทีมดูแลตั้งแต่กฎหมาย การสรรหา ไปจนถึงการบริหารหน้างาน</p></div>
        <div className="comparison-table" role="table" aria-label="เปรียบเทียบผู้ให้บริการ">
          <div className="table-row table-header" role="row"><span>มิติเปรียบเทียบ</span><strong>Engma (Thailand)</strong><span>บริษัทจัดหางานไทย</span><span>บริษัท HR จากยุโรปและอเมริกา</span></div>
          {[
            ['รูปแบบบริการ', 'เอาต์ซอร์ส + บริการธุรกิจ + ที่ปรึกษา ครบในจุดเดียว', 'ส่งแรงงานบลูคอลลาร์ระดับพื้นฐาน', 'สรรหาและเฮดฮันต์ไวต์คอลลาร์ระดับสูง'],
            ['การกำกับความเสี่ยง', 'ทีมกฎหมายจีน–ไทยดูแลครบทุกขั้นตอน', 'ดูแลกฎหมายแรงงานพื้นฐาน ไม่รองรับความเสี่ยงธุรกิจข้ามประเทศ', 'ดูแลเฉพาะขั้นตอนสรรหา ไม่รับผิดชอบการจ้างงานในไทย'],
            ['การทำงานจีน–ไทย', 'ทีมร่วมทุนจีน–ไทย ทรัพยากรสองฝั่งทำงานร่วมกันไร้รอยต่อ', 'ทีมท้องถิ่นล้วน ไม่มีทรัพยากรจีนและประสบการณ์ธุรกิจข้ามประเทศ', 'สำนักงานใหญ่ระดับโลก แต่ลงพื้นที่ไทยได้จำกัด'],
            ['ทรัพยากรอุตสาหกรรม', 'ทุนอุตสาหกรรมเกือบ 50 ปีของฝั่งไทย เชื่อมห่วงโซ่ยานยนต์ ผู้ผลิตรถ คลัสเตอร์ชิ้นส่วน และเครือข่ายภาครัฐ–ธุรกิจ', 'มีเพียงแรงงานทั่วไปแบบกระจัดกระจาย', 'ไม่มีทรัพยากรอุตสาหกรรมหลักในไทย'],
            ['การส่งมอบ', 'สรรหา ฝึกอบรม บริหารหน้างาน และกำกับความเสี่ยง ครบทั้งห่วงโซ่', 'ส่งคนอย่างเดียว ไม่บริหารหน้างาน', 'แนะนำประวัติและนัดสัมภาษณ์ ไม่ดูแลระหว่างทำงาน'],
          ].map((row) => <div className="table-row" role="row" key={row[0]}>{row.map((cell, index) => index === 1 ? <strong key={cell}>{cell}<i>✓</i></strong> : <span key={cell}>{cell}</span>)}</div>)}
        </div>
      </section>

      <section className="industry-section">
        <div className="industry-copy"><p className="section-kicker light">INDUSTRIES WE SERVE</p><h2>ลึกในอุตสาหกรรม<br />กว้างในโอกาส</h2><p>ประสบการณ์ดูแลลูกค้าใน 15 อุตสาหกรรม โซลูชันเริ่มจากบริบทจริงของธุรกิจ ไม่ใช่แพ็กเกจสำเร็จรูป</p></div>
        <div className="industry-marquee" aria-label="อุตสาหกรรมที่ให้บริการ">
          {[...industries, ...industries].map((industry, index) => <span key={`${industry}-${index}`}><i>{String((index % industries.length) + 1).padStart(2, '0')}</i>{industry}</span>)}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-bg"><img src={assetPath(images.process)} alt="สำนักงานและทีมปฏิบัติการของ Engma" /></div>
        <div className="process-content section"><p className="section-kicker light">04 / HOW WE WORK</p><div className="process-head"><h2>6 ขั้นตอนมาตรฐาน<br />จากโจทย์สู่ผลลัพธ์</h2><p>ทุกการร่วมงานมีจุดตรวจชัดเจน และการส่งมอบที่คาดการณ์ได้</p></div>
          <div className="process-line">{processSteps.map(([no, title, copy]) => <article key={no}><span>{no}</span><div className="process-dot" /><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="closing" id="contact">
        <img src={assetPath(images.closing)} alt="วัดอรุณ กรุงเทพมหานคร" />
        <div className="closing-shade" />
        <div className="closing-content"><p>OUR COMMITMENT</p><h2>ให้ทุกธุรกิจจีนที่เข้าสู่ตลาดไทย<br />ได้รับบริการ HR ที่ไว้วางใจได้</h2><p className="closing-values">มืออาชีพ · ร่วมกันเติบโต · เคารพข้ามวัฒนธรรม</p><div><a className="button button-primary" href="https://www.engmahro.com/lianxiwomen/" target="_blank" rel="noreferrer">เริ่มต้นพูดคุยกับเรา <span>↗</span></a><a className="button button-ghost" href="mailto:engmahro@engma.net">engmahro@engma.net</a></div></div>
      </section>

      <footer>
        <div className="footer-brand"><img src={assetPath('/assets/engma-logo.png')} alt="Engma" /><p>Professionalism · Mutual Prosperity · Cross-cultural Respect</p></div>
        <div className="footer-links"><a href="#about">เกี่ยวกับเรา</a><a href="#services">บริการ</a><a href="#sectors">อุตสาหกรรม</a><a href="#advantages">จุดแข็ง</a><a href="#process">ขั้นตอน</a></div>
        <div className="footer-end"><span>ENGMA (THAILAND) COMPANY LIMITED</span><span>© 2026 ENGMA THAILAND</span></div>
      </footer>
    </main>
  );
}
