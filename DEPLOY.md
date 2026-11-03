# Engma Thailand — สถานะเว็บและการ deploy

> อัปเดตล่าสุด 3 พ.ย. 2026

## สรุปสั้น

| ที่อยู่ | ใช้ทำอะไร | สถานะ |
|---|---|---|
| **https://hongthayban-dev.github.io/engma-thailand-site/** | **ลิงก์ให้ลูกค้าดู** (GitHub Pages) | ✅ เว็บเต็มล่าสุด อัปเดตเองทุกครั้งที่ push `main` |
| https://engma.co.th | เว็บจริง (NAS + Cloudflare Tunnel) | 🔒 **Coming Soon เท่านั้น** จนกว่าเจ้าของจะสั่ง |
| https://engma-thailand.hongthayban.chatgpt.site | ลิงก์ตัวอย่างเก่า (Codex Sites) | ⚠️ เวอร์ชันเก่า ไม่ได้อัปเดตแล้ว |

- โค้ด: https://github.com/hongthayban-dev/engma-thailand-site (public — สร้างใหม่ 3 พ.ย. 2026 หลังลบ repo เดิม)
- หน้าเว็บ: [app/page.tsx](app/page.tsx) (หน้าเดียว) + [app/globals.css](app/globals.css) — Next.js 16 static export

## กฎสำคัญ

- **engma.co.th ต้องเป็นหน้า Coming Soon เท่านั้น** ห้ามเอาเนื้อหาเว็บขึ้นจนกว่าเจ้าของจะสั่ง
- **ห้ามรัน `npm run publish:nas`** ถ้าเจ้าของไม่ได้สั่ง — คำสั่งนี้เอาเว็บเต็มขึ้น engma.co.th ทับ Coming Soon ทันที
- `deploy/nas/site/` (Coming Soon ที่ออนไลน์อยู่) ทำจากไฟล์สำรอง ไม่ได้ build จากโค้ด — สำรองไว้ที่ `outputs/coming-soon-only-2026-11-02.tar.gz`
- ห้าม commit `deploy/nas/.env` (token ของ tunnel) และ `Engma Profile.pptx` (199MB เกินขีดจำกัด GitHub) — อยู่ใน `.gitignore` แล้ว

## เนื้อหาเว็บ

- เนื้อหามาจาก `Engma Profile.pptx` (สไลด์ภาษาจีน 36 หน้า) เรียงตาม 4 บทของสไลด์: เกี่ยวกับเรา → บริการ → จุดแข็ง → ขั้นตอน
- หัวข้อแรก: "บริการ HR ครบวงจร สำหรับธุรกิจจีนในไทย" (เจ้าของขอให้อ่านแล้วรู้ทันทีว่าบริษัททำอะไร)
- **รูปทั้งหมดกำหนดที่ object `images` ด้านบนของ `app/page.tsx`** — เปลี่ยนรูปแก้ที่เดียว
- ⚠️ **ภาพชั่วคราว รอเจ้าของหารูปจริงมาเปลี่ยน:**
  - `public/assets/placeholder/local-resources.svg` — ท่าเรือ RoRo ของ Namyong Group (แนะนำ 1600 × 1100 px)
  - `public/assets/placeholder/team.svg` — ทีมงาน / สำนักงาน Engma (แนะนำ 1200 × 1500 px)
- ปุ่มติดต่อใช้ `engmahro@engma.net` และลิงก์ https://www.engmahro.com/lianxiwomen/
- แบบ 1 เดิมเก็บไว้อ้างอิงที่ `app/_design-1-archived/` (ขึ้นต้น `_` จึงไม่เป็น route) — แบบ 2 ลบทิ้งแล้ว

## การอัปเดตเว็บ

**ลิงก์ลูกค้า (GitHub Pages):** แก้โค้ด → commit → `git push origin main` → GitHub Actions (`.github/workflows/deploy-pages.yml`) build และ deploy เองใน 2–3 นาที
- Settings → Pages → Source ต้องเป็น **GitHub Actions**
- ดูผล build: https://github.com/hongthayban-dev/engma-thailand-site/actions

