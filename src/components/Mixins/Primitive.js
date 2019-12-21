import uuid from './uuid'
import csgMixin from "../Mixins/csg";

export default {
  mixins: [uuid, csgMixin],
  data() {
    return {
      type: "primitive"
    }
  },
  mounted(){
    this.$geometry = this.generateCSG(this.$attrs);
    console.log(`${this.uuid} - Mounted geometry`, this.$geometry, this.$childPrimitives, this.$attrs);
    this.emitCSG();
  }
}
