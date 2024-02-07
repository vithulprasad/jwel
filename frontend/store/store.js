import { defineStore } from "pinia";
import { ref } from "vue";

export const store = defineStore("store", () => {
  const formValue = ref({
    eventName: "",
  });
  const createForm=(data)=>{
    console.log(data,"")

  }
  return {
    formValue,createForm
  };
});
