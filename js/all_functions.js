function setupLanguageSwitcher() {
    const defaultLanguage = "en"; // Set the default language
    let langChanged = false;
    let language = localStorage.getItem("selectedLanguage") || defaultLanguage;
    let translations; // Define translations object

    const languageElements = document.querySelectorAll("[data-translate]");
    const languageSwitcher = document.getElementById("translate-icon");
    const dropdownItems = languageSwitcher.querySelectorAll(".dropdown-item");

    const alternativeFilePath = "../lng.json"; // Define the alternative file path

    function updateContent(selectedLang) {
        return new Promise((resolve, reject) => {
            fetch("lng.json")
                .then((response) => {
                    if (!response.ok) {
                        // If the response is not OK, try fetching the alternative file
                        return fetch(alternativeFilePath);
                    }
                    return response;
                })
                .then((response) => response.json())
                .then((data) => {
                    translations = data; // Store translations object

                    console.log("Translations:", translations);

                    languageElements.forEach((element) => {
                        const elementTag = element.getAttribute("data-translate");
                        if (translations[selectedLang][elementTag]) {
                            element.textContent = translations[selectedLang][elementTag];
                        }
                    });

                    langChanged = true;
                    language = selectedLang;
                    localStorage.setItem("selectedLanguage", selectedLang);

                    resolve(); // Resolve the promise
                })
                .catch((error) => {
                    console.error("Error loading translations:", error);
                    reject(error); // Reject the promise
                });
        });
    }

    // Update content with the stored language or default language translations
    updateContent(language)
        .then(() => {
            const availableLanguages = Object.keys(translations); // Use translations object

            dropdownItems.forEach((item) => {
                const selectedLang = item.getAttribute("data-lang");
                if (availableLanguages.includes(selectedLang)) {
                    item.addEventListener("click", () => {
                        if (!langChanged || language !== selectedLang) {
                            console.log("Language switcher clicked");
                            console.log("Selected language:", selectedLang);
                            lang = selectedLang;
                            updateContent(selectedLang)
                                .then(() => {
                                    // Update content here if needed after the language change
                                })
                                .catch((error) =>
                                    console.error("Error updating content:", error)
                                );
                        }
                    });
                }
            });
        })
        .catch((error) =>
            console.error("Error setting up language switcher:", error)
        );

}

function cookieFunction() {
    const cookieModal = document.querySelector(".cookie-modal");
    const acceptCookiesButton = document.getElementById("accept-cookies");
    const declineCookiesButton = document.getElementById("decline-cookies");

    // Initially set the modal outside of the viewport
    gsap.set(cookieModal, {
        y: "100%",
    });

    // Show the cookie modal with a reveal animation
    gsap.to(cookieModal, {
        duration: 0.5,
        y: 0,
        onComplete: function() {
            cookieModal.style.display = "block";
        },
    });

    acceptCookiesButton.addEventListener("click", function() {
        localStorage.setItem("cookieAccepted", "true");
        hideModal();
    });

    declineCookiesButton.addEventListener("click", function() {
        localStorage.setItem("cookieAccepted", "false");
        hideModal();
    });

    function hideModal() {
        gsap.to(cookieModal, {
            duration: 0.5,
            opacity: 0,
            y: "100%",
            onComplete: function() {
                cookieModal.style.display = "none";
            },
        });
    }
}

// Function to remove the cookiesAccepted item from localStorage
function clearCookiesAccepted() {
    localStorage.removeItem("cookiesAccepted");
}