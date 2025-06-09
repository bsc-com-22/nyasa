const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        const closeBtn = document.querySelector('.close-btn');

        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add active class to the current page
        function setActivePage() {
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            
            // For desktop navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                if (link.getAttribute('href') === currentPage || 
                   (currentPage === "index.html" && link.getAttribute('href') === "#")) {
                    link.classList.add('active');
                }
            });
            
            // For mobile navigation
            document.querySelectorAll('.mobile-menu a').forEach(link => {
                if (link.getAttribute('href') === currentPage || 
                   (currentPage === "index.html" && link.getAttribute('href') === "#")) {
                    link.classList.add('active');
                }
            });
        }
        
        // Call the function when the page loads
        window.addEventListener('DOMContentLoaded', setActivePage);

        const counters = document.querySelectorAll('.number');
let hasCounted = false; // prevents re-triggering on scroll

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;

    const updateCounter = () => {
        const current = +counter.innerText;
        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target + '+';
        }
    };

    updateCounter();
}

// Trigger on hover
counters.forEach(counter => {
    counter.parentElement.addEventListener('mouseenter', () => {
        if (counter.innerText.includes('+')) return;
        animateCounter(counter);
    });
});

// Trigger on scroll into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
            counters.forEach(counter => animateCounter(counter));
            hasCounted = true;
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => observer.observe(stat));


    document.addEventListener('DOMContentLoaded', function() {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      const elements = document.querySelectorAll('.animate-on-scroll, .section-header, .feature-card, .portfolio-item, .stat, .service-card');
      elements.forEach(element => {
        observer.observe(element);
      });
    });

    // Initialize service prices and event listeners when the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize the service dropdown
        const serviceDropdown = document.getElementById("serviceDropdown");
        if (serviceDropdown) {
            serviceDropdown.addEventListener("change", updateSubservices);
            // Trigger initial update
            updateSubservices();
        }

        // Initialize the form reset button
        const resetBtn = document.getElementById("resetBtn");
        if (resetBtn) {
            resetBtn.addEventListener("click", resetForm);
        }

        // Initialize the form submission
        const quoteForm = document.getElementById("quoteForm");
        if (quoteForm) {
            quoteForm.addEventListener("submit", handleFormSubmit);
        }
    });

    const servicePrices = {
        brandDesign: {
            oneOptionLogo: { price: 50000, label: "Logo Design (1 Option)" },
            twoOptionsLogo: { price: 70000, label: "Logo Design (2 Options)" },
            threeOptionsLogo: { price: 90000, label: "Logo Design (3 Options)" },
            brandGuideline: { price: 15000, label: "Brand Guidelines" },
            colorPalette: { price: 10000, label: "Color Palette" },
            icons: { price: 15000, label: "Custom Icons" },
            letterHead: { price: 20000, label: "Letterhead Design" },
            typography: { price: 25000, label: "Typography Selection" }
        },
        marketingDesign: {
            printingFlyer: { price: 15000, label: "Flyer Design" },
            socialMediaDesign: { price: 15000, label: "Social Media Graphics" },
            corporatePrintingFlyer: { price: 25000, label: "Corporate Flyer Design" },
            corporateSocialMedia: { price: 20000, label: "Corporate Social Media Package" },
            posters: { price: 30000, label: "Poster Design" },
            corporatePosters: { price: 50000, label: "Corporate Poster Campaign" }
        },
        packagingDesign: {
            smePackaging: { price: 50000, label: "SME Packaging Design" },
            corporatePackaging: { price: 150000, label: "Corporate Packaging Design" }
        },
        webDesign: {
            landingPage: { price: 70000, label: "Landing Page Design" },
            fullWebsite: { price: 150000, label: "Full Website Design" },
            ecommerce: { price: 250000, label: "E-commerce Website Design" }
        },
        uiuxDesign: {
            wireframes: { price: 40000, label: "Wireframes Design" },
            mobileAppDesign: { price: 120000, label: "Mobile App UI/UX Design" },
            webAppDesign: { price: 130000, label: "Web App UI/UX Design" },
            usabilityTesting: { price: 30000, label: "Usability Testing & Feedback" },
            designSystem: { price: 60000, label: "Design System Creation" },
            prototype: { price: 50000, label: "High-fidelity Prototype" }
        }
    };
    
    function updateSubservices() {
        const serviceDropdown = document.getElementById("serviceDropdown");
        const selectedService = serviceDropdown.value;
        const subserviceContainer = document.getElementById("subserviceContainer");
        
        console.log("Selected service:", selectedService);
        console.log("Service prices:", servicePrices[selectedService]);
    
        subserviceContainer.innerHTML = "";
        if (!selectedService || !servicePrices[selectedService]) {
            console.log("No service selected or service not found in prices");
            subserviceContainer.classList.add("hidden");
            updateTotalCost(0);
            return;
        }
    
        subserviceContainer.classList.remove("hidden");
    
        const subservices = servicePrices[selectedService];
        console.log("Subservices to display:", subservices);
        
        for (const key in subservices) {
            const { label, price } = subservices[key];
            console.log("Creating checkbox for:", label, "with price:", price);
    
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = price;
            checkbox.name = key;
            checkbox.classList.add("subservice-checkbox");
    
            const labelEl = document.createElement("label");
            labelEl.innerText = `${label} (MWK ${price.toLocaleString()})`;
    
            const wrapper = document.createElement("div");
            wrapper.appendChild(checkbox);
            wrapper.appendChild(labelEl);
    
            subserviceContainer.appendChild(wrapper);
        }
    
        // Add listener to checkboxes to update cost dynamically
        document.querySelectorAll(".subservice-checkbox").forEach(cb => {
            cb.addEventListener("change", calculateTotal);
        });
    
        calculateTotal(); // Recalculate total when service changes
    }
    
    function calculateTotal() {
        const checkboxes = document.querySelectorAll(".subservice-checkbox:checked");
        let total = 0;
        checkboxes.forEach(cb => {
            total += parseInt(cb.value);
        });
        updateTotalCost(total);
    }
    
    function updateTotalCost(amount) {
        const formatted = `MWK ${amount.toLocaleString()}`;
        document.getElementById("totalCost").innerText = formatted;
        document.querySelector(".total-row").innerText = formatted;
    }
    
    function resetForm() {
        document.getElementById("quoteForm").reset();
        document.getElementById("subserviceContainer").innerHTML = "";
        document.getElementById("subserviceContainer").classList.add("hidden");
        updateTotalCost(0);
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
    
        const name = document.getElementById("name").value;
        const company = document.getElementById("company").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const projectDetails = document.getElementById("projectDetails").value;
        const service = document.getElementById("serviceDropdown").value;
        const subservices = servicePrices[service];
    
        const selectedSubservices = Array.from(document.querySelectorAll(".subservice-checkbox:checked")).map(cb => {
            const key = cb.name;
            return subservices[key];
        });
    
        let total = selectedSubservices.reduce((sum, item) => sum + item.price, 0);
    
        // Generate PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add logo to PDF
        const logo = new Image();
        logo.src = 'img/logo.png';
        
        // Wait for logo to load before generating PDF
        logo.onload = async function() {
            // Add logo to the top of the PDF
            doc.addImage(logo, 'PNG', 10, 10, 40, 20);
            
            // Add company name and contact info
            doc.setFontSize(24);
            doc.setTextColor(3, 5, 91); // Dark blue color
            doc.text("Nyasa Creatives", 60, 20);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("UNIMA, Zomba, Malawi", 60, 27);
            doc.text("Phone: +265 993 778 615", 60, 33);
            doc.text("Email: nyasacreatives@gmail.com", 60, 39);
            
            // Add a line separator
            doc.setDrawColor(200, 200, 200);
            doc.line(10, 45, 200, 45);
            
            // Add quotation details
            doc.setFontSize(18);
            doc.setTextColor(3, 5, 91);
            doc.text("Quotation", 10, 55);
            
            // Add client information
            doc.setFontSize(12);
            doc.setTextColor(50, 50, 50);
            doc.text(`Name: ${name}`, 10, 65);
            doc.text(`Company: ${company || 'N/A'}`, 10, 72);
            doc.text(`Email: ${email}`, 10, 79);
            doc.text(`Phone: ${phone}`, 10, 86);
            doc.text(`Service Category: ${service}`, 10, 93);
            
            // Add selected services
            doc.text("Selected Services:", 10, 103);
            let yPos = 113;
            selectedSubservices.forEach((item, index) => {
                doc.text(`- ${item.label}: MWK ${item.price.toLocaleString()}`, 15, yPos);
                yPos += 7;
            });
            
            // Add total
            doc.setFontSize(14);
            doc.setTextColor(3, 5, 91);
            doc.text(`Total: MWK ${total.toLocaleString()}`, 10, yPos + 10);
            
            // Add project details if any
            if (projectDetails) {
                doc.setFontSize(12);
                doc.setTextColor(50, 50, 50);
                doc.text("Project Details:", 10, yPos + 25);
                const splitDetails = doc.splitTextToSize(projectDetails, 180);
                doc.text(splitDetails, 10, yPos + 35);
            }
            
            // Add footer
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("Thank you for choosing Nyasa Creatives!", 10, 280);
            doc.text("This quotation is valid for 30 days from the date of issue.", 10, 287);
            
            // Save the PDF
            doc.save('Nyasa_Creatives_Quote.pdf');
            
            // Show success message
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("successMessage").textContent = "Quote has been generated and downloaded!";
            
            // Optional: Send email with PDF
            const pdfBlob = doc.output("blob");
            const formData = new FormData();
            formData.append("pdf", pdfBlob, "quote.pdf");
            formData.append("email", email);
            
            try {
                const res = await fetch("https://your-backend-url.com/send-quote", {
                    method: "POST",
                    body: formData
                });
                
                if (res.ok) {
                    document.getElementById("successMessage").textContent = "Quote has been generated, downloaded, and sent to your email!";
                }
            } catch (err) {
                console.error(err);
                // Don't show error to user since PDF was already downloaded
            }
        };
        
        // Handle logo loading error
        logo.onerror = function() {
            alert("Error loading logo. Generating PDF without logo...");
            // Generate PDF without logo
            generatePDFWithoutLogo();
        };
    }
    
    function generatePDFWithoutLogo() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add company name and contact info
        doc.setFontSize(24);
        doc.setTextColor(3, 5, 91);
        doc.text("Nyasa Creatives", 10, 20);
        
        // Rest of the PDF generation code...
        // (Same as above but starting from y=30 instead of y=55)
    }
