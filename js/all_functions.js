function setupLanguageSwitcher() {
    // Load translations from an external JSON file
    fetch("lng.json")
        .then((response) => response.json())
        .then((translations) => {
            console.log("Translations:", translations);
            const defaultLanguage = "en"; // Set the default language

            // Update content with default language translations
            const languageElements = document.querySelectorAll("[data-translate]");
            languageElements.forEach((element) => {
                const elementTag = element.getAttribute("data-translate");
                if (translations[defaultLanguage][elementTag]) {
                    element.textContent = translations[defaultLanguage][elementTag];
                }
            });

            // Extract available language tags from the translations object
            const availableLanguages = Object.keys(translations);

            const languageSwitcher = document.getElementById("translate-icon");
            const dropdownItems = languageSwitcher.querySelectorAll(".dropdown-item");

            // Create event listeners for each language
            dropdownItems.forEach((item) => {
                const selectedLang = item.getAttribute("data-lang");
                if (availableLanguages.includes(selectedLang)) {
                    item.addEventListener("click", () => {
                        console.log("Language switcher clicked");
                        console.log("Selected language:", selectedLang);

                        // Update other elements with language tags
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

        // Show the cookie label again after a time period (e.g., 1 day)
        const timePeriodInMilliseconds = 24 * 60 * 60 * 1000; // 1 day
        setTimeout(function() {
            cookieLabel.style.display = "block";
        }, timePeriodInMilliseconds);
    });
}