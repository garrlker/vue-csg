<script>
export default {
  name: 'Entity',
  props: {
    msg: String
  },
  mounted () {
    console.log(`${this.msg} Parent`, this.$parent.msg)
    console.log(`${this.msg} Children`, this.$children)
  },
  render (createElement) {
    return createElement('div', this.$slots.default)
  }
  // inject: {

  // },
  // provide() {

  // }
}
</script>
