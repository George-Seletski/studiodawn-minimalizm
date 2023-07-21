document.addEventListener("DOMContentLoaded", function () {
  // r GSAP animation for the preloader content (loading animation)
 gsapromTo(
   ".snowake",
  {
    y 10,
   opacity: 0,
 },
    {
     y: 0
     acity: 1,
      duration: 1.5,
    ese: "Sine.inOut",
  }
;

  gsarom(".rounded-text", {
    scale: 0,
    duration: 0,
   ea: "back.out(1)",
 });

// Simulae content loading time (remove this in your actual implementation)
  setTimeout(function () {
 const preloader = document.querySelector(".preloader-container");
 const mainContent = document.getElementById("main-content");

   // Use GSAto smoothly fade out the preloader
   gsap.to(proader, {
    opacity: 0,
    duration: 0.5
   onComplete: () => {
     // Hide the preloader after the fade-out animation is complete
        preloaderyle.display = "none";
       // Show thmain content
       mainContent.ste.display = "block";
      // Use GSAP to moothly fade in the main content
      gsap.from(minContent, {
       opacity: 0,
       duration: 0.5,
     });
   },
    });
  }, 2000); // Change the duration to match your actual content loading time
});
