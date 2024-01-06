<template>
  <div class="container login-form">
    <h1 class="heading">Welcome to Let’s Legislative!</h1>
    <p class="tag-line">
      Let's make democracy accessible, intuitive, and engaging together. Your
      seat at the legislative table awaits
    </p>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Enter password"
        />
      </div>
      <div class="mb-3 form-check">
        <div style="flex: 1">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1"
            >Remember me</label
          >
        </div>

        <a class="forgot-password" href="">Forgot Password?</a>
      </div>
      <button type="submit" class="btn btn-primary login-button">Login</button>
    </form>
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
.login-form {
  width: 33rem;
  height: 27rem;
}
.tag-line {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #4b5b8a;
}
.heading {
  font-size: 2rem;
  font-weight: 700;
  line-height: 3rem;
  color: #041a5e;
}
.form-label {
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1rem;
}
.form-check-label {
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1rem;
}
.form-check {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.forgot-password {
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1rem;
  text-decoration: none;
}
.login-button {
  width: 100%;
}
</style>
