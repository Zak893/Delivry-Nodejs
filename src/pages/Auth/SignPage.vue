<template>
  <form class="signUp" @submit.prevent="register">
    <h1 class="signUp__name" style="display : flex;">
      Sign Up As
      <span :class="{ 'signUp_option': true, 'selected-option': selectedOption === 'Client' }"
        @click="selectedOption = 'Client'">
        Client
      </span>
      <span :class="{ 'signUp_option': true, 'selected-option': selectedOption === 'Delivery' }"
        @click="selectedOption = 'Delivery'">
        Delivery
      </span>

    </h1>
    <BaseAlert v-if="!!serverError" class="signUp__alert" variant="danger" :message="serverError" />

    <BaseAlert v-if="!!serverSuccess" class="signUp__alert" variant="success" :message="serverSuccess" />

    <div class="signUp__userInfo">
      <BaseInput label="First Name" placeholder="First Name" :value="formData.firstName" :error="errors.firstName"
        @onInput="(value) => changeField('firstName', value)" />
      <BaseInput label="Last Name" placeholder="Last Name" :value="formData.lastName" :error="errors.lastName"
        @onInput="(value) => changeField('lastName', value)" />
    </div>
    <BaseInput label="Email" placeholder="name@example.com" :value="formData.email" :error="errors.email"
      @onInput="(value) => changeField('email', value)" />
    <BaseInput label="Phone number" placeholder="+998 (99) 324-42-91" :value="formData.phoneNumber"
      :error="errors.phoneNumber" @onInput="(value) => changeField('phoneNumber', value)" />
    <div class="Delivery" v-if="selectedOption === 'Delivery'">
      <BaseInput label="Siret" placeholder="803714100" :value="formData.deliveryService" :error="errors.deliveryService"
        @onInput="(value) => changeField('deliveryService', value)" />
      <BaseInput label="Poids Max" placeholder="120 kg" :value="formData.poids" :error="errors.poids"
        @onInput="(value) => changeField('poids', value)" />
    </div>
    <BaseInput class="signUp__baseInput" label="Password" placeholder="min. 8 characters" :value="formData.password"
      type="password" :showPassword="showPassword" :error="errors.password" @onPasswordToggle="showPasswordClick"
      @onInput="(value) => changeField('password', value)" />

    <BaseButton variant="primary" class="signUp__baseBtn" @click="register" :loading="isLoading">
      Register
    </BaseButton>
    <p class="signUp__text">
      Do you want to out ?
      <router-link to="/auth/login" class="signUp__link"> Login </router-link>
    </p>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: "SignPage",
  data() {
    return {
      isLoading: false,
      showPassword: false,
      serverError: "",
      serverSuccess: "",
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        deliveryService: "",
        poids: "",

      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        deliveryService: "",
        poids: "",
      },
      selectedOption: "Client"
    };
  },

  methods: {
    showPasswordClick() {
      this.showPassword = !this.showPassword;
    },
    changeField(propertyName, value) {
      if (this.errors[propertyName] !== "") {
        this.errors[propertyName] = "";
      }
      this.formData[propertyName] = value;
    },

    validateForm() {
      let isValid = true;

      if (!this.formData.firstName) {
        this.errors.firstName = "Le prénom est obligatoire.";
        isValid = false;
      } else {
        this.errors.firstName = "";
      }

      if (!this.formData.lastName) {
        this.errors.lastName = "Le nom de famille est obligatoire.";
        isValid = false;
      } else {
        this.errors.lastName = "";
      }

      if (!this.formData.email) {
        this.errors.email = "L'adresse e-mail est obligatoire.";
        isValid = false;
      } else {
        this.errors.email = "";
      }

      if (!this.formData.phoneNumber) {
        this.errors.phoneNumber = "Le numero est obligatoire.";
        isValid = false;
      } else {
        this.errors.phoneNumber = "";
      }

      if (!this.formData.password) {
        this.errors.password = "Le mdp est obligatoire.";
        isValid = false;
      } else {
        this.errors.password = "";
      }
      if (this.selectedOption === "Delivery") {
        if (!this.formData.deliveryService) {
          this.errors.deliveryService = "La siret est obligatoire.";
          isValid = false;
        } else {
          this.errors.deliveryService = "";
        }

        if (!this.formData.poids) {
          this.errors.poids = "Le poids est obligatoire.";
          isValid = false;
        } else {
          this.errors.poids = "";
        }
      }
      return isValid;
    },
    async register() {
      this.isLoading = true;

      if (!this.validateForm()) {
        this.isLoading = false;
        return;
      }

      try {
        if (this.selectedOption === "Client") {
          const response = await axios.post('/user/create', this.formData);
        }
        else {
          const response = await axios.post('/delivry/create', this.formData);
        }
        this.isLoading = false;
        this.serverSuccess = "Utilisateur enregistré avec succès!";
        // Réinitialiser le formulaire ou rediriger vers une autre page si nécessaire
      } catch (error) {
        this.isLoading = false;
        this.serverError = "Erreur lors de l'enregistrement de l'utilisateur.";
        console.error(error);
      }

    },
  },
};
</script>

<style lang="scss">
.signUp {
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  &__alert {
    margin-bottom: 16px;
  }

  &__name {
    color: $color-dark;
    font-size: 32px;
    font-family: $base-font;
    margin-bottom: 40px;
    font-weight: 700;
    letter-spacing: 0.1px;
  }

  &__userInfo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 10px;
  }

  &__baseInput {
    margin-bottom: 28px !important;
  }

  &__baseBtn {
    width: 100%;
    margin-bottom: 35px;
  }

  &__text {
    color: $color-dark;
    font-family: $base-font;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }

  &__link {
    font-size: 14px;
    color: $color-primary;
  }

  &_option {
    color: #4E60FF;
    border: solid;
    margin: 0 12px;
    cursor: pointer;
    padding: 5px;
    align-self: center;
    font-size: initial;
  }
}

.selected-option {
  /* Styles for selected option */
  background-color: cornflowerblue;
  ;
  /* Change to the desired background color */
  color: white;
  /* Change to the desired text color */
}

@media screen and (max-width: 768px) {
  .signUp {
    width: 95%;
  }
}
</style>
