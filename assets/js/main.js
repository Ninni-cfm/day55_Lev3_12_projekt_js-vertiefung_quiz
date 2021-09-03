//*************************************************************************************************************************
// Projekt lev3_12: Quiz - Aufgabenstellung
// 
// Verwende das Array im Kommentarbereich und die DOM-Eigenschaften, um ein Quiz zu erstellen.
// Deine HTML sollte nur dies beinhalten: <div id="content"></div>


//**************************************************************************************************************************
// The data array
const data = [
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4a864049-816a-479e-8736-51740e8b724b.jpg",
        question: "Which ocean lies on the east coast of the United States?",
        choice: ["Eastern", "Pacific", "Indian", "Atlantic"],
        answer: "Atlantic"
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4d101ba1-9275-4fb5-ba2c-5606e6c0274e.jpg",
        question: "Which is the world's highest mountain?",
        choice: ["K2", "Makalu", "Mount Everest", "Kilimanjaro"],
        answer: "Mount Everest"
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/07121a24-b34b-4711-9bfa-5287163e65ce.jpg",
        question: "Which of these cities is not in Europe?",
        choice: ["Prague", "Moscow", "Barcelona", "Reykjavik"],
        answer: "Moscow"
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/467a486b-be3a-4183-90ed-dd6867d5852d.jpg",
        question: "True or False: Iceland is covered in ice.",
        choice: [true, false],
        answer: false
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
        question: "The United Kingdom is comprised of how many countries?",
        choice: [1, 2, 3, 4],
        answer: 4
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
        question: "Which of the following countries do not border France?",
        choice: ["Germany", "Netherlands", "Spain", "Italy"],
        answer: "Netherlands"
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/6e99b817-7be7-4f8a-9146-3f602ac81fad.jpg",
        question: "Which U.S. state is the Grand Canyon located in?",
        choice: ["Wyoming", "Arizona", "New Mexico", "Nevada"],
        answer: "Arizona"
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/866f119d-e5e2-45ca-846c-b6d10a59d1e4.jpg",
        question: "Which is the smallest country, measured by total land area?",
        choice: ["Maldives", "Monaco", "Vatican"],
        answer: "Vatican"
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/13efaf72-d695-4f65-b043-2b805b6a88eb.jpg",
        question: "Which is the longest river in the world?",
        choice: ["Amazon River", "Congo River", "Yellow River", "Nile River"],
        answer: "Nile River"
    },
    {
        url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/1226f177-dc1a-4142-8875-bdaa177717d7.jpg",
        question: "Which is the largest body of water?",
        choice: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Nile River"],
        answer: "Pacific Ocean"
    }
]


//**************************************************************************************************************************
// Some constants
const buttonTextColor = "#f1f1f1"
const buttonBackground = "#2e2e2e";
const buttonBackgroundTrue = "darkgreen";
const buttonBackgroundFalse = "darkred";


//**************************************************************************************************************************
// Check if the question was answered right.
//
function checkQuestion(button) {

    // reset background-color for all buttons in same parent:
    for (btn of button.parentNode.getElementsByTagName("input")) {
        btn.style.backgroundColor = buttonBackground;
    }

    // question was answered false, set the background of the button to red
    if (!eval(button.getAttribute("data-result"))) {
        button.style.backgroundColor = buttonBackgroundFalse;
        return;
    }

    // question was answered correct, set the background of the button to green
    // and navigate to the next question if there is a question left
    button.style.backgroundColor = buttonBackgroundTrue;
    let nextQuestion = button.getAttribute("data-next-question");
    console.log(nextQuestion);
    if (nextQuestion != null) {
        setTimeout(() => window.location.replace(`#q${nextQuestion}`), 1000);
    }
}


//**************************************************************************************************************************
// Build a complete section for a single question
function buildQuestion(index) {

    let objQuestion = data[index];

    // create a section with id and some styles
    let section = document.createElement('section');
    section.id = `q${index.toString().padStart(2, '0')}`;
    // add some styles
    section.style.minHeight = "100vh";
    section.style.display = "flex";
    section.style.flexDirection = "column";
    section.style.alignItems = "center";
    section.style.justifyContent = "center";

    // append the image
    let img = document.createElement('img');
    img.src = objQuestion.url;
    section.appendChild(img);

    // append the question
    let question = document.createElement('h2');
    question.textContent = objQuestion.question;
    section.appendChild(question);

    // finally append the answer buttons
    let divButtons = document.createElement('div');
    objQuestion.choice.forEach(choice => {

        let btn = document.createElement('input');
        btn.type = 'button';
        btn.value = choice;

        // add some styles
        btn.style.backgroundColor = buttonBackground;
        btn.style.color = buttonTextColor;
        btn.style.fontSize = "1.5rem";
        btn.style.width = "15rem";
        btn.style.padding = "1rem";
        btn.style.margin = "0.5rem";

        btn.setAttribute("data-result", `${objQuestion.answer == choice}`)

        if (index < data.length - 1)
            btn.setAttribute("data-next-question", (index + 1).toString().padStart(2, '0'))

        btn.addEventListener('mouseenter', () => btn.style.cursor = 'pointer');
        btn.addEventListener('click', () => checkQuestion(btn));

        divButtons.appendChild(btn);
    });
    section.appendChild(divButtons);

    // add the full section to the body
    document.body.appendChild(section);
}


//**************************************************************************************************************************
// Build the whole website including all questions
function buildWebsite() {
    for (let index = 0; index < data.length; index++) {

        buildQuestion(index, data[index]);
    }
}
buildWebsite();