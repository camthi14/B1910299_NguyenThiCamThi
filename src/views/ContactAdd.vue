<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
      message: "",
    };
  },

  methods: {
    async createContact(data) {
      try {
        await ContactService.create(data);
        this.message = "Liên hệ được thêm thành công.";
        setTimeout(this.$router.push("/"), 10000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div v-if="contact" class="page">
    <h4 class="text-center">Thêm Liên hệ</h4>
    <ContactForm :contact="contact" @submit:contact="createContact" />
    <p>{{ message }}</p>
  </div>
</template>
