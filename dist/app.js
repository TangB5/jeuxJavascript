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
    console.log({
        firstName,
        lastName,
        phone,
        email,
        address,
        skills,
        personalSkills,
        education
    });
});

nom= document.querySelector(".nom");
prenom= document.querySelector(".prenom");

nom.innerHTML=firstName.value;
prenom.innerHTML=lastName.value;