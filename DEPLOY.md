# ย้ายเว็บ Engma Thailand ขึ้น engma.co.th

> เริ่มบันทึก 10 ต.ค. 2026 · เว็บออนไลน์ 14 ต.ค. 2026

## ✅ ออนไลน์แล้ว 14 ต.ค. 2026 — https://engma.co.th

> หัวข้อด้านล่างจาก "สถานะตอนนี้" ลงไปเป็นบันทึกเก่าของวันที่ 10 ต.ค. — ให้ยึดหัวข้อนี้เป็นหลัก

- **31 ต.ค. 2026:** ตัดสินใจแล้ว → ใช้ **แบบ 1** เป็นหน้าแรกจริง (`app/page.tsx` ตอนนี้คือเนื้อหาเต็มของแบบ 1 แทน Coming Soon แล้ว) — โฟลเดอร์ `/design-1/`, `/design-2/` เปลี่ยนชื่อเป็น `_design-1-archived`, `_design-2-archived` (ขึ้นต้น `_` ทำให้ Next.js ไม่ทำเป็น route แล้ว แต่ไฟล์ยังอยู่เผื่ออ้างอิง) — commit และ push ขึ้น GitHub แล้ว
- ~~หน้าแรกเป็น "Coming Soon" สีน้ำเงิน (`app/page.tsx`) — `/design-1/`, `/design-2/` ยังเปิดได้ด้วยลิงก์ตรง~~ (สถานะเก่าก่อน 31 ต.ค.)
- **Cloudflare:** โซน `engma.co.th` อยู่บัญชี **`momotaromeet@gmail.com`** (Hostatom ตั้งให้, NS `gerald` / `stephane.ns.cloudflare.com`)
  - Tunnel **`engma-site`** (บัญชีเดียวกัน): `engma.co.th` และ `www.engma.co.th` → `http://engma-site:80`
  - เปิด Always Use HTTPS แล้ว, `www` → `engma.co.th` (nginx)
  - DNS อีเมล Google Workspace (MX/SPF/TXT verify/CNAME) Hostatom เป็นคนใส่ — อย่าลบ (MX `lt3.aspmx.l.google.com` พิมพ์ผิด ควรเป็น `alt3`)
- **NAS:** project `deploy/nas` รันด้วย SSH (`ssh worktech@100.116.39.83`, `sudo -n /usr/local/bin/docker compose up -d`)
  - container `engma-site` (nginx, LAN `:8091`) + `engma-cloudflared` (tunnel ของตัวเอง ไม่พึ่ง MAHA48 แล้ว)
  - token ของ tunnel อยู่ใน `deploy/nas/.env` (ห้าม commit — อยู่ใน `.gitignore`)
- โซน `engma.co.th` ที่เคยเพิ่มในบัญชี `hongthayban@gmail.com` (pending, NS mitch/nia) ไม่ได้ใช้ — Cloudflare จะลบเองเมื่อไม่ active
- commit และ push ขึ้น GitHub แล้ว (31 ต.ค.) → GitHub Pages จะ build ใหม่เป็นหน้าแรกแบบ 1 ด้วย (ของ engma.co.th จริงยังต้องรัน `npm run publish:nas` แยกต่างหากถ้าต้องการให้ตรงกัน)

## สถานะตอนนี้

- **โดเมน** `engma.co.th` จดกับ Hostatom เมื่อ 10 ต.ค. 2026 (ในชื่อ บริษัท อิงมา (ไทยแลนด์) จำกัด)
  - Name Server ยังเป็นตัวพักโดเมน `PARK1.HOSTATOM.COM` / `PARK2.HOSTATOM.COM` → ยังไม่มีเว็บแสดง
- **เว็บเป็น HTML ล้วน (static)** ไม่มีฐานข้อมูลหรือ API → ไม่ต้องใช้ Node.js บนเซิร์ฟเวอร์
  - build แล้วทดสอบบนเครื่อง: ทุกหน้า/ทุกรูปโหลดได้ ไม่มีลิงก์เสีย
  - ลิงก์และรูปตอนแชร์ (og.png) ชี้ไปที่ `https://engma.co.th` แล้ว
