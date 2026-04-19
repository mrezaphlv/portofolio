// ==========================================
// 1. ANIMASI SCROLL (REVEAL)
// ==========================================
function reveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const top = el.getBoundingClientRect().top;
    // Elemen akan muncul ketika jaraknya 100px dari bawah layar
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

// Jalankan fungsi reveal saat di-scroll
window.addEventListener("scroll", reveal);

// Panggil sekali saat halaman pertama kali dimuat agar elemen di posisi atas langsung muncul
reveal();


// ==========================================
// 2. FETCH DATA PORTFOLIO DINAMIS (JSON)
// ==========================================
async function loadPortfolio() {
  try {
    // Memanggil data dari file JSON (pastikan nama file sesuai: data-porto.json)
    const response = await fetch('data-porto.json');
    const data = await response.json();
    
    const container = document.getElementById('portfolio-container');
    if (!container) return; // Hentikan eksekusi jika id="portfolio-container" tidak ada di HTML

    let htmlContent = '';

    // Looping setiap data proyek dari JSON
    data.forEach(item => {
      // Looping untuk menyusun tech badges
      let badgesHtml = '';
      item.tech.forEach(tech => {
        badgesHtml += `<span class="badge ${tech.color}"><i class="${tech.icon}"></i> ${tech.name}</span>`;
      });

      // Template HTML untuk setiap card dengan pembungkus .img-container (kotak 1:1)
      htmlContent += `
        <div class="portfolio-card">
          <div class="img-container">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="card-body">
            <h3>${item.title}</h3>
            <p class="company-name">${item.company}</p>
            <div class="tech-badges">
              ${badgesHtml}
            </div>
          </div>
        </div>
      `;
    });

    // Masukkan susunan HTML yang sudah dibuat ke dalam container di index.html
    container.innerHTML = htmlContent;
    
  } catch (error) {
    console.error("Gagal memuat data portofolio:", error);
    // Tampilkan pesan error di layar jika gagal (misal karena CORS policy)
    const container = document.getElementById('portfolio-container');
    if (container) {
        container.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: red;">Gagal memuat data portofolio. Pastikan Anda menjalankan website ini melalui Local Server (XAMPP / Live Server).</p>';
    }
  }
}

// Jalankan fungsi loadPortfolio saat seluruh struktur HTML (DOM) selesai dimuat
document.addEventListener('DOMContentLoaded', loadPortfolio);