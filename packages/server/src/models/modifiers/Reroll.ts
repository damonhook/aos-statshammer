import { Characteristic as C } from 'common'
import BaseModifier from './BaseModifier'

export default class Reroll extends BaseModifier {
  static displayName = 'Reroll'
  static description = 'Reroll rolls for {characteristic}'
  static availableCharacteristics = [C.TO_HIT, C.TO_WOUND]
}
