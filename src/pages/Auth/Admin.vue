<template>
  <div class="login">
    <h1 class="signUp__name" style="display : flex;">Login As 
 <span
   style=" color: blue;
    margin-left: 15px;"
      >
         Admin
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
      @onClick="login"
      :loading="isLoading"
    >
      Login
    </BaseButton>

  
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AdminPage",
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
    async login() {
      
        try{  const response = await axios.post('http://localhost:5000/admin/login', {
          email: this.formData.email,
          password: this.formData.password,
        });      
        if (response.data.success) {
           localStorage.setItem('userType','admin')
          this.$router.push({ path: '/profile' });
        } else {
          this.serverError = 'Invalid email or password';
        }  }

       
        

      catch (error) {
        console.error(error);
      }
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