**engma.co.th (NAS):** เฉพาะเมื่อเจ้าของสั่งเท่านั้น → `npm run publish:nas` (build แล้ว rsync ลง `deploy/nas/site/` เว็บเปลี่ยนทันที ไม่ต้องรีสตาร์ต container)

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run build:pages` | build สำหรับ GitHub Pages (ใช้ใน GitHub Actions) |
| `npm run build:hostatom` | build เป็น HTML ลง `out/` + แพ็ก `outputs/engma-hostatom.zip` (`publish:nas` เรียกใช้ตัวนี้) |
| `npm run publish:nas` | build แล้วอัปเดต `deploy/nas/site/` — ⚠️ ดูกฎด้านบน |

## โครงสร้างระบบ engma.co.th

- **โดเมน:** จดกับ Hostatom (10 ต.ค. 2026, ในชื่อ บริษัท อิงมา (ไทยแลนด์) จำกัด) — **ต่ออายุทุกปี**
- **Cloudflare:** โซน `engma.co.th` อยู่บัญชี `momotaromeet@gmail.com` (NS `gerald` / `stephane.ns.cloudflare.com`)
  - Tunnel `engma-site`: `engma.co.th` และ `www.engma.co.th` → `http://engma-site:80`
  - เปิด Always Use HTTPS แล้ว, `www` → `engma.co.th` (ทำใน nginx)
  - DNS อีเมล Google Workspace (MX/SPF/TXT/CNAME) Hostatom เป็นคนใส่ — อย่าลบ
- **NAS:** `ssh worktech@100.116.39.83`, รันด้วย `sudo -n /usr/local/bin/docker compose up -d` ในโฟลเดอร์ `deploy/nas`
  - container `engma-site` (nginx, LAN `:8091`) + `engma-cloudflared` (tunnel ของตัวเอง)
  - token ของ tunnel อยู่ใน `deploy/nas/.env`

## งานค้าง

- [ ] **รูปเก่าค้างใน cache Cloudflare** — ลบจาก NAS แล้ว แต่ยังเปิดได้ถ้ารู้ URL (หมดอายุเองราว 2 ธ.ค. 2026) ถ้าจะล้างก่อน: บัญชี `momotaromeet@gmail.com` → โซน `engma.co.th` → Caching → Configuration → Custom Purge ใส่ `https://engma.co.th/assets/` ตามด้วย `bangkok.webp`, `bpo.webp`, `closing.webp`, `engma-logo.png`, `factory.webp`, `legal.webp`, `process-office.webp`, `team.webp`, `thai-port.webp`
- [ ] **เปลี่ยนภาพชั่วคราว 2 ภาพ** (ดูหัวข้อ "เนื้อหาเว็บ")
- [ ] **MX record พิมพ์ผิด** `lt3.aspmx.l.google.com` ควรเป็น `alt3.aspmx.l.google.com`
- [ ] **ตัดสินใจเรื่องอีเมล `@engma.co.th`** — ตอนนี้เว็บใช้ `engmahro@engma.net` (NAS ทำอีเมลไม่ได้ ต้องใช้ Google Workspace / Zoho แล้วตั้ง MX ใน Cloudflare)
- [ ] **`node_modules` ในโปรเจคเสีย** — เป็นไฟล์ symlink ไป `/tmp/engma_site_runtime/node_modules` ที่หายไปแล้ว ต้องลบแล้ว `npm ci` ใหม่ก่อน build ในเครื่อง
- [ ] `out/` และ `outputs/engma-hostatom.zip` เป็นของเก่า 15 ต.ค. — อย่าเอาไปใช้
- [ ] ปิดลิงก์ chatgpt.site เก่า (ทำได้จากแอป Codex เท่านั้น) หรือปล่อยไว้แต่อย่าส่งให้ลูกค้าแล้ว

## หมายเหตุเครื่องที่ใช้ทำงาน (Windows)

- โปรเจคอยู่บน NAS (`V:\` = `\\100.116.39.83\docker`) → git จะเตือน "dubious ownership" แก้ด้วย `git config --global --add safe.directory '*'`
- เครื่องนี้ยังไม่ได้ตั้งชื่อผู้ใช้ git — commit ใช้ `ห้องท้ายบ้าน <hongthayban@gmail.com>`
- ติดตั้ง Node.js 22 แล้ว (3 พ.ย. 2026) — ยังไม่มี Python และ GitHub CLI
