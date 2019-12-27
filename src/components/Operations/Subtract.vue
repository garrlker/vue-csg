<script>
import Operation from '../Mixins/Operation'
import uuid from '../Mixins/uuid'
import csgMixin from '../Mixins/csg'
import { booleanOps } from '@jscad/scad-api'

export default {
  name: "Subtract",
  mixins: [Operation, csgMixin, uuid],
  data () {
    return {
      type: 'operation'
    }
  },
  methods: {
    applyOperation: booleanOps.difference
  },
  mounted () {
    this.emitCSG()
  }
};
</script>