- **ตอนนี้เว็บยังออนไลน์อยู่ที่ GitHub Pages:** https://hongthayban-dev.github.io/engma-thailand-site
- **ไฟล์ที่เพิ่ม/แก้ทั้งหมดยังไม่ได้ commit ลง git**

## ต้องตัดสินใจก่อน

- [ ] **จะเอาเว็บไว้ที่ไหน** (ดูตารางด้านล่าง) — คุยล่าสุดเอียงไปทาง NAS
- [x] **หน้าแรกจะเป็นอะไร** — ตัดสินใจแล้ว (31 ต.ค. 2026): **แบบ 1** เป็นหน้าแรกจริง
- [ ] **ต้องการอีเมล `@engma.co.th` ไหม** — ตอนนี้ปุ่มติดต่อในเว็บใช้ `engmahro@engma.net`

| ทางเลือก | ค่าใช้จ่าย | ข้อดี | ข้อเสีย | สถานะ |
|---|---|---|---|---|
| **A. NAS + Cloudflare Tunnel** | ฟรี | ใช้ระบบที่มีอยู่แล้ว, ไม่ต้องเปิด port เราเตอร์, https ฟรี | NAS ดับ / เน็ตบ้านล่ม / ไฟดับ = เว็บล่ม, พึ่ง cloudflared ของโปรเจกต์ MAHA48 | เตรียมไฟล์แล้ว |
| **B. Hostatom Web Hosting** | ค่าโฮสติ้งรายปี | เสถียร, มีอีเมล `@engma.co.th` ในแพ็ก | ต้องจ่ายเพิ่ม, อัปเดตต้องอัป zip เอง | เตรียมไฟล์แล้ว |
| **C. Cloudflare Pages** | ฟรี | เสถียร ไม่พึ่ง NAS | ต้องตั้งค่าใหม่ | ยังไม่ได้เตรียม |

ไม่ว่าเลือกทางไหน: **ต่ออายุโดเมนกับ Hostatom ทุกปี**

---

## A. NAS + Cloudflare Tunnel

เว็บรันเป็น container `engma-site` (nginx) บน NAS ที่ port `8091`
คนเข้าเว็บพิมพ์แค่ `engma.co.th` — Cloudflare Tunnel ส่งต่อเข้า NAS ให้เอง
ใช้ `cloudflared` ตัวเดียวกับโปรเจกต์ MAHA48-event (network `maha48-event_default`) แบบเดียวกับ wm-careers

**เตรียมไว้แล้ว**

- [x] `deploy/nas/docker-compose.yml` — container `engma-site`, port 8091 (ว่าง ไม่ชนกับ 80, 3000, 8080, 8088, 8090)
- [x] `deploy/nas/nginx.conf` — www → engma.co.th, หน้า 404, ตั้งค่า cache, ไม่เปิดไฟล์ซ่อน
- [x] `deploy/nas/publish.sh` — build แล้วอัปเดตไฟล์ใน `deploy/nas/site/` (รันไปแล้ว 1 รอบ ไฟล์พร้อม)
- [ ] ⚠️ **nginx.conf ยังไม่ได้ทดสอบ** (Docker Desktop บน Mac ไม่ได้เปิด) → ทดสอบที่ขั้น 3

**ขั้นตอนที่ต้องทำ**

1. [ ] **Cloudflare** → Add site → `engma.co.th` → Free plan → จด Name Server 2 ตัวที่ได้
2. [ ] **Hostatom** (หน้าลูกค้า) → โดเมน `engma.co.th` → เปลี่ยน Name Server จาก PARK1/PARK2 เป็น 2 ตัวของ Cloudflare → รอจน Cloudflare ขึ้น **Active** (.co.th อาจใช้หลายชั่วโมง)
3. [ ] **NAS → Container Manager** → สร้าง Project ใหม่จากโฟลเดอร์
   `/volume1/docker/เวปฝน/ตัวอย่าง ฝน/engma-thailand-site/deploy/nas`
   - โปรเจกต์ MAHA48-event ต้องรันอยู่ก่อน (ไม่งั้นหา network `maha48-event_default` ไม่เจอ)
   - ทดสอบในวงแลน: `http://192.168.1.115:8091` , `/design-1/` , `/design-2/`
