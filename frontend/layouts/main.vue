<template>
  <div class="col-lg-12 col-md-12 col-sm-12 pt-2" >
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-10 mx-auto">
        <Header />
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
  body{
    background-color: #F8F9FB !important;
  }
</style>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {},
};
</script>
