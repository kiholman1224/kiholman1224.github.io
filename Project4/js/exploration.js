const DATA_URL = "data/solar-system.json";
const VIEW_IDS = ["category-view", "world-view", "detail-view"];

async function getData(){
    const response = await fetch(DATA_URL);
    if(!response.ok){
        throw new Error("Could not load " + DATA_URL + " (HTTP " + response.status + ")");
    }
    return response.json();
}

function showStatus(message, isError = false){
    const status = document.getElementById("status");
    status.textContent = message;
    status.classList.toggle("status-error", isError);
}

function makeElement(tag, text = "", className = ""){
    const element = document.createElement(tag);
    if(text){
        element.textContent = text;
    }
    if(className){
        element.className = className;
    }
    return element;
}

function showView(viewId){
    VIEW_IDS.forEach(function(id){
        document.getElementbyId(id).hidden = id !== viewId;
    });
    const heading = document.querySelector("#" + viewId + " h2");
    heading.tabIndex = -1;
    heading.focus();
}

function createCard(title, summary, onSelect){
    const card = makeElement("li", "", "card");
    const heading = makeElement("h3");
    const button = makeElement("button", title);
    button.type = "button";
    button.addEventListener("click", onSelect);
    heading.append(button);
    card.append(heading, makeElement("p", summary));
    return card;
}

function createFigure(image){
    const figure = makeElement("figure");
    const img = makeElement("img");
    img.src = image.src;
    img.alt = image.alt;
    const caption = makeElement("figcaption", image.caption + " Image: ");
    caption.append(makeElement("cite", image.credit));
    figure.append(img, caption);
    return figure;
}

function createSection(section){
    const element = makeElement("section");
    element.append(makeElement("h3", section.heading));
    section.paragraphs.forEach(function(text){
        element.append(makeElement("p", text));
    });
    return element;
}

function renderWorldDetails(world){
    document.getElementById("detail-heading").textContent = world.name;
    const intro = makeElement("div", "", "planet-intro");
    const text = makeElement("div", "", "planet-text");
    text.append(makeElement("p", world.lead, "lead"), makeElement("p", world.description));
    intro.append(text, createFigure(world.image));
    const columns = makeElement("div", "", "detail-columns");
    world.sections.forEach(function(section){
        columns.append(createSection(section));
    });
    document.getElementById("detail-content").replaceChildren(intro, columns);
    showView("detail-view");
}

function renderWorlds(category){
    document.getElementById("world-heading").textContent = category.name;
    const cards = category.worlds.map(function(world){
        return createCard(world.name, world.summary, function(){
            renderWorldDetails(world);
        });
    });
    document.getElementById("world-list").replaceChildren(...cards);
    showView("world-view");
}

function renderCategories(categories){
    const cards = categories.map(function(category){
        return createCard(category.name, category.summary, function(){
            renderWorlds(category);
        });
    });
    document.getElementById("category-list").replaceChildren(...cards);
}

async function init(){
    document.getElementById("back-to-categories").addEventListener("click", function() {
        showView("category-view");
    });
    document.getElementById("back-to-worlds").addEventListener("click", function() {
        showView("world-view");
    });
    showStatus("Loading solar system data...");
    try{
        const data = await getData();
        renderCategories(data.categories);
        showStatus("");
    } catch(error){
        showStatus("Sorry, the solar system data could not be loaded. Refresh the page and try again.", true);
    }
}

init();