4. [ ] **Cloudflare Zero Trust → Networks → Tunnels** → เลือก tunnel ของ MAHA48 → Public Hostname เพิ่ม:
   - `engma.co.th` → HTTP → `engma-site:80`
   - `www.engma.co.th` → HTTP → `engma-site:80`
5. [ ] **Cloudflare → SSL/TLS → Edge Certificates** → เปิด **Always Use HTTPS**
6. [ ] ทดสอบ: `https://engma.co.th` , `https://www.engma.co.th` (ต้องเด้งไปไม่มี www) , `/design-1/` , `/design-2/`

**อัปเดตเว็บครั้งต่อไป:** แก้โค้ด → `npm run publish:nas` → เว็บเปลี่ยนทันที ไม่ต้องรีสตาร์ต container
(ถ้า build พัง เว็บที่ออนไลน์อยู่ไม่โดนกระทบ)

**ถ้าต้องการอีเมล `@engma.co.th`:** NAS ทำให้ไม่ได้ → ใช้ Google Workspace / Zoho / อีเมล Hostatom แล้วตั้ง MX record ใน Cloudflare

---

## B. Hostatom Web Hosting

**เตรียมไว้แล้ว**

- [x] `deploy/hostatom/.htaccess` — บังคับ https, www → engma.co.th, หน้า 404, cache
- [x] `deploy/hostatom/build.sh` — build + แพ็ก zip
- [x] ไฟล์พร้อมอัป: `outputs/engma-hostatom.zip` (~6 MB)

**ขั้นตอนที่ต้องทำ**

1. [ ] ซื้อ Web Hosting (Linux) แพ็กเล็กสุด ผูกกับ `engma.co.th`
2. [ ] เปลี่ยน Name Server เป็นของโฮสติ้ง (ตามอีเมลยืนยัน — ถ้าบัญชีเดียวกัน Hostatom อาจเปลี่ยนให้เอง)
3. [ ] เปิด SSL ฟรี (Let's Encrypt) ในแผงควบคุม — **ต้องทำก่อนอัปไฟล์** เพราะ `.htaccess` บังคับ https
4. [ ] File Manager → `public_html` (DirectAdmin: `domains/engma.co.th/public_html`) → อัป zip → Extract → ลบ zip และ `index.html` เดิมของ Hostatom
5. [ ] ทดสอบแบบเดียวกับข้อ A.6

**อัปเดตเว็บครั้งต่อไป:** `npm run build:hostatom` → อัป `outputs/engma-hostatom.zip` ทับแบบเดิม

---

## หลังย้ายเสร็จ

- [ ] ปิด GitHub Pages (Settings → Pages) หรือลบ `.github/workflows/deploy-pages.yml`
- [ ] commit ไฟล์ทั้งหมดลง git
- [ ] ถ้าไม่ใช้ทางเลือกไหน ลบโฟลเดอร์ `deploy/` ของทางนั้นทิ้ง (ยกเว้น `deploy/hostatom/build.sh` ที่ `publish:nas` ใช้อยู่)

## คำสั่ง

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run build:hostatom` | build เป็น HTML ลง `out/` + แพ็ก `outputs/engma-hostatom.zip` |
| `npm run publish:nas` | build แล้วอัปเดตไฟล์ใน `deploy/nas/site/` (เว็บบน NAS เปลี่ยนทันที) |
| `npm run build:pages` | build สำหรับ GitHub Pages (ใช้ใน GitHub Actions) |

## ไฟล์ที่แก้/เพิ่ม (ยังไม่ commit)

- `next.config.ts` — รองรับ `STATIC_EXPORT=true` (นอกจาก `GITHUB_PAGES=true`)
- `package.json` — เพิ่ม `build:hostatom`, `publish:nas`
- `.gitignore` — เพิ่ม `/deploy/nas/site/`
- `deploy/hostatom/` — `.htaccess`, `build.sh`
- `deploy/nas/` — `docker-compose.yml`, `nginx.conf`, `publish.sh`
