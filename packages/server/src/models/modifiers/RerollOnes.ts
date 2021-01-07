import { Characteristic as C } from 'common'
import BaseModifier from './BaseModifier'

export default class RerollOnes extends BaseModifier {
  static displayName = 'Reroll Ones'
  static description = 'Reroll Ones for {characteristic}'
  static availableCharacteristics = [C.TO_HIT, C.TO_WOUND]
}
