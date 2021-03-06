// RecipeClass
// Euvin Keel

/*
    Based off of this schema: https://github.com/cse110-fa21-group31/cse110-fa21-group31/issues/22
    this class needs:
    * the recipe ID: string
    * name: string
    * author id: string
    * datePosted: Date
    * coverImage: (unsure how to store this, TODO)
    * cookingTime: 
    * difficulty 
    * tags (optional)
    * ingredients
    * steps
    
    // not even sure if we can manage comments in a class since we're using a third party thing to manage those
    * comments (starts out empty)
*/

const PLACEHOLDER_IMG =
    window.location.protocol +
    "//" +
    window.location.host +
    "/source/assets/Images/recipeCardPlaceholder.png";

class RecipeClass extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    // setters for all changable properties
    set data(data) {
        if (!data) return;

        // Used to access the actual data object
        this.json = data;
        const style = document.createElement("style");

        style.innerHTML = `
        .recipeCard {
            height: 350px;
            background: white;
            padding-top: 40px;
            // margin-top: 30px;
            text-align: center;
            border: 2px solid #4E598C;
            border-radius: 15px;
            display: table;
            table-layout:fixed;
            length: 200px;
            width: 300px;
            box-shadow: 2px 2px;
            margin-left: auto;
            margin-right: auto;
        }
        .recipeCard:hover {
            background-color: #F9c784;
            box-shadow: 5px 5px;
            border-color: #FCAF58;
        }
        .recipeCard > p {
            font-family: 'Bold Open Sans', sans-serif;
            font-weight: bold;
            color: #4E598C;
            font-size: large;
            
        }
        
        .recipeCard > img {
            width:200px;
            height:200px;
        } 
        
        ul {
            height: 50px;
        }
        ul.tagsList {
            /* flexbox tags */
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            font-family: 'Open Sans', sans-serif;
            list-style-type: none;
            /* white-space:nowrap; */
            color: white;
            font-weight: bold;
            padding-left: 0px;
            padding-bottom: 10px;
            padding-top: 3px;
            font-size: 15px;
            text-align: center;
            /* border-radius: 2cm; */
            overflow: hidden; 
        }
        
        li.individualTag {
            /* border-style:solid; */
            /* for flexbox tags, add marging 4px to top and bottom */
            height: 40%;
            margin: 4px 10px;
            /* border: #FCAF58; */
            border-radius: 0.1cm;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 1px;
            padding-bottom: 2px;
            text-align: center;
            background-color: #FCAF58;
            display: inline;
        }
        .myRecipeCardGridContainer {
            background-color: #ededed;
        }

        `;

        const card = document.createElement("div");
        card.classList.add("recipeCard");

        //Grab image
        const imageData = getImage(data);
        const image = document.createElement("img");
        image.href = imageData;

        // image.style.border - radius = 50 % ;
        // show placeholder image if imageData not availables
        // TODO: change these conditions after figuring out how to upload and store image
        image.src =
            imageData == null || typeof imageData == "object" || imageData == ""
                ? PLACEHOLDER_IMG
                : imageData;
        const imageErrorFunc = `this.onerror=null; this.src='${PLACEHOLDER_IMG}'`;
        image.onerror = (err) => {
            image.onerror = null;
            image.src = "./source/assets/Images/recipeCardPlaceholder.png";
        };
        image.style.borderRadius = "15px";

        // console.log(image);

        // Grab the name
        const nameText = getName(data);
        const name = document.createElement("p");
        name.innerText = nameText;
        // console.log(nameText);

        //Get tagssss
        const tagsData = getTags(data);
        const tags = document.createElement("div");
        tags.classList.add("tags");
        // console.log(tagsData);

        const tagsList = document.createElement("ul");
        tagsList.classList.add("tagsList");
        tagsList.setAttribute("id", "tag");
        if (tagsData) {
            for (let i = 0; i < tagsData.length; i++) {
                const individualTag = document.createElement("li");
                individualTag.classList.add("individualTag");
                individualTag.innerText = tagsData[i];
                tagsList.appendChild(individualTag);
            }
        }

        // Add all of the elements to the card
        if (tagsData) tags.appendChild(tagsList);
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(tags);

        this.shadowRoot.append(style, card);
    }

    set name(name) {
        this.name = name;
    }

    set authorID(authorID) {
        this.authorID = authorID;
    }

    set datePosted(datePosted) {
        this.datePosted = datePosted;
    }

    set coverImage(coverImage) {
        this.coverImage = coverImage;
    }

    set cookingTime(cookingTime) {
        this.cookingTime = cookingTime;
    }

    set difficulty(difficulty) {
        this.difficulty = difficulty;
    }

    set tags(tags) {
        this.tags = tags;
    }

    addTag(tag) {
        this.tags.push(tag);
    }
    removeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }

    set ingredients(ingredients) {
        this.ingredients = ingredients;
    }

    set ingredientAmounts(ingredientAmounts) {
        this.ingredientAmounts = ingredientAmounts;
    }

    set steps(steps) {
        this.steps = steps;
    }

    insertStep(step, stepIndex = this.steps.length) {
        this.steps.splice(stepIndex, 0, step);
    }

    removeStep(stepIndex) {
        this.steps.splice(stepIndex, 1);
    }

    // TODO: unsure how we'll handle comments since we're not the ones storing them
    // these are just placeholders
    addComment(comment) {
        this.comments.push(comment);
    }
    removeComment(commentIndex) {
        this.comments.splice(commentIndex, 1);
    }

    // getters for all properties
    get name() {
        return this.name;
    }

    get authorID() {
        return this.authorID;
    }

    get datePosted() {
        return this.datePosted;
    }

    get coverImage() {
        return this.coverImage;
    }

    get cookingTime() {
        return this.cookingTime;
    }

    get difficulty() {
        return this.difficulty;
    }

    get tags() {
        return this.tags;
    }

    get ingredients() {
        return this.ingredients;
    }

    get ingredientAmounts() {
        return this.ingredientAmounts;
    }

    get steps() {
        return this.steps;
    }

    get comments() {
        return this.comments;
    }

    get data() {
        return this.json;
    }
}

