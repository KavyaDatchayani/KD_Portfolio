document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("navbar");
    const menuBar = document.getElementById("menubar");
    const navLinks = document.querySelector(".navlinks");
    const navlinka = document.querySelectorAll(".navlinks a");

    const line1 = document.getElementById("lineone");
    const line2 = document.getElementById("linetwo");
    const line3 = document.getElementById("linethree");

    menuBar.addEventListener("click", function () {
        navLinks.classList.toggle("show");

        line1.classList.toggle("slidedown");
        line1.classList.toggle("change");
        line2.classList.toggle("slideup");
        line2.classList.toggle("change");
        line3.classList.toggle("disappear");
    });

    navlinka.forEach(links => {
        links.addEventListener("click", function () {
            navLinks.classList.remove("show");
            line1.classList.toggle("slidedown");
            line1.classList.toggle("change");
            line2.classList.toggle("slideup");
            line2.classList.toggle("change");
            line3.classList.toggle("disappear");
        });
    });

    var oldScroll = window.scrollY;

    window.addEventListener("scroll", function () {
        var cscroll = window.scrollY;
        if (oldScroll > cscroll) {
            nav.style.top = "0";
        } else {
            nav.style.top = "-100%";
        }
        oldScroll = cscroll;
    });


    document.getElementById("contactForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {
            const response = await fetch("/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, message })
            });

            const result = await response.json();


            document.getElementById("popupMessage").innerHTML = `${result.message} <i class="fa-regular fa-circle-check"></i>`;


            document.getElementById("popup").classList.add("show");


            document.getElementById("contactForm").reset();

        } catch (error) {
            console.error("Error:", error);
        }
    });


    document.getElementById("closeBtn").addEventListener("click", function () {
        document.getElementById("popup").classList.remove("show");
    });



    // active nav link

    const section = document.querySelectorAll('section');


    function toggleactiveclass() {
        let scrollYmoment = window.scrollY;

        section.forEach((section) => {
            const sectionTop = section.offsetTop - 50;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollYmoment >= sectionTop && scrollYmoment < sectionTop + sectionHeight) {
                navlinka.forEach((link) => {
                    link.classList.remove("active");
                });
                document.querySelector(`.navlinks a[href="#${sectionId}"]`).classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", toggleactiveclass);





});
