====================================================
 PrintHub Internet Café — Online Printing Website
====================================================

HOW TO RUN
----------
1. Unzip this folder anywhere on your computer.
2. Double-click "index.html" — it opens in your browser.
   No server, no installation, no internet required
   (except WhatsApp/map links and PDF auto page counting,
   which load from public CDNs).

PAGES
-----
- index.html     Homepage (prices, hours, address, intro)
- order.html     Online printing order system (upload, options,
                 live price estimate, submit)
- confirm.html   Order confirmation (opens automatically)
- track.html     Track order status (order # + phone number)
- services.html  Services & prices (editable in admin)
- contact.html   Contact info, map, WhatsApp contact form
- admin.html     Admin dashboard (login required)
- css/style.css  Stylesheet
- js/site.js     Shared logic (business info, WhatsApp button)

ADMIN DASHBOARD
---------------
URL:  admin.html
Default password: admin123  (change it under Security tab)

What you can do:
  - See all orders with a red "New" badge for incoming orders
  - Download customers' uploaded documents
  - Update order status: Order Received > Processing >
    Ready for Collection > Collected
  - Mark orders collected / delete old orders
  - Edit B&W and colour printing prices (order page updates live)
  - Edit services & prices shown on the Services page
  - Edit business name, hours, address, WhatsApp number, email, map
  - Change the admin password

HOW DATA IS STORED (IMPORTANT)
----------------------------
This version runs entirely in the browser with no server:

  - Orders, prices, services & business info -> browser localStorage
  - Uploaded document files -> browser IndexedDB

This means:
  * Everything works instantly with zero setup — great for testing
    and demonstrating the full workflow.
  * Data is per-device/per-browser: orders placed on your phone
    won't appear on the shop computer's admin dashboard, and browser
    storage can be cleared.

TO GO LIVE FOR REAL CUSTOMERS
-----------------------------
Move the same pages onto a small backend so orders from any
device land in one central database. Recommended stack (as per
your project brief):
  - Backend: Python Flask (or Node.js/Express)
  - Database: PostgreSQL or MySQL
  - File storage: server disk or S3-style object storage
  - Auth: hashed passwords (e.g. bcrypt/Werkzeug) + sessions

The JavaScript on these pages already mirrors the exact API calls
you would need (save order / list orders / update status /
download file), so the migration is mostly swapping localStorage
and IndexedDB calls for fetch() calls to your Flask routes.

WHATSAPP & MAP
--------------
Update your real WhatsApp number and address in
admin.html -> Business Info tab. The floating WhatsApp button,
contact buttons and order-follow-up messages update automatically.
