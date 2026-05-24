const steps = document.querySelectorAll(".step");

let currentStep = 0;

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function showStep(index){

    steps.forEach(step => {
        step.classList.remove("active");
    });

    steps[index].classList.add("active");

    prevBtn.style.display =
    index === 0 ? "none" : "inline-block";

    if(index === steps.length - 1){
        nextBtn.innerText = "Generate Portfolio";
    }
    else{
        nextBtn.innerText = "Next";
    }

}

showStep(currentStep);

// =======================
// NEXT BUTTON
// =======================

nextBtn.addEventListener("click", () => {

    if(currentStep === steps.length - 1){

        savePortfolio();

        return;
    }

    currentStep++;

    showStep(currentStep);

});

// =======================
// PREVIOUS BUTTON
// =======================

prevBtn.addEventListener("click", () => {

    currentStep--;

    showStep(currentStep);

});

// =======================
// SKILLS SYSTEM
// =======================

const skillsAPI = "http://localhost:3000/skills";

let selectedSkills = [];

async function loadSkills(){

    const res = await fetch(skillsAPI);

    const skills = await res.json();

    const skillsList =
    document.getElementById("skillsList");

    skills.forEach(skill => {

        const div = document.createElement("div");

        div.className = "skill-card";

        div.innerHTML = `
            <span>${skill.name}</span>
            <button class="add-btn">+</button>
        `;

        div.querySelector("button")
        .addEventListener("click", () => {

            addSkill(skill.name);

        });

        skillsList.appendChild(div);

    });

}

loadSkills();

// =======================
// ADD SKILL
// =======================

function addSkill(skill){

    if(selectedSkills.includes(skill)) return;

    selectedSkills.push(skill);

    renderSkills();

}

// =======================
// RENDER SKILLS
// =======================

function renderSkills(){

    const selected =
    document.getElementById("selectedSkills");

    selected.innerHTML = "";

    selectedSkills.forEach(skill => {

        selected.innerHTML += `
            <span class="selected-skill">
                ${skill}
            </span>
        `;

    });

}

// =======================
// CUSTOM SKILL
// =======================

document.getElementById("addCustomSkill")
.addEventListener("click", () => {

    const customSkill =
    document.getElementById("customSkill").value;

    if(customSkill.trim() !== ""){

        addSkill(customSkill);

        document.getElementById("customSkill").value = "";

    }

});

// =======================
// PROJECTS SYSTEM
// =======================

document.getElementById("addProjectBtn")
.addEventListener("click", () => {

    const container =
    document.getElementById("projectsContainer");

    const div = document.createElement("div");

    div.className = "project-box mb-4";

    div.innerHTML = `

        <input type="text"
               class="form-control mb-3 project-name"
               placeholder="Project Name">

        <textarea
               class="form-control mb-3 project-description"
               rows="3"
               placeholder="Project Description"></textarea>

        <input type="text"
               class="form-control mb-3 project-tech"
               placeholder="Technologies Used">

        <input type="text"
               class="form-control project-link"
               placeholder="Project Link">

    `;

    container.appendChild(div);

});

// =======================
// SAVE PORTFOLIO
// =======================

function savePortfolio(){

    const portfolioData = {

        // PERSONAL INFO

        name:
        document.getElementById("name").value,

        fatherName:
        document.getElementById("fatherName").value,

        email:
        document.getElementById("email").value,

        contact:
        document.getElementById("contact").value,

        address:
        document.getElementById("address").value,

        title:
        document.getElementById("title").value,

        // SKILLS

        skills: selectedSkills,

        // EDUCATION

        education: {

            matric: {

                school:
                document.getElementById("matricSchool").value,

                board:
                document.getElementById("matricBoard").value,

                grade:
                document.getElementById("matricGrade").value,

                year:
                document.getElementById("matricYear").value

            },

            intermediate: {

                college:
                document.getElementById("interCollege").value,

                type:
                document.getElementById("interType").value,

                grade:
                document.getElementById("interGrade").value,

                year:
                document.getElementById("interYear").value

            },

            university: {

                name:
                document.getElementById("uniName").value,

                degree:
                document.getElementById("uniDegree").value,

                cgpa:
                document.getElementById("uniCgpa").value,

                year:
                document.getElementById("uniYear").value

            }

        },

        // PROJECTS

        projects: Array.from(
            document.querySelectorAll(".project-box")
        ).map(project => ({

            name:
            project.querySelector(".project-name").value,

            description:
            project.querySelector(".project-description").value,

            technologies:
            project.querySelector(".project-tech").value,

            link:
            project.querySelector(".project-link").value

        })),

        // BIO

        about:
        document.getElementById("about").value

    };

    // SAVE TO LOCAL STORAGE

    localStorage.setItem(
        "portfolioData",
        JSON.stringify(portfolioData)
    );

    alert("Portfolio Generated!");

    window.location.href = "modern.html";

}