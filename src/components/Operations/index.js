import Operation from '../Mixins/Operation';
import { booleanOps } from '@jscad/scad-api';
import { CSG } from "@jscad/csg";
import * as util from 'jscad-utils';
util.init.default(CSG)
console.log('bla ops', util);

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



