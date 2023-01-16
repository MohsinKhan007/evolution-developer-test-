import { GameOutcome } from "../shared/GameOutcome"
import API from "../shared/axios"
import {
    PORT,
    REEL_SIZE,
    INTIAL_REEL_VALUE,
    INTERNAL_SERVER_ERROR,
    BONUS_DIV_ID,
    Win_Type_ID,
    SLOT_MACHINE,
    SPIN_BUTTON_TEXT_CLASS,
    ERROR_DIV_ID,
    PARENT_ID,
} from "../constants/constants"

const spin = async (): Promise<void> => {
    try {
        const response = await API(PORT)({
            method: "post",
            url: "/spin",
        })

        const serverResponse: GameOutcome = response.data!

        let slots = new Array<HTMLElement>(REEL_SIZE)
        let bonusDiv = document.getElementById(BONUS_DIV_ID)!
        let gameOutComeDiv = document.getElementById(Win_Type_ID)!
        let spinText = document.getElementsByClassName("spinText")!
        let spinButton = document.getElementById(
            "spin-button"
        ) as HTMLButtonElement
        spinButton.disabled = true
        for (let i = 0; i < REEL_SIZE; i++) {
            slots[i] = document.getElementById(`slot${i + 1}`)!
            slots[i]?.classList.add("background")
            slots[i]?.classList.add("loop")
        }

        spinText[0].className += " hide"
        gameOutComeDiv.innerText = "Loading..."
        gameOutComeDiv?.classList.add("blink-class")
        bonusDiv?.classList.add("hide")

        generateSpin(
            slots,
            serverResponse,
            gameOutComeDiv!,
            bonusDiv,
            spinButton
        )

        if (serverResponse.bonus) {
            setTimeout(() => {
                spin()
            }, 4000)
        }
    } catch (e: any) {
        document.getElementById(ERROR_DIV_ID)!.innerText = e
        // document.getElementById("errorText")!.innerText = "ok"
        throw new Error(e)
    }
}

const generateSpin = (
    slots: Array<HTMLElement>,
    serverResponse: GameOutcome,
    gameOutComeDiv: HTMLElement,
    bonusDiv: HTMLElement,
    spinButton: HTMLButtonElement
) => {
    setTimeout(() => {
        for (let i = 0; i < REEL_SIZE; i++) {
            slots[i].classList.remove("background")
            slots[i].classList.remove("loop")
        }
        // removing the blinking and displaying the bonus round if won by user
        gameOutComeDiv?.classList.remove("blink-class")
        serverResponse.bonus && bonusDiv?.classList.remove("hide")
        let spinText = document.getElementsByClassName("spinText")!
        spinText[0].classList.remove("hide")
        // display the fetcted data
        displayData(
            serverResponse.slotMachine,
            serverResponse.playerWinType
        )
        // creating button element
        spinButton.disabled = false
    }, 2000)
}

const createSpinMachine = (parentDiv: HTMLElement): void => {
    // creating Element in DOM Element
    let slotValues = document.createElement("div")
    let winType = document.createElement("h3")
    let Title = document.createElement("h1")
    let bonusDiv = document.createElement("h2")
    //Adding the attributes class and id
    slotValues.setAttribute("id", SLOT_MACHINE)
    Title.setAttribute("class", "Title")
    winType.setAttribute("id", Win_Type_ID)
    bonusDiv.setAttribute("id", BONUS_DIV_ID)
    //Adding text
    bonusDiv.innerText = "You won a Bonus Spin"
    Title.innerText = "Welcome to the Slot Machine Game"
    //Adding classes
    bonusDiv.classList.add("hide")
    winType.classList.add("height-50")
    //Adding Elements to the document
    parentDiv.prepend(slotValues)
    parentDiv.prepend(bonusDiv)
    parentDiv.prepend(winType)
    parentDiv.prepend(Title)
}

const init = () => {
    //creating a parent div atttribute
    let parentEl = document.createElement("div")
    let errorDiv = document.createElement("h2")

    errorDiv.setAttribute("id", ERROR_DIV_ID)
    parentEl.setAttribute("id", PARENT_ID)

    //Calling inital functions
    spinButton(parentEl)
    createSpinMachine(parentEl)
    initialData(parentEl)

    //appending the div in DOM
    document.body.prepend(errorDiv)
    document.body.appendChild(parentEl)
}

const initialData = (parentDiv: HTMLElement): void => {
    // add initial array
    const slotMachine = parentDiv.querySelector("#slotMachine")!
    let slotMachineInitialValue = ""
    for (let i = 0; i < REEL_SIZE; i++) {
        slotMachineInitialValue += `<div id='slot${i + 1}'  class='slide a${
            INTIAL_REEL_VALUE[i]
        }'></div>`
    }
    slotMachine.innerHTML = slotMachineInitialValue
}

const spinButton = (parentDiv: HTMLElement): void => {
    //creating the button element
    let spinDiv = document.createElement("div")
    let spinButton = document.createElement("button")
    let spinText = document.createElement("h4")

    spinDiv.classList.add("center-align")
    spinButton.classList.add("button-img")
    spinButton.setAttribute("id", "spin-button")

    spinText.innerText = "click to start"
    spinText.classList.add(SPIN_BUTTON_TEXT_CLASS)
    // adding event listner to the spin button
    spinButton.addEventListener("click", spin)

    spinDiv.append(spinButton)
    spinDiv.appendChild(spinText)
    parentDiv.append(spinDiv)
}

const displayData = (displayData: Number[], winType: string): void => {
    const slotMachine = document.getElementById(SLOT_MACHINE)!
    const winTypeDiv = document.getElementById(Win_Type_ID)!

    let slotMachineInnerText = ""
    for (let i = 0; i < REEL_SIZE; i++) {
        slotMachineInnerText += `<div id=slot${i + 1} class='slide a${
            displayData[i]
        }' ></div>`
    }
    slotMachine.innerHTML = "" + slotMachineInnerText

    winTypeDiv.innerText = `${winType}`
}

init()
