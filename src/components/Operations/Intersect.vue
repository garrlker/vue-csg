<script>
import Operation from '../Mixins/Operation'
import uuid from '../Mixins/uuid'
import csgMixin from '../Mixins/csg'
import { booleanOps } from '@jscad/scad-api'
// export const Union = prepareOperation(booleanOps.union)
// export const Subtract = prepareOperation(booleanOps.difference)

export default {
  name: "Intersect",
  mixins: [Operation, csgMixin, uuid],
  data () {
    return {
      type: 'operation'
    }
  },
  methods: {
    applyOperation: booleanOps.intersection
  },
  mounted () {
    this.emitCSG()
  }
};
</script>
