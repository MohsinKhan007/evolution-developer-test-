import express from "express"
import cors from "cors"
import { GameOutcome } from "../shared/GameOutcome"
import SlotMachine from "./SlotMachineClass"
import { BONUS_PERCENTAGE, PORT } from "../constants/constants"

const app = express()

app.use(cors())

app.post("/spin", (req, res) => {
    res.setHeader("Content-Type", "application/json")

    let slotClass = new SlotMachine()

    let sendingObject: GameOutcome = {
        slotMachine: slotClass.getReels(),
        bonus: slotClass.getBonusFeature(BONUS_PERCENTAGE),
        playerWinType: slotClass.getWinType(),
    }

    res.send(JSON.stringify(sendingObject))
})

app.listen(PORT)
