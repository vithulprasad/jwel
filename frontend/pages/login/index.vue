<template>
  <!-- <div class="login-page-container">
    <LoginSelfie />
    <LoginForm />
  </div> -->
  <!-- <div class="container">
    <div class="row">
      <div class="col-6">
        <LoginSelfie />
      </div>
      <div class="col-6">
        <LoginForm />
      </div>
    </div>
  </div> -->
  <div class="container-lg">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <LoginSelfie />
      </div>
      <div
        class="col-sm-12 col-md-6"
        style="display: flex; align-items: center"
      >
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
/* .login-page-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
} */
</style>
