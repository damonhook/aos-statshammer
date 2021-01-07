import { Characteristic as C } from 'common'
import BaseModifier from './BaseModifier'

export default class RerollFailed extends BaseModifier {
  static displayName = 'Reroll Failed'
  static description = 'Reroll Failed rolls for {characteristic}'
  static availableCharacteristics = [C.TO_HIT, C.TO_WOUND]
}
