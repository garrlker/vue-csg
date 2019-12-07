<script>
import Part from './Mixins/Part'
import { CSG } from '@jscad/csg'
import Debug from 'debug'
const debug = Debug('ParentPart')

export default {
  name: 'Part',
  mixins: [Part],
  inject: [],
  methods: {
    generateGeometry: () => new CSG()
  },
  mounted () {
    debug('ParentPart mounted', this.uuid)
    // this.$emit(`${this.uuid}-update-tree`);
    this.updateGeometry()
    // this.updateChildGeometry = geometry => debug("GEO", geometry);
    debug("PART GEOMETRY", this.$geometry)
    this.$emit('geometry', this.$geometry);
  }
}
</script>
