<script>
// import uuid from './Mixins/uuid'
import { CSG } from '@jscad/csg'
import Debug from 'debug'
const debug = Debug('ParentPart')
import { booleanOps } from '@jscad/scad-api';
var union = booleanOps.union;

export default {
  name: 'Part',
  // mixins: [uuid],
  provide() {
    return {
      ParentPartReady: new Promise(res => res())
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addPrimitive(childId, geometry){
      debug(`Add Primitive: childID ${childId} - geometry ${geometry}`)
      // if(geometry === undefined)
        // return;
      // verbose(`Add Primitive - Self-ID: ${this.uuid} Child-ID: ${childId} Geometry: ${geometry}`)
      debug("Child Prim", this.$childPrimitives)
      this.$childPrimitives[childId] = geometry
      console.log("CHILDREN", this.$childPrimitives);
      if(this.$childPrimitives.length > 1) {
        let geometry = union(...this.$childPrimitives);
        this.$parent.setGeometry(geometry);
      }
      // this.updateGeometry();
      
    },
    deletePrimitive(childId){
      this.$childPrimitives[childId] = undefined;
    },
    updateGeometry () {
      debug(`Update Geometry - ID: ${this.uuid}`)
      // Ask our children to update their geometry and emit it to us
      // EventBus.$emit(`${this.uuid}-update-tree`)

        // Temp
        // this.$geometry = this.generateGeometry(this.$attrs)

        // debug("GEO CHANGE", this.$geometry);

        // Combine child primitives
        debug("Union Children", this.$geometry, ...this.$childPrimitives);
        this.$geometry = union(this.$geometry, ...this.$childPrimitives);
      debug("Update Primitive: Child-ID", this.uuid, this.$parent);
      if (this.$parent.addPrimitive) { this.$parent.addPrimitive(this.uuid, this.$geometry) }
    }
  },
  created() {
    // debug('ParentPart created', this.uuid)
    this.$childPrimitives = [];
  },
  mounted () {
    // debug('ParentPart mounted', this.uuid)
    // this.$emit(`${this.uuid}-update-tree`);
    // this.updateGeometry()
    // this.updateChildGeometry = geometry => debug("GEO", geometry);
    // debug("PART GEOMETRY", this.$geometry)
    // this.$emit('geometry', this.$geometry);
    this.$childPrimitives = [];
  },
  render (createElement) {
    return createElement('div', this.$slots.default)
  }
}
</script>
