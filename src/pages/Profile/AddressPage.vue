<template>
  <div>
    <h3 class="profile__name">Address</h3>
    <div class="account__info">
      <h2 class="account__title">shipping address</h2>
    
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
          label="address"
          placeholder="7 rue saint-lazare"
          :value="formData.address"
          :error="errors.address"
          :disabled="!isEditing || isLoading"
          @onInput="(value) => changeField('address', value)"

        />

        <BaseInput
          label="Ville"
          placeholder="Paris"
          :value="formData.Ville"
          :error="errors.Ville"
          :disabled="!isEditing || isLoading"
          @onInput="(value) => changeField('Ville', value)"
        />

        <BaseInput
          label="complement of address"
          placeholder="deuxiéme étage porte B"
          :value="formData.complement"
          :error="errors.complement"
          :disabled="!isEditing || isLoading"
          @onInput="(value) => changeField('complement', value)"
        />

        <BaseInput
          label="Postal Code"
          placeholder="75000"
          :value="formData.postal"
          :error="errors.postal"
          :disabled="!isEditing || isLoading"
          @onInput="(value) => changeField('postal', value)"
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
import axios from 'axios';

export default {
  name: "AddressPage",
  data() {
    return {
      isEditing: false,
      isLoading: false,
      formData: {
        address: "",
        Ville: "",
        complement: "",
        postal: "",
      },
      errors: {
        address: "",
        Ville: "",
        complement: "",
        postal: "",
      },
    };
  },
  computed: {
  },
  mounted() {
  this.initPage();
       },
  methods: {
    
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
      this.isLoading = true;

      try {
        const response = await axios.post('/save-address', {
          userType: localStorage.getItem('userType'),
          email: localStorage.getItem('delEmail') ?localStorage.getItem('delEmail') : localStorage.getItem('userEmail'), // Obtenez l'identifiant de l'utilisateur à partir des données Vuex
          adress: this.formData.address,
          Ville: this.formData.Ville,
          complement: this.formData.complement,
          postal: this.formData.postal,
        });

        if (response.data.success) {
          // Adresse enregistrée avec succès
          this.isLoading = false;
          this.isEditing = false;
        } else {
          // Gestion des erreurs
        }
      } catch (error) {
        // Gestion des erreurs
        this.isLoading = false;
      }

      setTimeout(() => {
        this.isLoading = false;
        this.isEditing = false;
      }, 2500);
    },
    async initPage() {
      try {

        const email = localStorage.getItem('delEmail') || localStorage.getItem('userEmail');
        const response = await axios.get('/get-address', {
          params: { email },
        });
        if (response.data.success) {
          const address = response.data.Address;
          this.formData.address = address.adress;
          this.formData.Ville = address.Ville;
          this.formData.complement = address.complement;
          this.formData.postal = address.postal;
        } else {
          // Gestion des erreurs si l'adresse n'a pas été trouvée
        }
      } catch (error) {
        // Gestion des erreurs
      }
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
