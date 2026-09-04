/* =========================================
   OPEN INVITATION
========================================= */

const openButton =
    document.getElementById("openInvitation");

const cover =
    document.getElementById("cover");

const mainContent =
    document.getElementById("mainContent");

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


openButton.addEventListener("click", () => {

    cover.style.display = "none";

    mainContent.classList.remove("hidden");

    document.body.style.overflow = "auto";

    music.play().catch(() => {
        console.log("Autoplay diblokir browser.");
    });

});


/* =========================================
   MUSIC
========================================= */

let musicPlaying = false;

musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicButton.innerHTML = "♫";

        musicPlaying = true;

    } else {

        music.pause();

        musicButton.innerHTML = "♪";

        musicPlaying = false;

    }

});


/* =========================================
   COUNTDOWN
========================================= */

// Format:
// Tahun-Bulan-Tanggal Jam:Menit:Detik
//
// Desember 19 2026
// pukul 09:00 WIB

const weddingDate =
    new Date("2026-12-19T08:00:00+06:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("active");

    });

}


/* =========================================
   COPY BANK ACCOUNT
========================================= */

function copyAccount(button) {

    const card = button.closest(".bank-card");

    const accountElement =
        card.querySelector(".account-number");

    const messageElement =
        card.querySelector(".copy-message");

    const account =
        accountElement.innerText
            .replace(/\s+/g, "")
            .trim();

    navigator.clipboard.writeText(account)
        .then(() => {

            messageElement.textContent =
                "Nomor rekening berhasil disalin.";

            setTimeout(() => {

                messageElement.textContent = "";

            }, 2500);

        })
        .catch(() => {

            messageElement.textContent =
                "Gagal menyalin nomor rekening.";

        });
}

/* =========================================
   RSVP
========================================= */

const rsvpForm =
    document.getElementById("rsvpForm");


rsvpForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "guestName"
        ).value;

    const attendance =
        document.getElementById(
            "attendance"
        ).value;

    const count =
        document.getElementById(
            "guestCount"
        ).value;


    const message =
        `Halo Andi & Siti,

Saya ${name}
Konfirmasi: ${attendance}
Jumlah tamu: ${count} orang.

Terima kasih.`;


    const whatsappNumber =
        "6281234567890";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );


    document.getElementById(
        "rsvpMessage"
    ).innerText =
        "Terima kasih atas konfirmasinya ❤️";

});

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. KONFIGURASI BACKEND (GOOGLE APPS SCRIPT)
    // ==========================================
    // Ganti URL di bawah ini dengan URL Web App dari Google Apps Script kamu
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzWted6EXS85swmnQpSgd9xjuV8xdpeDlLFFtt2Fk8BNyhtxJddEcPf5dThc3O287uLw/exec';


    // ==========================================
    // 2. PENANGANAN FORM RSVP
    // ==========================================
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpMessage = document.getElementById('rsvpMessage');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            rsvpMessage.textContent = 'Mengirim konfirmasi...';

            const payload = {
                name: document.getElementById('guestName').value,
                attendance: document.getElementById('attendance').value,
                guestCount: document.getElementById('guestCount').value
            };

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(() => {
                rsvpMessage.textContent = 'Terima kasih, konfirmasi Anda berhasil dikirim!';
                rsvpForm.reset();
            })
            .catch(error => {
                rsvpMessage.textContent = 'Maaf, terjadi kesalahan. Silakan coba lagi.';
                console.error('Error RSVP:', error);
            });
        });
    }


    // ==========================================
    // 3. PENANGANAN FORM UCAPAN & DOA (WISHES)
    // ==========================================
    const wishForm = document.getElementById('wishForm');
    const wishList = document.getElementById('wishList');

    if (wishForm) {
        wishForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = document.getElementById('wishName').value;
            const textInput = document.getElementById('wishText').value;

            // Send data to Google Sheets (Backend)
            const payload = {
                action: 'addWish',
                name: nameInput,
                text: textInput
            };

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .catch(error => console.error('Error Wishes:', error));

            // Render ucapan baru ke halaman web (Frontend)
            if (wishList) {
                const wish = document.createElement('div');
                wish.className = 'wish-item';
                wish.innerHTML = `
                    <strong>${escapeHTML(nameInput)}</strong>
                    <p>${escapeHTML(textInput)}</p>
                `;
                wishList.prepend(wish);
            }

            wishForm.reset();
        });
    }


    // ==========================================
    // 4. HELPER AMAN UNTUK PENCEGAHAN XSS
    // ==========================================
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

});


