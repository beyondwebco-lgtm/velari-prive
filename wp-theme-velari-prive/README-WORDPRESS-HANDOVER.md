# VELARI PRIVÉ — WordPress Theme Handover & Deployment Guide

**Agency:** Beyond Webco  
**Client:** VELARI PRIVÉ  
**Hero Product:** ANAGÈNESE — The Regenerating Elixir  
**Production Host:** Hostinger WordPress Managed Hosting  
**Primary Domain:** `https://velariprive.au/`  
**Connected Scientific Partner:** `https://36ausbiotech.com/`  

---

## 1. Overview of the Architecture
This theme (`wp-theme-velari-prive`) was custom-engineered to meet VELARI PRIVÉ's strict ultra-luxury standards without page builder bloat (Elementor/Divi). It delivers:
- **Zero Plugin Dependencies:** Fast, lightweight, pure semantic HTML, vanilla CSS tokens, and restrained vanilla JavaScript.
- **Obsidian & Silver Aesthetic:** Strict black glass and brushed silver metallurgy palette. Zero gold clichés.
- **Full Phase 1 Capabilities:** 11-section homepage product reveal, The House editorial, The Ritual guide, Journal CPT, Founding Destinations EOI system, Private Discovery concierge, and contextual cross-domain bridge to `36ausbiotech.com`.

---

## 2. Installation on Hostinger WordPress

### Method A: Upload via WordPress Admin
1. Compress the `wp-theme-velari-prive` folder into a `.zip` archive named `wp-theme-velari-prive.zip`.
2. In your WordPress Admin dashboard (`/wp-admin`), navigate to **Appearance > Themes > Add New > Upload Theme**.
3. Choose `wp-theme-velari-prive.zip` and click **Install Now**.
4. Click **Activate**.

### Method B: Upload via Hostinger File Manager or SFTP
1. Access Hostinger hPanel > **File Manager**.
2. Navigate to `public_html/wp-content/themes/`.
3. Upload and extract the `wp-theme-velari-prive` folder.
4. Log into `/wp-admin` > **Appearance > Themes**, find **VELARI PRIVÉ**, and click **Activate**.

---

## 3. Initial Page Setup in WordPress

Create the following 5 core pages in **Pages > Add New**:
1. **Home** &rarr; Select Template: **Default Template** (WordPress automatically serves `front-page.php`).
2. **The House** (Slug: `the-house`) &rarr; Select Template: **The House** (`page-the-house.php`).
3. **The Ritual** (Slug: `the-ritual`) &rarr; Select Template: **The Ritual** (`page-the-ritual.php`).
4. **Journal** (Slug: `journal`) &rarr; Select Template: **Journal** (`page-journal.php`).
5. **Professional** (Slug: `professional`) &rarr; Select Template: **Professional Destinations** (`page-professional.php`).
6. **Private Discovery** (Slug: `private-discovery`) &rarr; Select Template: **Private Discovery** (`page-private-discovery.php`).

Navigate to **Settings > Reading**:
- Select **A static page**.
- Homepage: choose **Home**.
- Posts page: choose **Journal**.
- Click **Save Changes**.

---

## 4. Navigation Menu Configuration
1. Go to **Appearance > Menus**.
2. Create a menu titled **Primary Luxury Menu** and assign it to the **Primary Navigation** theme location.
3. Add links:
   - ANAGÈNESE (`/#anagenese`)
   - THE HOUSE (`/the-house/`)
   - THE RITUAL (`/the-ritual/`)
   - JOURNAL (`/journal/`)
   - PROFESSIONAL (`/professional/`)
   - THE SCIENCE (`https://36ausbiotech.com/` with class `nav-link-science`)

---

## 5. Cross-Domain Measurement & GA4 Setup
To configure measurement between `velariprive.au` and `36ausbiotech.com`:
1. In Google Analytics 4, go to **Admin > Data Streams > Web Stream Details**.
2. Under **Configure tag settings > Configure your domains**, add:
   - `velariprive.au`
   - `36ausbiotech.com`
3. Match condition: `contains`.
4. This ensures cross-domain linker parameters (`_gl`) preserve user attribution across discovery on the luxury flagship and evidence research on 36AUS BIOTECH.

---

## 6. Maintenance & Client Editing Workflow
- **Adding Journal Articles:** Go to **Journal > Add New Folio** or standard **Posts > Add New**. Enter the title, editorial content, and upload a Featured Image. It will automatically populate the publication grid in real-time.
- **Handling EOI Submissions:** Submissions from the Founding Destinations form can be routed to `director@velariprive.au` via standard WP Mail or SMTP plugin (e.g. WP Mail SMTP connected to Hostinger Titan Mail).
- **Updating Assets:** Product flacon photographs and media are located in `wp-content/themes/wp-theme-velari-prive/assets/images/`.
