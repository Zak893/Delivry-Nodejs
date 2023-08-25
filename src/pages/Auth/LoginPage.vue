<template>
  <div class="login">
    <h1 class="signUp__name" style="display : flex;">Login As
 <span
        :class="{ 'signUp_option': true, 'selected-option': selectedOption === 'Client' }"
        @click="selectedOption = 'Client'"
      >
        Client
      </span>
      <span
        :class="{ 'signUp_option': true, 'selected-option': selectedOption === 'Delivery' }"
        @click="selectedOption = 'Delivery'"
      >
        Delivery
      </span>

</h1>
  
    <BaseAlert
      v-if="!!serverError"
      class="login__alert"
      variant="danger"
      :message="serverError"
    />

    <BaseAlert
      v-if="!!serverSuccess"
      class="login__alert"
      variant="success"
      :message="serverSuccess"
    />
    <!-- ========Base inputs========= -->
    <form class="" @submit.prevent="login">
    <BaseInput
      label="Email"
      type="email"
      placeholder="name@example.com"
      :value="formData.email"
      :error="errors.email"
      @onInput="(value) => changeField('email', value)"
    />

    <BaseInput
      class="login__baseInput"
      label="Password"
      type="password"
      placeholder="min.8 characters"
      :value="formData.password"
      :showPassword="showPassword"
      :error="errors.password"
      @onPasswordToggle="showPasswordClick"
      @onInput="(value) => changeField('password', value)"
    />
  
    <!-- ===========Base button========== -->
    <BaseButton
      variant="primary"
      class="login__baseBtn"
      @click="login"
      :loading="isLoading"
    >
      Login
    </BaseButton>
  </form>



    <div class="login__subText">
      <p>
        Don`t have an account?<router-link to="/auth/sign" class="login__link">
          Sign up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      isLoading: false,
      showPassword: false,
      serverError: "",
      serverSuccess: "",
      formData: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
      selectedOption: "Client",
      users: []
    };
  },
  methods: {
  
    showPasswordClick() {
      this.showPassword = !this.showPassword;
    },

   async login() {
      try {
        if (this.selectedOption === "Client") {
          const response = await axios.post('http://localhost:5000/user/login', {
          email: this.formData.email,
          password: this.formData.password,
        });      
        if (response.data.success) {
          const userData = response.data.user;
          localStorage.setItem('userEmail', this.formData.email);
          localStorage.setItem('userFirst', userData.firstName);
          localStorage.setItem('userLast', userData.lastName);
          localStorage.setItem('userPhone', userData.phoneNumber);
          localStorage.setItem('userType', 'User');
          this.$router.push({ path: '/profile' });
        } else {
          this.serverError = 'Invalid email or password';
        }  }

        else {
          const response = await axios.post('http://localhost:5000/delivry/login', {
          email: this.formData.email,
          password: this.formData.password,
        });   
        console.log(response.data);
        if (response.data.success && response.data.user.active == 1) {
          const userData = response.data.user;
          localStorage.setItem('delEmail', this.formData.email);
          localStorage.setItem('delPass', this.formData.password);
          localStorage.setItem('delFirst', userData.firstName);
          localStorage.setItem('delLast', userData.lastName);
          localStorage.setItem('delPhone', userData.phoneNumber);
          localStorage.setItem('delSiret', userData.deliveryService);
          localStorage.setItem('delPoids', userData.poids);
          localStorage.setItem('userType', 'Del');
          this.$router.push({ path: '/profile' });
        } else {
          this.serverError = 'Invalid delivry';
        }     }

      } catch (error) {
        console.error(error);
      }
    },


    changeField(propertyName, value) {
      if (this.errors[propertyName] !== "") {
        this.errors[propertyName] = "";
      }
      this.formData[propertyName] = value;
    },
    
  },
};
</script>

<style lang="scss">
/* FORM*/
.login {
  width: 50%;
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
    line-height: 82px;
    font-family: $base-font;
    font-weight: 700;
    letter-spacing: 0.1px;
  }
  &__text {
    display: none;
  }

  &__baseInput {
    margin-bottom: 28px !important;
  }

  &__baseCheckbox {
    margin-bottom: 40px;
  }

  &__baseBtn {
    width: 100%;
    margin-bottom: 35px;
  }

  &__forgotLink {
    color: $color-primary;
    display: block;
    font-family: $base-font;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 110px;
    &:hover {
      color: $color-primary;
    }
  }

  &__subText {
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
}
.signUp_option {
    color: #4E60FF;
    border: solid;
    margin: 0 12px;
    cursor: pointer;
    padding: 5px;
    align-self: center;
    font-size: initial;
}

@media screen and (max-width: 768px) {
  .login {
    transform: translateX(-50%) translateY(-40%);
    width: 95%;

    &__name {
      font-size: 60px;
    }

    &__text {
      display: block;
      color: $color-grey-dark;
      font-family: $base-font;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 45px;
      line-height: 20px;
      letter-spacing: 0.1px;
    }

    &__link {
      padding-bottom: 32px;
    }
  }
  .selected-option {
  /* Styles for selected option */
  background-color: cornflowerblue;; /* Change to the desired background color */
  color: white; /* Change to the desired text color */
}

}
</style>
