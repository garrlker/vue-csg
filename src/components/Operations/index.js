import Operation from '../Mixins/Operation';
import { booleanOps } from '@jscad/scad-api';
console.log('bla ops', booleanOps);

const prepareOperation = fn => ({
  mixins: [Operation],
  methods:{
    applyOperation: fn
  }
});

// export const Union = prepareOperation('union');
export const Union = prepareOperation(booleanOps.union);
export const Subtract = prepareOperation(booleanOps.difference);
export const Intersect = prepareOperation(booleanOps.intersection);
export const Hull = prepareOperation('hull');



