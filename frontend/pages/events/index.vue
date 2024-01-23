<template>
  <div data-page="events">
    <EventsEventHeader @openDialog="openDialog" />
    <div class="container">
      <div class="row">
        <div
          :class="{ 'col-lg-6': isDialogOpen, 'col-lg-12': !isDialogOpen }"
          class="col-md-12 col-sm-12 pt-2"
        >
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto" >
              <!-- <EventsEmptyPage /> -->
              <EventsEventList />
            </div>
          </div>
        </div>
        <div v-if="isDialogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto" >
              <EventsAddEvent @closeDialog="closeDialog" />
              <!-- <EventsTestStepper  @closeDialog="closeDialog"/> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "main",
});
export default {
  data() {
    return {
      isDialogOpen: false,
    };
  },
  methods: {
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
};
</script>

<style scoped>
.contain {
}
</style>