/* =========================================
   SLOW SCROLL BUTTON
========================================= */

const scrollButton =
    document.getElementById("scrollButton");


if (scrollButton) {

    const scrollIcon =
        scrollButton.querySelector(".scroll-icon");


    /* =====================================
       SHOW / HIDE BUTTON
    ===================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            scrollButton.classList.add("show");

        } else {

            scrollButton.classList.remove("show");

        }

    });


    /* =====================================
       SLOW SMOOTH SCROLL
    ===================================== */

    function slowScrollTo(targetY, duration = 2000) {

        const startY =
            window.pageYOffset;

        const distance =
            targetY - startY;

        let startTime = null;


        function animation(currentTime) {

            if (startTime === null) {
                startTime = currentTime;
            }


            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
               Ease In Out

               Membuat gerakan:
               pelan → cepat → pelan
            */

            const ease =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 -
                      Math.pow(
                          -2 * progress + 2,
                          2
                      ) / 2;


            window.scrollTo(
                0,
                startY +
                distance * ease
            );


            if (progress < 1) {

                requestAnimationFrame(
                    animation
                );

            }

        }


        requestAnimationFrame(
            animation
        );

    }


    /* =====================================
       BUTTON CLICK
    ===================================== */

    scrollButton.addEventListener(
        "click",
        () => {

            const currentPosition =
                window.scrollY;


            /*
               Jika masih dekat bagian atas,
               menuju EVENT.
            */

            if (currentPosition < 500) {

                const eventSection =
                    document.getElementById(
                        "event"
                    );


                if (eventSection) {

                    const targetPosition =
                        eventSection.getBoundingClientRect().top +
                        window.pageYOffset;


                    slowScrollTo(
                        targetPosition,
                        2200
                    );

                } else {

                    slowScrollTo(
                        window.innerHeight,
                        2200
                    );

                }

            }

            /*
               Jika sudah turun,
               kembali ke atas.
            */

            else {

                slowScrollTo(
                    0,
                    2200
                );

            }

        }
    );


    /* =====================================
       UPDATE ICON
    ===================================== */

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY < 500) {

                scrollIcon.innerHTML = "⌄";

                scrollButton.setAttribute(
                    "aria-label",
                    "Scroll ke bawah"
                );

            } else {

                scrollIcon.innerHTML = "⌃";

                scrollButton.setAttribute(
                    "aria-label",
                    "Kembali ke atas"
                );

            }

        }
    );

}

/* =========================================
   BACKGROUND PARALLAX
========================================= */

const parallaxSections =
    document.querySelectorAll(".parallax-section");

let parallaxTicking = false;

function updateParallax() {

    const scrollY = window.scrollY;

    parallaxSections.forEach(section => {

        const background =
            section.querySelector(".parallax-bg");

        if (!background) return;

        const rect =
            section.getBoundingClientRect();

        /*
         * Hanya menjalankan parallax
         * ketika section berada di sekitar viewport.
         */
        if (
            rect.bottom < -100 ||
            rect.top > window.innerHeight + 100
        ) {
            return;
        }

        /*
         * Jarak section dari viewport.
         *
         * Faktor 0.18 membuat gerakan
         * background lebih lambat daripada
         * gerakan halaman.
         */
        const movement =
            (window.innerHeight / 2 - rect.top) * 0.18;

        background.style.transform =
            `translate3d(0, ${movement}px, 0)`;
    });

    parallaxTicking = false;
}

function requestParallaxUpdate() {

    if (!parallaxTicking) {

        window.requestAnimationFrame(
            updateParallax
        );

        parallaxTicking = true;
    }
}

window.addEventListener(
    "scroll",
    requestParallaxUpdate,
    { passive: true }
);

window.addEventListener(
    "resize",
    requestParallaxUpdate
);

/* Jalankan pertama kali */
updateParallax();
