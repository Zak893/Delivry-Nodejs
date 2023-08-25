<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="header__logo">
          <router-link to="/profile" v-if="isLoggedIn" >
            <img src="@/assets/header/express.avif" style="
    width: 15%;
"/>
          </router-link>
          <router-link to="/" v-if="!isLoggedIn" >
            <img src="@/assets/header/express.avif" style="
    width: 15%;
" />
          </router-link>
        </div>
        <div class="header__menu">
          <router-link v-if="isLoggedIn && userType=='User'" class="header__menu-link" to="/my-orders" active-class="active">
            My orders
          </router-link>

          <BaseButton v-if="isLoggedIn" variant="primary" style="background-color: red;" @onClick="logout">
            Log out
          </BaseButton>
          <!-- <img class="header__menu-icon" src="@/assets/header/menu.svg" /> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  data() {
    return {
      isLoggedIn: false,
      userType:null,
    };
  },
  methods: {
    login(){
      console.log("hah")
      if(localStorage.getItem('userType')){
        this.isLoggedIn=true;
        this.userType=localStorage.getItem('userType');
      }
    },
    logout() {
      
      localStorage.removeItem('delPass');
      localStorage.removeItem('delEmail');
      localStorage.removeItem('delFirst');
      localStorage.removeItem('delPoids');
      localStorage.removeItem('delPhone');
      localStorage.removeItem('delLast');
      localStorage.removeItem('delSiret');
      localStorage.removeItem('userType');
      localStorage.removeItem('userPass');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userFirst');
      localStorage.removeItem('userPhone');
      localStorage.removeItem('userLast');
      this.$router.push("/auth/sign");
      
    },
  },
  mounted(){
    this.login();
  }
};
</script>

<style lang="scss">
.header {
  height: 80px;
  background-color: $color-white;
  border-bottom: 1px solid $color-primary-light;
  margin-bottom: 24px;
  display: flex;
  align-items: center;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    align-items: center;

    img {
      cursor: pointer;
    }
  }

  &__menu {
    display: flex;
    align-items: center;

    &-link {
      font-family: $base-font;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      margin: 0 28px;
      color: $color-dark;

      &:hover {
        transition: 0.5s;
        color: $color-primary;
      }

      &.active {
        color: $color-primary;
      }
    }

    &-card {
      background-color: $color-primary-light;
      padding: 12px;
      border-radius: 16px;
      position: relative;
      margin-right: 11px;
    }

    &-counter {
      position: absolute;
      border-radius: 8px;
      padding: 2px 6px;
      right: -6px;
      top: -6px;
      background-color: $color-primary;
      color: $color-white;
    }

    &--profile-image {
      min-width: 100%;
      height: auto;
    }

    &--profile-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      min-width: 46px;
      min-height: 46px;
      background-color: $color-grey-light;
      outline: 2px solid $color-white;
      border-radius: 16px;
      overflow: hidden;
      box-sizing: border-box;

      &:hover {
        outline: 2px solid $color-primary;
      }

      &.active {
        outline: 2px solid $color-primary;
      }
    }

    &-icon {
      display: none;
    }
  }
}

// =========Mobile breakpoint==========
@media screen and (max-width: 768px) {
  .header {
    &__menu {
      position: relative;
      justify-content: end;

      &-link {
        display: none;
      }

      &-card {
        border: 2px solid $color-primary-light;

        &:hover {
          border: 2px solid $color-primary;
        }
      }
    }
  }
}
</style>
