/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {RTTest}
 */
import { RTTest } from "./test.mjs";
export class RTWeaponTest extends RTTest {
      get template() {
        return "systems/roguetrader/templates/chat/roll/test/weapon-test.html"
      }
}