// Getters from lab

/**
 * Recursively search for a key nested somewhere inside an object
 * @param {Object} object the object with which you'd like to search
 * @param {String} key the key that you are looking for in the object
 * @returns {*} the value of the found key
 */
function searchForKey(object, key) {
    var value;
    Object.keys(object).some(function (k) {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === "object") {
            value = searchForKey(object[k], key);
            return value !== undefined;
        }
    });
    return value;
}

/**
 * Extract the name of the recipe from the given recipe schema JSON obejct
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the recipe title
 */
function getName(data) {
    if (data.name) return data.name;
    /*
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          if (data['@graph'][i]['name']) return data['@graph'][i]['name'];
        };
      }
    }
    */
    return null;
}

/**
 * Extract the author of the recipe from the given recipe schema JSON obejct
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the recipe's author
 */
function getAuthor(data) {
    if (data["author"]) return data["author"];
    else return null;
}

/**
 * Extract the description of the recipe from the given recipe schema JSON obejct
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the recipe description
 */
function getDescription(data) {
    if (data["description"]) return data["description"];
    else return null;
}

/**
 * Extract a usable image from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the URL of the image as a string, otherwise null
 */
function getImage(data) {
    if (data["image"]) return data["image"];
    else return null;
}

/**
 * Extract tags from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns tags as a array, otherwise null
 */
function getTags(data) {
    if (data.tags) return data.tags;
    else return null;
}

/**
 * Extract the ingredients of the recipe from the given recipe schema JSON obejct
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {Array} If found, returns the recipe ingredients
 */
function getIngredients(data) {
    if (data.recipeIngredient) {
        if (typeof data.recipeIngredient == "string") {
            return data.recipeIngredient.slit(". ");
        }
        return data.recipeIngredient;
    }
    if (data["@graph"]) {
        for (let i = 0; i < data["@graph"].length; i++) {
            if (data["@graph"][i]["@type"] == "Recipe") {
                if (typeof data["@graph"][i]["recipeIngredient"] == "string") {
                    return data["@graph"][i]["recipeIngredient"].slit(". ");
                }
                return data["@graph"][i]["recipeIngredient"];
            }
        }
    }
    return null;
}

/**
 * Extract the instructions of the recipe from the given recipe schema JSON obejct.
 * This ones a bit messy and optimally should be refactored but it works.
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {Array} If found, returns the recipe instructions
 */
function getSteps(data) {
    if (data.recipeInstructions) {
        if (typeof data.recipeInstructions == "string") {
            return data.recipeInstructions.split(". ");
        }
        return data.recipeInstructions;
    }
    if (data["@graph"]) {
        for (let i = 0; i < data["@graph"].length; i++) {
            if (data["@graph"][i]["@type"] == "Recipe") {
                if (data["@graph"][i]["recipeInstructions"] == "string") {
                    return data["@graph"][i]["recipeInstructions"].split(". ");
                }
                if (
                    data["@graph"][i]["recipeInstructions"][0][
                        "itemListElement"
                    ]
                ) {
                    const instructionArr = [];
                    data["@graph"][i]["recipeInstructions"].forEach(
                        (instrObj) => {
                            instrObj.itemListElement.forEach((instruction) => {
                                instructionArr.push(instruction.text);
                            });
                        }
                    );
                    return instructionArr;
                } else {
                    return data["@graph"][i]["recipeInstructions"].map(
                        (instr) => instr.text
                    );
                }
            }
        }
    }
    return null;
}

// export default RecipeClass;

customElements.define("recipe-card", RecipeClass);
