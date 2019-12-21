import uuid from './uuid'
import { booleanOps } from '@jscad/scad-api';
var { union } = booleanOps;
import Debug from 'debug'
const debug = Debug('CSG')

export default {
  mixins: [uuid],
  provide() {
    return {
      outputCSGtoParent: this.receiveChildCSG,
      parentType: this.type,
      register: this.incrementChildren,
      unregister: this.decrementChildren
    }
  },
  inject: {
    outputCSGtoParent: {
      default: () => function(){}
    },
    parentType: {
      default: "primitive"
    },
    register: {
      default: () => function(){}
    },
    unregister: {
      default: () => function(){}
    },
  },
  data() {
    return {
      isReady: false,
      childID: 0,
      numberOfChildren: 0,
      type: "primitve"
    }
  },
  watch: {
    $attrs(){
      console.log("Attrs changed");
      if(this.type === "primitive"){
        console.log("Generating CSG");
        this.$geometry = this.generateCSG(this.$attrs);
        console.log(this.$geometry, this.$attrs);
        this.emitCSG();  
      }
    }
  },
  methods: {
    buildOutputCSG(){
      debug(`BUILD OUTPUT CSG - ID: ${this.uuid} #Children: ${this.$childPrimitives.length} ${this.numberOfChildren}`);    
      var outputCSG;
  
      if(this.numberOfChildren > 0){
        if(this.$childPrimitives.length >= this.numberOfChildren){
          switch(this.type) {
            case "operation":
              outputCSG = this.applyOperation(this.$childPrimitives);
              break;
            case "transform":
              outputCSG = this.applyTransform(this.$attrs.xform, this.$childPrimitives[0]);
              break;
            default:
              // Assume we're a primitive
              outputCSG = union(...this.$childPrimitives, this.$geometry || []);
            } 
        }
      }else{
        // We have 0 children
        outputCSG = this.$geometry;
      }

      return outputCSG;
    },
    emitCSG(){
      var outputCSG = this.buildOutputCSG();
      this.$emit('csg', outputCSG);

      if(this.outputCSGtoParent){
        this.outputCSGtoParent(this.childID, outputCSG);
      }
    },
    receiveChildCSG(childID, childGeometry){
        debug(`${this.uuid} caching child primitive`);
        this.$childPrimitives[childID] = childGeometry;

        if(this.isReady){
          this.emitCSG();
        }
    },
    incrementChildren() {
      this.numberOfChildren += 1;
      debug(`Increment children of Primitive ${this.uuid} to ${this.numberOfChildren}`);

      return this.numberOfChildren - 1;
    },
    decrementChildren(childId) {
      this.$childPrimitives[childId] = undefined;
      this.numberOfChildren -= 1;
      debug(`Decrement children of Primitive ${this.uuid} to ${this.numberOfChildren}`);
    },
  },
  beforeCreate() {
    this.isReady = new Promise(resolve => {
      this.resolvePart = resolve;
    });
  },
  created(){
    debug("UUID - Created", this.uuid);

    // Instantiate Variables
    this.$childPrimitives = [];

    // Register with parent
    if(this.register)
      this.childID = this.register();

  },
  beforeDestroy(){
    if(this.unregister)
      this.unregister(this.childID);
  },
  
  async mounted () {
    debug("UUID - Mounted", this.uuid);
    this.isReady = true;
  },
  render (createElement) {
    return createElement('div', this.$slots.default)
  }
}
