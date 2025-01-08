document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            welcome: "Welcome to CV Builder",
            skills: "Skills",
            personalSkills: "Personal Skills",
            contactDetails: "Contact Details",
            phone: "Phone",
            mail: "Mail",
            address: "Address",
            education: "Education",
            workExperience: "Work Experience",
            interests: "Interests",
            robotic: "Robotic",
            drawing: "Drawing",
            programming: "Programming",
            traveling: "Traveling",
            watchingMovies: "Watching Movies"
        },
        fr: {
            welcome: "Bienvenue dans le Créateur de CV",
            skills: "Compétences",
            personalSkills: "Compétences Personnelles",
            contactDetails: "Coordonnées",
            phone: "Téléphone",
            mail: "Courriel",
            address: "Adresse",
            education: "Éducation",
            workExperience: "Expérience Professionnelle",
            interests: "Intérêts",
            robotic: "Robotique",
            drawing: "Dessin",
            programming: "Programmation",
            traveling: "Voyage",
            watchingMovies: "Regarder des films"
        },
        es: {
            welcome: "Bienvenido a Constructor de CV",
            skills: "Habilidades",
            personalSkills: "Habilidades Personales",
            contactDetails: "Detalles de Contacto",
            phone: "Teléfono",
            mail: "Correo",
            address: "Dirección",
            education: "Educación",
            workExperience: "Experiencia Laboral",
            interests: "Intereses",
            robotic: "Robótica",
            drawing: "Dibujo",
            programming: "Programación",
            traveling: "Viajar",
            watchingMovies: "Ver películas"
        },
        de: {
            welcome: "Willkommen beim Lebenslauf-Generator",
            skills: "Fähigkeiten",
            personalSkills: "Persönliche Fähigkeiten",
            contactDetails: "Kontaktdaten",
            phone: "Telefon",
            mail: "E-Mail",
            address: "Adresse",
            education: "Bildung",
            workExperience: "Berufserfahrung",
            interests: "Interessen",
            robotic: "Robotik",
            drawing: "Zeichnen",
            programming: "Programmierung",
            traveling: "Reisen",
            watchingMovies: "Filme schauen"
        }
    };

    const elements = {
        welcome: document.querySelector('h1'),
        skills: document.querySelectorAll('.flex-col .text-2xl.uppercase')[0],
        personalSkills: document.querySelectorAll('.flex-col .text-2xl.uppercase')[1],
        contactDetails: document.querySelectorAll('.text-3xl.uppercase')[0],
        phone: document.querySelectorAll('.flex.items-center .capitalize')[0],
        mail: document.querySelectorAll('.flex.items-center .capitalize')[1],
        address: document.querySelectorAll('.flex.items-center .capitalize')[2],
        education: document.querySelectorAll('.text-3xl.uppercase')[1],
        workExperience: document.querySelectorAll('.text-3xl.uppercase')[2],
        interests: document.querySelectorAll('.text-3xl.uppercase')[3],
        robotic: document.querySelector('.flex-wrap .hexagon:nth-child(1)'),
        drawing: document.querySelector('.flex-wrap .hexagon:nth-child(2)'),
        programming: document.querySelector('.flex-wrap .hexagon:nth-child(3)'),
        traveling: document.querySelector('.flex-wrap .hexagon:nth-child(4)'),
        watchingMovies: document.querySelector('.flex-wrap .hexagon:nth-child(5)')
    };

    const languageSelector = document.createElement('select');
    const languages = ['en', 'fr', 'es', 'de'];
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang.toUpperCase();
        languageSelector.appendChild(option);
    });
    
    document.body.insertBefore(languageSelector, document.body.firstChild);
    
    languageSelector.addEventListener('change', (event) => {
        const lang = event.target.value;
        const translation = translations[lang];
        elements.welcome.innerHTML = `${translation.welcome}`;
        elements.skills.textContent = translation.skills;
        elements.personalSkills.textContent = translation.personalSkills;
        elements.contactDetails.textContent = translation.contactDetails;
        elements.phone.textContent = translation.phone;
        elements.mail.textContent = translation.mail;
        elements.address.textContent = translation.address;
        elements.education.textContent = translation.education;
        elements.workExperience.textContent = translation.workExperience;
        elements.interests.textContent = translation.interests;
        elements.robotic.textContent = translation.robotic;
        elements.drawing.textContent = translation.drawing;
        elements.programming.textContent = translation.programming;
        elements.traveling.textContent = translation.traveling;
        elements.watchingMovies.textContent = translation.watchingMovies;
    });
});
