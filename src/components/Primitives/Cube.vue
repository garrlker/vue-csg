<script>
import Part from '../Mixins/Part'
import { CSG } from '@jscad/csg'
import Debug from 'debug'
const debug = Debug('Cube')

export default {
  name: 'Cube',
  mixins: [Part],
  props: {
  },
  methods: {
    setup () {
      // this.$geometry = CSG.cube({ size: this.size, center: this.center })
      debug('CUBE', this.$attrs)
      this.$geometry = CSG.cube(this.$attrs)
      if (this.$attrs.size) { this.$geometry.scale(this.$attrs.size) }

      debug('Cube Geometry', this.uuid, this.$geometry)
      // this.$emit('geometry', this.$geometry)
      // console.log('Emitted own geometry', this.size, this.$geometry)
    }
  }
}
</script>
