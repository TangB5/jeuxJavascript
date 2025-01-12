window.addEventListener('DOMContentLoaded', () => {
    const cvData = JSON.parse(localStorage.getItem('cvData')) || {};

    if (cvData) {
        document.getElementById('cvName').textContent = cvData.firstName || '';
        document.getElementById('cvSecondName').textContent = cvData.lastName || '';
        document.getElementById('cvAddress').textContent = cvData.address || '';
        document.getElementById('cvEmail').textContent = cvData.email || '';
        document.getElementById('cvPhone').textContent = cvData.phone || '';

        if (Array.isArray(cvData.skills)) {
            const skillsContainer = document.getElementById('cvSkills');
            skillsContainer.innerHTML = '';  // Clear existing content
            cvData.skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.className = 'w-full mb-4';
                skillElement.innerHTML = `
                    <div class="flex justify-between w-full">
                        <div class="font-bold capitalize">${skill.competence}</div>
                        <div>${skill.note}<span class="text-slate-400">/10</span></div>
                    </div>
                    <div class="w-full h-2 bg-slate-500">
                        <div class="h-full bg-blue-500" style="width: ${skill.note * 10}%;"></div>
                    </div>
                `;
                skillsContainer.appendChild(skillElement);
            });
        }

        if (Array.isArray(cvData.personalSkills)) {
            const personalSkillsContainer = document.getElementById('cvPersonalSkills');
            personalSkillsContainer.innerHTML = '';  // Clear existing content
            cvData.personalSkills.forEach(pSkill => {
                const personalSkillElement = document.createElement('div');
                personalSkillElement.className = 'w-full mb-4';
                personalSkillElement.innerHTML = `
                    <div class="flex justify-between w-full">
                        <div class="font-bold capitalize">${pSkill.competence}</div>
                        <div>${pSkill.note}<span class="text-slate-400">/10</span></div>
                    </div>
                    <div class="w-full h-2 bg-slate-500">
                        <div class="h-full bg-blue-500" style="width: ${pSkill.note * 10}%;"></div>
                    </div>
                `;
                personalSkillsContainer.appendChild(personalSkillElement);
            });
        }

        if (Array.isArray(cvData.education)) {
            const educationContainer = document.getElementById('cvEducation');
            educationContainer.innerHTML = '';  // Clear existing content
            cvData.education.forEach(item => {
                const educationElement = document.createElement('div');
                educationElement.className = 'mb-6 ml-10';
                educationElement.innerHTML = `
                    <div class="text-xl font-bold uppercase">${item.diplome} <span class="font-normal text-slate-500">/${item.annee}</span></div>
                    <div class="text-slate-500">${item.cours}</div>
                `;
                educationContainer.appendChild(educationElement);
            });
        }

        if (Array.isArray(cvData.experience)) {
            const experienceContainer = document.getElementById('cvExperience');
            experienceContainer.innerHTML = '';  // Clear existing content
            cvData.experience.forEach(item => {
                const experienceElement = document.createElement('div');
                experienceElement.className = 'mb-6 ml-10';
                experienceElement.innerHTML = `
                    <div class="text-xl font-bold uppercase">${item.Titre} <span class="font-normal text-slate-500">/${item.annee}</span></div>
                    <div class="text-slate-500">${item.Entreprise}</div>
                `;
                experienceContainer.appendChild(experienceElement);
            });
        }

        if (Array.isArray(cvData.interess)) {
            const interessContainer = document.getElementById('cvInteress');
            interessContainer.innerHTML = '';  // Clear existing content
            cvData.interess.forEach(item => {
                const interessElement = document.createElement('div');
                interessElement.className = 'flex items-center justify-center text-white uppercase bg-blue-500 hexagon';
                interessElement.style.width = '100px';  // Set dynamic size
                interessElement.style.height = '100px';
                interessElement.textContent = item;
                interessContainer.appendChild(interessElement);
            });
        }
    }
});
const profileImg = document.getElementById('profileImg');
const storedProfileImage = localStorage.getItem('profileImage');
if (storedProfileImage) {
    profileImg.src = storedProfileImage;
}
