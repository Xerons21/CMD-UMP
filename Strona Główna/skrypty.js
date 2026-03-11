
// ========================================
// 1️⃣ Naprawa menu CMS
// ========================================
(function menuFix() {
  function fixMenu() {
    document.querySelectorAll('.s-nav--white--categories--category')
      .forEach(li => {
        li.style.setProperty('margin-left', '20px', 'important');
        li.style.setProperty('display', 'inline-block', 'important');
        li.style.setProperty('vertical-align', 'middle', 'important');
      });
  }

  document.addEventListener("DOMContentLoaded", fixMenu);

  // Nasłuch na zmiany DOM, jeśli CMS przebuduje menu później
  const observer = new MutationObserver(fixMenu);
  observer.observe(document.body, { childList: true, subtree: true });
})();


// ========================================
// 2️⃣ Obsługa iframe (postMessage / dynamiczna wysokość)
// ========================================
(function iframeListener() {
  window.addEventListener("message", function(event) {
    // Sprawdź, czy wiadomość pochodzi z zaufanego źródła
    if (event.origin !== "https://xerons21.github.io") return;

    if (event.data.type === "iframeHeight") {
      const iframe = document.getElementById("myIframe");
      if (iframe) {
        iframe.style.height = event.data.height + "px";
      } else {
        console.error('Iframe z id "myIframe" nie został znaleziony.');
      }
    }
  });
})();


// ========================================
// 2️⃣ Logo (dynamiczne dodanie + responsywność)
// ========================================
(function addLogo() {
  document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector('.s-nav--blue.is-department');

    if (section) {
      section.style.position = "relative"; // potrzebne do absolutnego pozycjonowania logo

      // 1. Stwórz logo i dodaj do sekcji
      const logo = document.createElement("img");
      logo.src = "https://cdn.jsdelivr.net/gh/xerons21/TWOJE_REPO/logo.png"; // wstaw link do logo
      logo.alt = "Logo";
      logo.className = "responsive-logo";
      section.appendChild(logo);

      // 2. Dodaj style (logo + media queries)
      const style = document.createElement("style");
      style.textContent = `
        .responsive-logo {
          position: absolute;
          right: 60px;
          top: 50%;
          transform: translateY(-50%);
          width: 250px;
          height: auto;
          z-index: 10;
          max-width: 30%;
          pointer-events: none;
        }

        @media (max-width: 1450px) {
          .responsive-logo {
            width: 200px;
            right: 140px;
          }
        }

        @media (max-width: 1448px) {
          .responsive-logo {
            width: 180px;
            right: 20px;
          }
        }

        @media (max-width: 1299.9px) {
          .responsive-logo {
            width: 200px;
            right: 140px;
          }
        }

        @media (max-width: 1298.9px) and (min-width: 1023px) {
          .responsive-logo {
            display: none;
          }
        }

        @media (max-width: 1022.9px) {
          .responsive-logo {
            width: 180px;
            right: 45px;
            top: 170px;
          }
        }

        @media (max-width: 792px) {
          .responsive-logo {
            width: 180px;
            right: 30px;
            top: 200px;
          }
        }

        @media (max-width: 479.9px) {
          .responsive-logo {
            display: none;
          }
        }
      `;
      document.head.appendChild(style);
    }
  });
})();