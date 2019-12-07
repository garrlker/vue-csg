import uuid from './uuid'
import EventBus from '../lib/EventBus'
import { CSG } from '@jscad/csg'
import Debug from 'debug'
const debug = Debug('Part')
const verbose = Debug('Part:Verbose')

export default {
  mixins: [uuid],
  provide () {
    return {
      parentId: this.uuid,
      updateGeometryCB: this.updateChildGeometry
    }
  },
  inject: ['parentId', 'updateGeometryCB'],
  methods: {
    updateChildGeometry (primitiveId, geometry) {
      verbose(`Update Child Geometry - ID: ${this.uuid} ChildID: ${primitiveId} Geometry: ${geometry}`)
      this.$childGeometries[primitiveId] = geometry
    },
    updateGeometry () {
      debug(`Update Geometry - ID: ${this.uuid}`)
      // Ask our children to update their geometry and emit it to us
      EventBus.$emit(`${this.uuid}-update-tree`)

        // Temp
        this.$geometry = this.generateGeometry(this.$attrs)

        debug("GEO CHANGE", this.$geometry);
        // Combine child primitives
        if(Object.keys(this.$childGeometries).length){
          let leafGeometries = new CSG()
          Object.keys(this.$childGeometries).forEach(childId => {
            leafGeometries = leafGeometries.union(this.$childGeometries[childId])
          })
    
          // Combine our child geometry with our own
          this.$geometry = this.$geometry.union(leafGeometries)
        }

      if (this.updateGeometryCB) { this.updateGeometryCB(this.uuid, this.$geometry) }
    }
  },
  // Very simple way to do this for now. Wont work child component amounts change
  async mounted () {
    debug(`Mounted - ID: ${this.uuid}`, 'Size: ', this.size)
    // Don't put this is data, we don't want it reactive
    this.$childGeometries = {}
    this.$geometry = new CSG()

    if (this.parentId) {
      debug('I have a parent!', this.parentId)

      // Listen to our parent for update requests
      EventBus.$on(`${this.parentId}-update-tree`, this.updateGeometry)
      debug(`Child ${this.uuid} registered to ${this.parentId}-update-tree`)
    }
  },
  render (createElement) {
    return createElement('div', this.$slots.default)
  }
}
