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
    generateGeometry (attrs) {
      // this.$geometry = CSG.cube({ size: this.size, center: this.center })
      debug('CUBE', attrs)
      return CSG.cube(attrs)

      // if (this.$attrs.size) { 
      //   var scalar;
      //   var size = this.$attrs.size;

      //   this.$geometry = this.$geometry.scale(this.$attrs.size) 
      //   debug(`Scale Size Set ${this.$attrs.size}`)
      // }

      // if(this.$attrs.pos){
      //   this.$geometry = this.$geometry.translate([this.$attrs.pos[0], this.$attrs.pos[1], this.$attrs.pos[2]])
      // }

      // debug('Cube Geometry', this.uuid, this.$geometry)
      // this.$emit('geometry', this.$geometry)
      // console.log('Emitted own geometry', this.size, this.$geometry)
    }
  }
}
</script>
