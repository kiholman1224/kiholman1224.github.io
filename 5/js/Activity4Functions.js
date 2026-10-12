const DATA_URL = "js/boardingData.json";
const BG_VARIABLE = "--hero-img";

const Sections = {
    overview: { title: "sec1Title", subtitle: "sec1Subtitle", grid: "sec1Grid" },
    equipment: { title: "sec2Title", subtitle: "sec2Subtitle", grid: "sec2Grid" }
};

async function getData(){
    const response = await fetch(DATA_URL);
    if (!response.ok) {
        throw new Error("Could not load " + DATA_URL + " (HTTP " + response.status + ")");
    }
return response.json();
}

function setTextById(id, text){
    const element = document.getElementById(id);
    if(!element){
        console.warn("No element with id: ", id);
        return;
    }
    element.textContent = text;
}

function UpdateCards(cards, gridId){
    const grid = document.getElementById(gridId);
    if(!grid){
        console.warn("No element with id: ", gridId);
        return;
    }
    const cardElements = grid.querySelectorAll(".card");
    cards.forEach(function(card, i){
        const el = cardElements[i];
        if(!el){
            console.warn("Missing card # " + (i + 1) + " in", gridId);
            return;
        }
        el.querySelector("h3").textContent = card.title;
        el.querySelector("p").textContent = card.description;
    });
}

function updateSection(sectionData, ids){
    setTextById(ids.title, sectionData.title);
    setTextById(ids.subtitle, sectionData.subtitle);
    updateCards(sectionData.cards, ids.grid);
}

function updateText(data){
    document.title = data.title;
    setTextById("styleName", data.header);
    setTextById("heroTitle", data.hero.headline);
    setTextById("heroDescription", data.hero.description);
    updateSection(data.sections.overview, SECTIONS.overview);
    updateSection(data.sections.equipment, SECTIONS.equipment);
}

function updateBackground(imgPath){
    const hero = document.getElementById("heroSection");
    hero.style.setProperty(BG_VARIABLE, 'url("' + imgPath + '")');
}

async function changeToSnowboarding(){
    try{
        const data = await getData();
        updateText(data);
        updateBackground(data.hero.image);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("changeThemeBtn").addEventListener("click", changeToSnowboarding);
