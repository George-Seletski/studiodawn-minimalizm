function setupLanguageSwitcher() {
    const defaultLanguage = "en"; // Set the default language
    let langChanged = false;
    let language = '';

    const languageElements = document.querySelectorAll("[data-translate]");
    const languageSwitcher = document.getElementById("translate-icon");
    const dropdownItems = languageSwitcher.querySelectorAll(".dropdown-item");

    const alternativeFilePath = "fallback_lng.json"; // Define the alternative file path

    fetch("lng.json")
        .then((response) => {
            if (!response.ok) {
                // If the response is not OK, try fetching the alternative file
                return fetch('../lng.json');
            }
            return response;
        })
        .then((response) => response.json())
        .then((translations) => {
            console.log("Translations:", translations);

            // Update content with default language translations
            languageElements.forEach((element) => {
                const elementTag = element.getAttribute("data-translate");
                if (translations[defaultLanguage][elementTag]) {
                    element.textContent = translations[defaultLanguage][elementTag];
                }
            });

            const availableLanguages = Object.keys(translations);

            dropdownItems.forEach((item) => {
                const selectedLang = item.getAttribute("data-lang");
                if (availableLanguages.includes(selectedLang)) {
                    item.addEventListener("click", () => {
                        langChanged = true;
                        language = selectedLang;
                        console.log("Language switcher clicked");
                        console.log("Selected language:", selectedLang);

                        languageElements.forEach((element) => {
                            const elementTag = element.getAttribute("data-translate");
                            if (translations[selectedLang][elementTag]) {
                                element.textContent = translations[selectedLang][elementTag];
                            }
                        });
                    });
                }
            });
        })
        .catch((error) => console.error("Error loading translations:", error));
}

function cookieFunction() {
    const cookieLabel = document.getElementById("cookie-label");
    const cookieCloseButton = document.getElementById("cookie-close");

    // Check if the user has already accepted the cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    setTimeout(function() {
        cookieLabel.style.display = "block";
    }, 6000);

    if (!cookiesAccepted) {
        // Show the cookie label
        cookieLabel.style.display = "block";
    }

    // Event listener for the "Got it" button click
    cookieCloseButton.addEventListener("click", function() {
        // Hide the cookie label
        cookieLabel.style.display = "none";

        // Store the information that the user has accepted the cookies
        localStorage.setItem("cookiesAccepted", "true");


    });
}