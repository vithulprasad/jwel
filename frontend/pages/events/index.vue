<template>
  <!-- <div class="container-lg contain mt-4">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <EventsEventHeader />
        <EventsEmptyPage />
        <EventsEventList/>
      </div>
      <div class="col-1"></div>
    </div>
  </div> -->
  <EventsEventHeader />
  <EventsEmptyPage />
</template>

<script lang="ts">
definePageMeta({
  layout: "event-layout",
});
</script>

<style scoped>

.contain {
}
</style>
