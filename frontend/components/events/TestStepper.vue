<template>
  <div>
    <form-wizard color="#C8CEE2" @on-complete="onComplete">
      <tab-content title="Personal details"> <EventsTestForm /> </tab-content>
      <tab-content title="Additional Info"> My second tab content </tab-content>
      <!-- <tab-content title="Last step" >
      Yuhuuu! This seems pretty damn simple
    </tab-content> -->
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue3-form-wizard";
// import 'vue3-form-wizard/dist/style.css'
export default {
  components: {
    FormWizard,
    TabContent,
  },
  methods: {
    onComplete() {
      alert("Yay. Done!");
    },
  },
};
</script>
