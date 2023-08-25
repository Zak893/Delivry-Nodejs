<template>
  <div v-if="userType != 'admin'">
    <h3 class="profile__name">Account</h3>
    <div class="account__info">
      <h2 class="account__title">Personal information</h2>
    
      <div class="account__action">
      
        <BaseButton
          v-if="isEditing"
          class="account__btns-discardBtn"
          @onClick="cancelEditing"
        >
          Cancel
        </BaseButton>

        <BaseButton
          v-else
          variant="primary-outline"
          @onClick="isEditing = true"
        >
          Change
        </BaseButton>
      </div>

      <div class="account__input">
        <BaseInput
          label="First name"
          placeholder="Jane"
          :value="formData.firstName"
          :error="errors.firstName"
          :disabled="!isEditing || isLoading"
          @onInput="(value) => changeField('firstName', value)"
        />

        <BaseInput
          label="Last name"
          placeholder="Robertson"
          :value="formData.lastName"
          :error="errors.lastName"
          :disabled="!isEditing || isLoading"
          @onInput="(value) => changeField('lastName', value)"
        />
        <div class="Delivery" v-if="userType === 'Del'">
        <BaseInput label="Siret" placeholder="803714100" :disabled="!isEditing || isLoading" :value="formData.deliveryService" :error="errors.deliveryService"
          @onInput="(value) => changeField('deliveryService', value)" />
        <BaseInput label="Poids Max" placeholder="120 kg" :disabled="!isEditing || isLoading" :value="formData.poids" :error="errors.poids"
          @onInput="(value) => changeField('poids', value)" />
      </div>

        <BaseInput
          label="Phone number"
          placeholder="+998 (99) 324-42-91"
          :value="formData.phoneNumber"
          :error="errors.phoneNumber"
          :disabled="!isEditing || isLoading"
          @onInput="(value) => changeField('phoneNumber', value)" 
        />
        <BaseInput
          label="New password"
          type="password"
          placeholder="***********"
          :value="formData.password"
          :error="errors.password"
          :showPassword="showPassword"
          :disabled="!isEditing || isLoading"
          @onPasswordToggle="showPasswordClick"
          @onInput="(value) => changeField('password', value)" 
        />
       
      </div>

    

      <div class="profile-form-divider"></div>

      <div class="account__btns">
        <div>
          <BaseButton
            v-if="isEditing"
            class="SaveBtn"
            @onClick="saveChangeClick"
            :loading="isLoading"
            >Save changes</BaseButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import axios from 'axios';
export default {
  name: "AccountPage",
  data() {
    return {
      showPassword: false,
      isEditing: false,
      isLoading: false,
      formData: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        deliveryService: "",
        poids: "",
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        deliveryService: "",
        poids: "",
      },
      userType: localStorage.getItem('userType'),
    };
  },
  computed: {
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapMutations({
      logoutUser: "auth/logout",
    }),
    initPage() {
      this.formData.firstName = localStorage.getItem('userFirst') || localStorage.getItem('delFirst') ;
      this.formData.lastName = localStorage.getItem('userLast') || localStorage.getItem('delLast') ;
      this.formData.email = localStorage.getItem('userEmail') || localStorage.getItem('delEmail') ;
      this.formData.phoneNumber = localStorage.getItem('userPhone') || localStorage.getItem('delPhone') ;
      this.formData.deliveryService = localStorage.getItem('delSiret');
      this.formData.poids = localStorage.getItem('delPoids');
    },
    showPasswordClick() {
      this.showPassword = !this.showPassword;
    },
    cancelEditing() {
      this.isEditing = false;
      this.initPage();
    },
    changeField(propertyName, value) {
      if (this.errors[propertyName] !== "") {
        this.errors[propertyName] = "";
      }

      this.formData[propertyName] = value;
      this.formData.emailNotifications[propertyName] = value;
    },
    async saveChangeClick() {
      try {
        if (localStorage.getItem('userType') === 'User') {
          const response = await axios.post('http://localhost:5000/user/update', {
            password : this.formData.password,
          email: localStorage.getItem('userEmail'),
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          phoneNumber: this.formData.phoneNumber,
        });      
         
          const userData = response.data.user;
          localStorage.setItem('userFirst', this.formData.firstName);
          localStorage.setItem('userLast', this.formData.lastName);
          localStorage.setItem('userPhone', this.formData.phoneNumber);
          localStorage.setItem('userType', 'User');
          this.$router.push({ path: '/profile' });
         }

        else {
          const response = await axios.post('http://localhost:5000/delivry/update', {
            password : this.formData.password,
          email: localStorage.getItem('delEmail'),
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          phoneNumber: this.formData.phoneNumber,
          deliveryService: this.formData.deliveryService,
          poids: this.formData.poids,
        });   
          localStorage.setItem('delEmail', this.formData.email);
          localStorage.setItem('delFirst', this.formData.firstName);
          localStorage.setItem('delLast', this.formData.lastName);
          localStorage.setItem('delPhone', this.formData.phoneNumber);
          localStorage.setItem('delSiret', this.formData.deliveryService);
          localStorage.setItem('delPoids', this.formData.poids);
          localStorage.setItem('userType', 'Del');
          this.$router.push({ path: '/profile' });
           }

      } catch (error) {
        console.error(error);
      }
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.isEditing = false;
      }, 2500);
    },
    logout() {
      this.logoutUser();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.account {
  &__info {
    background: $color-white;
    border: 1px solid $color-grey-lightest;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
    // height: 100vh;
  }

  &__title {
    font-family: $base-font;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.1px;
    margin-bottom: 16px;
    color: $color-dark;
  }

  &__text {
    font-family: $base-font;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 8px;
    color: $color-grey-dark;
  }

  &__action {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &__img {
    cursor: pointer;
    border-radius: 12px;
    margin-right: 24px;
    width: 76px;
    height: 76px;
  }

  &__input {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 15px;
  }

  &__btns {
    display: flex;
    justify-content: space-between;

    &-discardBtn {
      margin-right: 16px;
    }

    .SaveBtn {
      min-width: 120px;
    }
  }
}

.profile-notifications {
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 16px;
    margin-bottom: 36px;
  }
}

.profile-form-divider {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 1px;
  width: 100%;
  background-color: $color-grey-light;
}

@media screen and (max-width: 768px) {
  .account {
    &__input {
      grid-template-columns: 1fr;
    }

    &__btns {
      flex-direction: column;

      div {
        &:nth-child(2) {
          display: flex;
          justify-content: space-between;
        }

        button {
          width: 100%;
        }
      }

      &-dangerBtn {
        margin-bottom: 40px;
      }
    }
  }

  .profile-notifications {
    &__wrapper {
      grid-template-columns: 1fr;
    }
  }
}
</style>
