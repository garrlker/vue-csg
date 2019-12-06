<script>
import Part from './Mixins/Part'
import Debug from 'debug'
const debug = Debug('ParentPart')

export default {
  name: 'Part',
  mixins: [Part],
  inject: [],
  methods: {
    setup () {}
  },
  mounted () {
    debug('ParentPart mounted', this.uuid)
    // this.$emit(`${this.uuid}-update-tree`);
    this.updateGeometry()
    // this.updateChildGeometry = geometry => debug("GEO", geometry);
    debug(this.$geometry)
  }
}
</script>
