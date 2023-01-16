import { randomGenerator } from "./serverFunctions"
import { ISlotMachine } from "../shared/GameOutcome"
import {
    GAME_OUTCOMES,
    RANDOM_NUMBER_RANGE,
    REEL_SIZE,
} from "../constants/constants"

class SlotMachine implements ISlotMachine {
    private reels: number[]
    private winType: string
    private bonusFeature: boolean

    constructor() {
        this.reels = []
        this.winType = ""
        this.bonusFeature = false
        this.reels = this.randamoizeReel()
    }

    public setReels = (newReelValues: number[]) => {
        this.reels = [...newReelValues]
    }

    public getReels = () => {
        return this.reels
    }

    public getWinType = () => {
        const finalCount = this.calculateFinalCount()

        switch (finalCount) {
            case 1:
                this.winType = GAME_OUTCOMES.BIG_WIN
                break
            case 2:
                this.winType = GAME_OUTCOMES.SMALL_WIN
                break
            case 3:
                this.winType = GAME_OUTCOMES.NO_WIN
                break
            default:
                this.winType = GAME_OUTCOMES.NO_WIN
                break
        }

        return this.winType
    }

    public getBonusFeature = (percentage: number) => {
        this.bonusFeature = Math.random() < percentage / 100
        return this.bonusFeature
    }

    private randamoizeReel = () => {
        const array = [...this.reels]
        return [...Array(REEL_SIZE)].map(
            (_, index) =>
                (array[index] = randomGenerator(RANDOM_NUMBER_RANGE))
        )
    }

    private calculateFinalCount = () => {
        return new Set([...this.reels]).size
    }
}

export default SlotMachine
