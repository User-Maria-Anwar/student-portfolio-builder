const API = "http://localhost:3000/templates";

async function loadTemplates(){

    const res = await fetch(API);
    const templates = await res.json();

    const list = document.getElementById("templateList");

    const categories = ["Modern", "Minimal", "Creative"];

    categories.forEach(category => {

        const section = document.createElement("div");
        section.className = "mb-5";

        section.innerHTML = `
            <h2 class="text-white mb-4">
                ${category} Templates
            </h2>

            <div class="row g-4 ${category}-row"></div>
        `;

        list.appendChild(section);

        const row = section.querySelector(`.${category}-row`);

        const filtered = templates.filter(t => t.category === category);

        filtered.forEach(template => {

            const col = document.createElement("div");
            col.className = "col-md-3";

            col.innerHTML = `

                <div class="template-card">

                    <img src="${template.image}">

                    <div class="template-content">

                        <h4>${template.name}</h4>

                        <button class="btn-select">
                            Use Template
                        </button>

                    </div>

                </div>

            `;

            col.querySelector("button").addEventListener("click", () => {

                localStorage.setItem(
                    "selectedTemplate",
                    JSON.stringify(template)
                );

                window.location.href = template.file;

            });

            row.appendChild(col);

        });

    });

}

loadTemplates();