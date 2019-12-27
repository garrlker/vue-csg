<template>
  <div id="app">
    <viewer>
      <union>
        <subtract>
          <cube :size="3" :center="true" />
          <sphere :r="2" :center="true" />
        </subtract>
        <intersect>
          <sphere :r="1.3" :center="true" />
          <cube :size="2.1" :center="true" />
        </intersect>
      </union>
    </viewer>
  </div>
</template>

<script>
import Viewer from "./components/Viewer/Viewer";
import * as VueCSG from "./index";
export default {
  name: "app",
  components: {
    Viewer,
    ...VueCSG
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  height: 100vh;
}
</style>
