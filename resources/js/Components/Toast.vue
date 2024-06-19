<!-- resources/js/Components/Toast.vue -->
<template>
    <transition name="fade">
      <div v-if="visible" class="toast" :class="type" @click="hideToast">
        <p>{{ message }}</p>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        type: 'success', // success, error, info
      };
    },
    methods: {
      showToast(message, type = 'success') {
        this.message = message;
        this.type = type;
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 3000); // Hide after 3 seconds
      },
      hideToast() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px;
    border-radius: 5px;
    color: white;
    font-size: 16px;
  }
  .toast.success {
    background-color: #28a745;
  }
  .toast.error {
    background-color: #dc3545;
  }
  .toast.info {
    background-color: #17a2b8;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  