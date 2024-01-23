<template>
  <div  >
    <!-- Other content above the form -->

    <div class="form-container">
      <form>
        <!-- Text field -->
        <div class="form-group">
          <label for="textInput">Text Input:</label>
          <input type="text" class="form-control" id="textInput" />
        </div>

        <!-- Calendar -->
        <!-- (Include your calendar component here) -->

        <!-- Dropdown -->
        <div class="form-group">
          <label for="dropdownSelect">Dropdown:</label>
          <select class="form-control" id="dropdownSelect">
            <!-- Dropdown options -->
          </select>
        </div>

        <!-- Radio button -->
        <div class="form-check">
          <input type="radio" class="form-check-input" id="radioOption1" name="radioGroup" />
          <label class="form-check-label" for="radioOption1">Option 1</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" id="radioOption2" name="radioGroup" />
          <label class="form-check-label" for="radioOption2">Option 2</label>
        </div>

        <!-- File upload -->
        <div class="form-group">
          <label for="fileUpload">File Upload:</label>
          <input type="file" class="form-control-file" id="fileUpload" />
        </div>

        <!-- Add more form fields as needed -->

      </form>

     
    </div>
  </div>
</template>

<script>
export default {
  // Component logic
};
</script>

<style scoped>
.form-container {
  max-height: 400px; 
  overflow-y: auto; 
  padding: 15px; 
}
</style>
