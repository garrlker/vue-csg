import uuid from './uuid'
import csgMixin from "../Mixins/csg";

export default {
  mixins: [uuid,csgMixin],
  data() {
    return {
      type: "operation"
    }
  },
  mounted(){
    this.emitCSG();
  }

}

