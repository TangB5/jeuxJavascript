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
        interests: "Interests"
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
        interests: "Intérêts"
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
        interests: "Intereses"
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
        interests: "Interessen"
    }
};

document.getElementById('languageSelect').addEventListener('change', (event) => {
    const lang = event.target.value;
    const t = translations[lang];
    document.getElementById('welcome').innerHTML = t.welcome;
    document.querySelectorAll('.skills').forEach(el => el.textContent = t.skills);
    document.querySelectorAll('.personalSkills').forEach(el => el.textContent = t.personalSkills);
    document.querySelectorAll('.contactDetails').forEach(el => el.textContent = t.contactDetails);
    // Add similar code for other elements as per your structure
});
const profileInput = document.getElementById('profilePicture');
let profileImageData = '';

profileInput.addEventListener('change', () => {
    const reader = new FileReader();
    reader.onload = () => {
        profileImageData = reader.result;
        localStorage.setItem('profileImage', profileImageData);
    };
    if (profileInput.files[0]) {
        reader.readAsDataURL(profileInput.files[0]);
    }
});

document.getElementById('addSkill').addEventListener('click', function () {
    const container = document.getElementById('skillsContainer');
    const skillInput = document.createElement('div');
    skillInput.className = 'flex items-center space-x-4';
    skillInput.innerHTML = `
        <input type="text" class="flex-1 p-2 border rounded-lg" placeholder="Compétence">
        <input type="number" min="0" max="10" class="w-20 p-2 border rounded-lg" placeholder="Note">
    `;
    container.appendChild(skillInput);
});
document.getElementById('addInteress').addEventListener('click', function () {
    const container = document.getElementById('interessContainer');
    const interessInput = document.createElement('div');
    interessInput.className = 'flex-col w-full space-y-4';
    interessInput.innerHTML = `
    <input type="text" class="w-full p-2 border rounded-lg mt-2" placeholder="centre d'interet">
    `;
    container.appendChild(interessInput);
});

document.getElementById('PaddSkill').addEventListener('click', function () {
    const container = document.getElementById('PskillsContainer');
    const PskillInput = document.createElement('div');
    PskillInput.className = 'flex items-center space-x-4';
    PskillInput.innerHTML = `
        <input type="text" class="flex-1 p-2 border rounded-lg" placeholder="Compétence ppersonnelle">
        <input type="number" min="0" max="10" class="w-20 p-2 border rounded-lg" placeholder="Note">
    `;
    container.appendChild(PskillInput);
});

document.getElementById('addExperience').addEventListener('click', function () {
    const container = document.getElementById('experienceContainer');
    const experienceInput = document.createElement('div');
    experienceInput.className = 'flex items-center space-x-4';
    experienceInput.innerHTML = `
        <input type="text" class="flex-1 p-2 border rounded-lg" placeholder="Titre du poste">
        <input type="text" class="flex-1 p-2 border rounded-lg" placeholder="Entreprise">
        <input type="text" class="w-40 p-2 border rounded-lg" placeholder="Année">
    `;
    container.appendChild(experienceInput);
});
document.getElementById('experienceContainer').addEventListener('click', (event) => {
    if (event.target.classList.contains('removeExperience')) {
        const experienceDiv = event.target.closest('.items-center');
        experienceDiv.remove();
    }
});

document.getElementById('addDiplome').addEventListener('click', function () {
    const container = document.getElementById('educationContainer');
    const diplomeInput = document.createElement('div');
    diplomeInput.className = 'flex items-center space-x-4';
    diplomeInput.innerHTML = `
        <input type="text" class="flex-1 p-2 border rounded-lg" placeholder="diplome">
        <input type="text" class="flex-1 p-2 border rounded-lg" placeholder="cours/ecole">
        <input type="text" class="w-40 p-2 border rounded-lg" placeholder="Année">
    `;
    container.appendChild(diplomeInput);
});


document.getElementById('cvForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Récupération des valeurs des champs dans des variables
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    const skills = Array.from(document.querySelectorAll('#skillsContainer .flex')).map(container => {
        const inputs = container.querySelectorAll('input');
        return {
            competence: inputs[0]?.value.trim(),
            note: inputs[1]?.value.trim()
        };
    });

    const interess = Array.from(document.querySelectorAll('#interessContainer .flex')).map(container => {
        const input = container.querySelector('input');
        return input?.value.trim();
    });

    const personalSkills = Array.from(document.querySelectorAll('#PskillsContainer .flex')).map(container => {
        const inputs = container.querySelectorAll('input');
        return {
            competence: inputs[0]?.value.trim(),
            note: inputs[1]?.value.trim()
        };
    });

    const education = Array.from(document.querySelectorAll('#educationContainer .flex')).map(container => {
        const inputs = container.querySelectorAll('input');
        return {
            diplome: inputs[0]?.value.trim(),
            cours: inputs[1]?.value.trim(),
            annee: inputs[2]?.value.trim()
        };
    });
    
    const experience = Array.from(document.querySelectorAll('#experienceContainer .flex')).map(container => {
        const inputs = container.querySelectorAll('input');
        return {
            Titre: inputs[0]?.value.trim(),
            Entreprise: inputs[1]?.value.trim(),
            annee: inputs[2]?.value.trim()
        };
    });
    // Validation des champs obligatoires
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;

    if (!firstName || !lastName || !phone || !email || !address || 
        skills.some(skill => !skill.competence || !skill.note) || 
        personalSkills.some(skill => !skill.competence || !skill.note) || 
        education.some(ed => !ed.diplome || !ed.cours || !ed.annee)) {
        
        Swal.fire({
            title: 'Attention!',
            text: 'Veuillez remplir tous les champs obligatoires avant de soumettre le formulaire.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    if (!emailRegex.test(email)) {
        Swal.fire({
            title: 'Erreur',
            text: 'Veuillez entrer une adresse e-mail valide.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (!phoneRegex.test(phone)) {
        Swal.fire({
            title: 'Erreur',
            text: 'Veuillez entrer un numéro de téléphone valide.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Affichage d'une alerte de succès
    Swal.fire({
        title: 'Succès!',
        text: 'Votre CV a été généré avec succès!',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    // Affichage des informations collectées (optionnel)
    const cvData = ({
        firstName,
        lastName,
        phone,
        email,
        address,
        skills,
        personalSkills,
        education,
        experience,
        interess
    });
    

    localStorage.setItem('cvData', JSON.stringify(cvData));
    window.location.href = 'cv.html';
});
